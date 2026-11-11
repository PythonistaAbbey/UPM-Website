"""Generates URL_INVENTORY.csv from the Milestone 0 audit records.
Fetched rows were retrieved on 2026-11-11 via a rate-limited fetch tool (one request per host at a time).
Discovered rows were linked from fetched pages but NOT fetched; their fields are unverified."""
import csv
D = "2026-11-11"
H = ["url","title","responsible_unit","language","content_category","purpose","parent_navigation","site_type","access_status","on_page_updated","observations","migration_priority","recommended_destination","source_id","verified_date"]
fetched = [
("https://upm.edu.my/","(unclear: tool returned 'UPM Institute of Research for Community Well-being' fragment)","UPM central","unknown","Homepage","Central entry point","root","public website","partial - content not interpretable","","Apex domain returned fragmentary content; robots.txt fetch disallowed for automated tool","P1","/","S01"),
("https://www.upm.edu.my/","HOME | Universiti Putra Malaysia","UPM central (CCSR)","EN + BM mixed","Homepage","Central entry point","root","public website","fetched (content appears stale)","","News items without dates; items reference 2018; no lang attribute visible; vacancy/tender widgets show 'No quotation'/'No job vacancy'","P1","/","S02"),
("https://www.upm.edu.my/?LANG=en","","UPM central","EN","Homepage","English homepage","root","public website","blocked - robots_disallowed","","Not accessed out of respect for robots rules","P1","/en","S03"),
("https://upm.edu.my/robots.txt","","UPM central","","Technical","Crawl rules","root","technical","blocked - robots_disallowed","","Could not read robots.txt with automated tool","-","-","S03"),
("https://spel.upm.edu.my/sitemap","Site Map | Universiti Putra Malaysia","UPM central (spel portal)","EN","Sitemap","Full central sitemap","Home","public website","fetched","","Lists ~60 central pages, 11 online services, 9 quick links; includes UPM Calendar 2023 (outdated); mixed http/https links","P1","/sitemap","S04"),
("https://spel.upm.edu.my/entiti","Faculty / PTJ / Administration","UPM central","EN","Directory","List of all units and their websites","Quick links","public website","fetched","","~110 unit sites across 11 categories; most links http:// and www-prefixed; ?LANG=en query params","P1","/directory","S05"),
("https://spel.upm.edu.my/admission/programmes/undergraduate-75800","Undergraduate | Universiti Putra Malaysia","Division of Admission (akademik)","EN","Programme list","Undergraduate programmes by faculty","Admission > Programmes","public website","fetched","26/03/2026","~95 programmes in flat list; no programme detail links; typos ('wih','coorperation'); campus label 'UPMS'","P1","/study/programmes","S06"),
("https://spel.upm.edu.my/admission/programmes/postgraduate-76276","Postgraduate | Universiti Putra Malaysia","School of Graduate Studies","EN","Programme overview","Postgraduate overview","Admission > Programmes","public website","fetched","23/12/2025","Contradictory counts (265 vs 296 fields); stray text '99 spel' 'BZCSHAV~'","P1","/study/postgraduate","S07"),
("https://spel.upm.edu.my/admission/how_to_apply-14945","How To Apply | Universiti Putra Malaysia","Division of Admission","EN","Admissions","Application pathways","Admission","public website","fetched","23/12/2025","Inconsistent naming of direct channel ('Alternative' vs 'Inclusive'); links to http://intake.upm.edu.my","P1","/study/admissions","S08"),
("https://spel.upm.edu.my/about_us/vision_mission-14890","Vision & Mission | Universiti Putra Malaysia","CCSR","EN","About","Vision, mission, values","About Us","public website","fetched","19/12/2025","","P1","/about/vision-mission","S09"),
("https://spel.upm.edu.my/about_us/history-14905","History | Universiti Putra Malaysia","CCSR","EN","About","History index","About Us","public website","fetched (after 1 rate-limit retry)","23/10/2023","Index page with no content of its own","P2","/about/history","S10"),
("https://spel.upm.edu.my/about_us/history/the_story_behind_upm-76270","The Story Behind UPM","CCSR","EN","About","Institutional history","About Us > History","public website","fetched","21/11/2023","Merger date not stated","P1","/about/history","S11"),
("https://spel.upm.edu.my/about_us/contact_us-14908","Contact Us | Universiti Putra Malaysia","CCSR","EN","Contact","Central contacts","About Us","public website","fetched","23/10/2023","No map, no office hours, no campus addresses","P1","/contact","S12"),
("https://spel.upm.edu.my/about_us/corporate_information/logo-76265","Logo | Universiti Putra Malaysia","CCSR","EN","Corporate identity","Logo rationale","About Us > Corporate Information","public website","fetched","21/11/2023","No colour codes, usage rules or downloadable files","P2","/about/corporate-identity","S13"),
("https://spel.upm.edu.my/admission/visa_pass-14947","Visa & Pass | Universiti Putra Malaysia","i-PUTRA","EN","International","Visa information","Admission","public website","fetched","16/01/2024","Page has heading only - no content (empty page)","P1","/international/visa-and-pass","S14"),
("https://sgs.upm.edu.my/","HOME | SCHOOL OF GRADUATE STUDIES","School of Graduate Studies","EN","Unit homepage","Postgraduate hub","Unit root","public website","fetched","","Academic calendars 2025/2026 listed; social icons as images","P1","/study/postgraduate","S15"),
("https://sgs.upm.edu.my/prospective_students-2964","","School of Graduate Studies","","Admissions","Prospective PG students","SGS","public website","failed - client_error","","Could not retrieve","P1","/study/postgraduate/apply","S16"),
("https://akademik.upm.edu.my/","HOME | DIVISION OF ADMISSION AND DIVISION OF ACADEMIC GOVERNANCE","Division of Admission & Academic Governance","EN + BM","Unit homepage","UG admission & academic governance","Unit root","public website","fetched","","Mixed-language headings without markup","P1","/study/admissions","S17"),
("https://akademik.upm.edu.my/kemasukan_pelajar_antarabangsa/bacelor/general_entry_requirements-66325","","Division of Admission","","Admissions","International UG entry requirements","akademik","public website","failed - client_error","","Could not retrieve","P1","/international/admissions","S18"),
("https://intl.upm.edu.my/","HOME | Putra International Centre (i-PUTRA)","i-PUTRA","EN","Unit homepage","International hub","Unit root","public website","fetched","","Newest homepage articles dated 2019 - outdated","P1","/international","S19"),
("https://eng.upm.edu.my/","HOME | FACULTY OF ENGINEERING","Faculty of Engineering","EN + BM","Faculty homepage","Faculty site","Unit root","public website","fetched","","Unrendered [*LIVETIMESTAMP*] placeholder; 'click here' links; undated news","P2","/faculties/engineering","S20"),
("https://fsktm.upm.edu.my/","HOME | Faculty of Computer Science and Information Technology","FSKTM","EN","Faculty homepage","Faculty site","Unit root","public website","fetched","","Vague link text; undated news; 'Career Fair 2024' still featured","P2","/faculties/computer-science-information-technology","S21"),
("https://alumni.upm.edu.my/","HOME | Alumni Relations Centre","Alumni Relations Centre","EN","Unit homepage","Alumni services","Unit root","public website","fetched","","Alumni Information System referenced; personal Gmail alumni contact appears on central homepage","P2","/alumni","S22"),
("https://psasir.upm.edu.my/","","Sultan Abdul Samad Library","","Repository","Institutional repository","Library","operational application","blocked - robots_disallowed","","Not accessed","P3 (integrate, do not migrate)","external link","S23"),
("https://rmc.upm.edu.my/","HOME | RESEARCH MANAGEMENT CENTRE","Research Management Centre","EN + BM","Unit homepage","Research management","Unit root","public website","fetched","","No grant info on homepage; research systems not linked","P2","/research","S24"),
("https://sciencepark.upm.edu.my/","HOME | PUTRA SCIENCE PARK","Putra Science Park","EN + BM","Unit homepage","IP and commercialisation","Unit root","public website","fetched","","Clear service list; products catalogue page","P2","/research/innovation","S25"),
("https://idec.upm.edu.my/","HOME | INFOCOMM DEVELOPMENT CENTRE (iDEC)","iDEC","EN (BM toggle)","Unit homepage","ICT services","Unit root","public website","fetched","","Unrendered LIVETIMESTAMP placeholder; strong service links","P2","/services/ict","S26"),
("https://upmkb.upm.edu.my/","","UPM Bintulu Sarawak Campus","","Campus site","Bintulu campus","Unit root","public website","blocked - robots_disallowed","","Entity list links btu.upm.edu.my instead","P2","/about/campuses/bintulu","S27"),
("https://ai.upm.edu.my/","UPM AI HUB","UPM AI Hub","EN + BM","Initiative site","AI projects and training","Unit root","public website","fetched","","Different design system from central template","P2","/research/ai","S28"),
("https://lib.upm.edu.my/","HOME | SULTAN ABDUL SAMAD LIBRARY","Sultan Abdul Samad Library","EN (BM toggle)","Unit homepage","Library services","Unit root","public website","fetched","","Many systems (Koha OPAC, EBSCO, LibGuides, OpenAthens); unrendered placeholder","P1","/campus-life/libraries","S29"),
("https://hep.upm.edu.my/","HOME | Student Affairs Division","Student Affairs Division","EN + BM","Unit homepage","Student affairs","Unit root","public website","fetched","","Links to www.upm.edu.my/services-19 service overview","P1","/campus-life","S30"),
("https://bpp.upm.edu.my/","HOME | UPM HOUSING AND PLACEMENT DIVISION","Housing and Placement Division","EN (BM toggle)","Unit homepage","Student accommodation","Unit root","public website","fetched","","College list differs from central entity list (e.g. 'Seventeen Colleges', 'ThirteenTh College')","P1","/campus-life/accommodation","S31"),
("https://pspk.upm.edu.my/","","CCSR","","Unit homepage","Corporate strategy & relations","Unit root","public website","blocked - robots_disallowed","","Hosts prospectus and facts & figures PDFs (not fetched)","P1","/about","S32"),
]
rows=[]
for r in fetched:
    url,title,unit,lang,cat,purpose,parent,stype,status,upd,obs,prio,dest,src=r[0],r[1],r[2],r[3],r[4],r[5],r[6],r[7],r[8],r[9],r[10],r[11],r[12],r[13]
    rows.append(dict(url=url,title=title,responsible_unit=unit,language=lang,content_category=cat,purpose=purpose,parent_navigation=parent,site_type=stype,access_status=status,on_page_updated=upd,observations=obs,migration_priority=prio,recommended_destination=dest,source_id=src,verified_date=D))
apps = [
("https://smp.upm.edu.my","Student Information System (SMP)","Undergraduate student portal - authenticated"),
("http://sgsportal.upm.edu.my:8080/sgsportal/","i-GIMS student","Postgraduate student portal - authenticated, non-standard port, http"),
("http://www.sps.upm.edu.my:8080/igims/index.jsp","i-GIMS staff","Postgraduate staff system - authenticated, http"),
("http://learninghub.upm.edu.my/","Putra Learning Hub","Learning platform - authenticated"),
("http://eclaims.upm.edu.my/login/","E-Claim System","Staff claims - authenticated, http"),
("http://www.sisman.upm.edu.my/","SISMAN","HR knowledge system"),
("http://emel.upm.edu.my","emel@upm","Email"),
("http://portal.upm.edu.my","PORTAL","Staff/student portal"),
("http://putraportal.upm.edu.my/v2/zeropage.php","PUTRA Portal","Portal"),
("http://spict.upm.edu.my/loginspict.php","SPICT","ICT services login"),
("http://zonict.upm.edu.my/","ICT Maintenance System","ICT maintenance"),
("http://regmedic.upm.edu.my/","Medical Management System","Health"),
("http://bursar1.upm.edu.my/spln/","Travel Abroad Online Application","Staff travel"),
("http://spj.upm.edu.my/","Job Vacancy (eJOBS)","Recruitment"),
("http://etender.upm.edu.my/","Tenders & Contracts","Procurement (now tenderwizard.my/UPM)"),
("http://intake.upm.edu.my/alternatif/","Direct (alternative/inclusive) channel application","Admissions application"),
("https://edaftarsmp.upm.edu.my/","Offer check system","Admissions offer check"),
("https://upm-id.upm.edu.my/","UPM-ID","Identity account registration"),
("http://www.elib.upm.edu.my/","PSAS WebOPAC (Koha)","Library catalogue"),
("http://putrarepo.upm.edu.my/index.php","PutraRepo","Research data repository"),
("http://reg.upm.edu.my/eISO/","e-iso","Quality management documents"),
("https://upm.spab.gov.my/eApps/sdmscasepool/SdmsCasePool/add.do","SISPAA/SPAB feedback","Government complaints & feedback system"),
("https://upmet.upmholdings.com.my/","UPMET distance learning application","Distance learning (UPM Holdings)"),
("https://landing-pages.flywire.com/landing/upm","UPM Flywire","International fee payment"),
("https://virtualtour.upm.edu.my/librarySAS360tour/","Library virtual tour","Media"),
]
for u,t,p in apps:
    rows.append(dict(url=u,title=t,responsible_unit="(to confirm with owner)",language="",content_category="Operational application",purpose=p,parent_navigation="spel sitemap / unit sites",site_type="operational application",access_status="discovered - not accessed (application, out of scope)",on_page_updated="",observations="Link only; do not rebuild or probe",migration_priority="Integrate via public link",recommended_destination="/services (gateway entry)",source_id="S04;S26;S29;S30;S31",verified_date=D))
import re
ent = open("docs/audit/_entity_list.txt").read().strip().splitlines()
cat=""
for line in ent:
    if line.startswith("#"): cat=line[1:].strip(); continue
    name,url=line.split("|",1)
    rows.append(dict(url=url.strip(),title=name.strip(),responsible_unit=name.strip(),language="",content_category=cat,purpose="Unit website",parent_navigation="Faculty / PTJ / Administration list",site_type="public website",access_status="discovered - not fetched",on_page_updated="",observations="Linked from entity list; content not audited",migration_priority="P2" if cat in("Faculties","Institutes","Residential Colleges","Schools") else "P3",recommended_destination="/directory (unit template)",source_id="S05",verified_date=D))
seen=set(); out=[]
for r in rows:
    k=r["url"].rstrip("/").replace("http://","https://").replace("://www.","://")
    if k in seen and r["site_type"]!="public website" or (k in seen and r["access_status"].startswith("discovered")): continue
    seen.add(k); out.append(r)
with open("URL_INVENTORY.csv","w",newline="") as f:
    w=csv.DictWriter(f,fieldnames=H); w.writeheader(); w.writerows(out)
print(len(out),"rows")
