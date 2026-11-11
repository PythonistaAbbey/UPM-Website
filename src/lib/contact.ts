import { z } from "zod";
import { enquiryTopics } from "@/data/contacts";

export const enquirySchema = z.object({
  name: z.string().trim().min(2, "Enter your full name.").max(100, "Name must be 100 characters or fewer."),
  email: z.string().trim().email("Enter a valid email address, like name@example.com."),
  topic: z.enum(enquiryTopics.map((t) => t.value) as [string, ...string[]], { message: "Choose a topic." }),
  message: z.string().trim().min(20, "Your message must be at least 20 characters.").max(2000, "Your message must be 2,000 characters or fewer."),
  consent: z.literal(true, { message: "You must agree to the privacy notice to continue." }),
  /** Honeypot: humans never see or fill this field. */
  website: z.string().max(0).optional(),
});

export type Enquiry = z.infer<typeof enquirySchema>;

export function validateEnquiry(input: unknown) {
  const r = enquirySchema.safeParse(input);
  if (r.success) return { ok: true as const, data: r.data, errors: {} as Record<string, string> };
  const errors: Record<string, string> = {};
  for (const issue of r.error.issues) {
    const k = String(issue.path[0] ?? "form");
    if (!errors[k]) errors[k] = issue.message;
  }
  return { ok: false as const, errors };
}

export const routeFor = (topic: string) => enquiryTopics.find((t) => t.value === topic)?.routesTo ?? "main";
