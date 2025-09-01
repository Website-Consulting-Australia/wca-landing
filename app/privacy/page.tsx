// app/privacy/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Website Consulting Australia",
  description:
    "How Website Consulting Australia collects, uses, and protects your data, including cookies, analytics, and Meta Pixel.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-[60vh] bg-gray-50 dark:bg-neutral-950">
      {/* JSON-LD for a privacy policy page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "PrivacyPolicy",
            "name": "Privacy Policy",
            "url": "https://www.websiteconsultingaustralia.com.au/privacy",
            "publisher": {
              "@type": "Organization",
              "name": "Website Consulting Australia",
              "url": "https://www.websiteconsultingaustralia.com.au",
            }
          }),
        }}
      />
      <section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900 dark:text-gray-100">
          Privacy Policy
        </h1>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Last updated: {new Date().toLocaleDateString("en-AU", { year:"numeric", month:"long", day:"numeric" })}
        </p>

        <div className="prose prose-neutral dark:prose-invert mt-8">
          <p>
            Website Consulting Australia (“we”, “us”, or “our”) respects your privacy. This policy explains what
            information we collect, how we use it, and the choices you have.
          </p>

          <h2 id="information-we-collect">Information we collect</h2>
          <ul>
            <li>
              <strong>Contact details</strong> (e.g., name, email, phone) you submit via forms or booking links.
            </li>
            <li>
              <strong>Site usage data</strong> such as pages viewed, actions taken, device/browser information, and
              approximate location derived from your IP address.
            </li>
            <li>
              <strong>Technical logs</strong> for security and diagnostics (IP address, timestamps, user-agent).
            </li>
          </ul>

          <h2 id="how-we-use">How we use your information</h2>
          <ul>
            <li>Provide and improve our website, services, and customer support.</li>
            <li>Understand website performance and measure marketing effectiveness.</li>
            <li>Communicate with you (e.g., replies to enquiries, proposals, and updates).</li>
            <li>Detect, prevent, and address fraud or abuse.</li>
          </ul>

          <h2 id="cookies">Cookies & similar technologies</h2>
          <p>
            We use cookies and similar technologies (e.g., local storage) to keep the site secure, remember preferences,
            and analyse traffic. You can control cookies through your browser settings; disabling some cookies may affect
            site functionality.
          </p>

          <h2 id="analytics">Analytics & advertising</h2>
          <p>
            We use measurement tools to understand how visitors use our site and to improve performance and marketing.
            This may include the <strong>Meta Pixel</strong>, which can set cookies and associate website actions with
            Meta (Facebook/Instagram) advertising. Where required, we rely on your consent for these cookies.
          </p>
          <p className="not-prose text-sm text-gray-600 dark:text-gray-400">
            Opt-out options: adjust your Meta ad preferences at{" "}
            <a href="https://www.facebook.com/adpreferences/ad_settings" className="underline" target="_blank">
              facebook.com/adpreferences
            </a>{" "}
            and use the browser-level cookie controls. You can also use{" "}
            <a href="https://optout.aboutads.info/" className="underline" target="_blank">
              optout.aboutads.info
            </a>{" "}
            where available.
          </p>

          <h2 id="legal-bases">Legal bases (for AU & GDPR visitors)</h2>
          <p>
            Our legal bases include <em>legitimate interests</em> (running and improving our site and services),
            <em> consent</em> (for non-essential cookies/marketing), and <em>contract</em> (providing requested
            services).
          </p>

          <h2 id="sharing">Sharing your information</h2>
          <p>
            We do not sell personal data. We may share information with service providers who help us operate the site
            (e.g., hosting, analytics, email), subject to appropriate safeguards, or when required by law.
          </p>

          <h2 id="retention">Retention</h2>
          <p>
            We keep personal data only as long as necessary for the purposes described above, and then delete or
            anonymise it according to our retention practices.
          </p>

          <h2 id="security">Security</h2>
          <p>
            We use administrative and technical measures to protect your information. No method of transmission or
            storage is 100% secure, but we strive to protect your data.
          </p>

          <h2 id="your-rights">Your rights & choices</h2>
          <ul>
            <li>Access, correct, or delete your personal information.</li>
            <li>Withdraw consent for non-essential cookies/marketing at any time.</li>
            <li>Object to or restrict certain processing where applicable.</li>
          </ul>
          <p>
            To exercise rights or make a privacy request, contact us at{" "}
            <a href="mailto:hello@websiteconsultingaustralia.com.au">hello@websiteconsultingaustralia.com.au</a>.
          </p>

          <h2 id="children">Children’s privacy</h2>
          <p>Our website is not directed to children under 16 and we do not knowingly collect their personal data.</p>

          <h2 id="international">International transfers</h2>
          <p>
            Our providers may process data in other countries. Where required, we implement safeguards such as standard
            contractual clauses.
          </p>

          <h2 id="changes">Changes to this policy</h2>
          <p>
            We may update this policy from time to time. We will post the latest version on this page and update the
            “Last updated” date above.
          </p>

          <h2 id="contact">Contact us</h2>
          <p>
            Questions? Email{" "}
            <a href="mailto:hello@websiteconsultingaustralia.com.au">hello@websiteconsultingaustralia.com.au</a>.
          </p>
        </div>
      </section>
    </main>
  );
}