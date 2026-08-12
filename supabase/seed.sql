-- Donald Okoli Portfolio — seed data
-- Run this AFTER schema.sql, once, to pre-fill Supabase with the same
-- real content from the CV (no invented data). Everything here can be
-- edited afterwards from /studio.

update settings set
  name = 'Donald Okoli',
  title = 'Digital Marketing & Content Strategist',
  tagline = 'I build brands, content systems and digital experiences that help businesses communicate, grow and connect with their audiences.',
  bio = 'Digital Marketing & Content Strategist with 4+ years of experience across digital marketing, content strategy, SEO, social media, campaign management, lead generation and sales. I combine a B.Sc. in Pharmacology, Toxicology & Therapeutics with entrepreneurial experience building independent brands, a consumer health education product, and AI-assisted digital experiences from concept to execution.',
  email = 'donaldokoli75@gmail.com',
  phone = '+234 904 364 0258',
  location = 'Lagos, Nigeria',
  availability_enabled = true,
  availability_label = 'Open to selected remote roles, freelance and consulting projects',
  cv_url = '',
  social_linkedin = 'https://www.linkedin.com/in/donaldokoli',
  social_instagram = '',
  social_clippings = 'https://clippings.me/donaldokoli',
  social_github = ''
where id = 1;

-- Skill categories
insert into skill_categories (name, items, sort_order) values
('Marketing Strategy', array['Digital Marketing Strategy','Campaign Management','Brand Strategy','Growth Marketing','Marketing Communications','Lead Generation'], 1),
('Content & SEO', array['Content Strategy','Content Marketing','Content Writing','Copywriting','SEO','Content Optimization','Email Marketing'], 2),
('Social & Audience Growth', array['Social Media Management','Social Media Strategy','Influencer Marketing','Audience Growth','Community Management'], 3),
('Analytics & Growth', array['Marketing Analytics','Campaign Performance Tracking','A/B Testing','Conversion Optimization'], 4),
('Business & Leadership', array['Business Development','Sales','Project Coordination','Team Leadership'], 5),
('Digital & Healthcare', array['AI-Assisted Website Design','Digital Product Development','Health Communication','Pharmacology'], 6);

-- Selected results (homepage stats)
insert into results (value, label, context, sort_order) values
('2,000 → 5,000+', 'Social audience growth', 'Zebulon Homes & Properties', 1),
('2×', 'Participant sign-ups', 'Pedagogic Hub, 2024 Disrupt Summer Bootcamp', 2),
('100%', 'Client registration growth', 'Pedagogic Hub', 3),
('100%+', 'Instagram growth in five months', 'Ava & George', 4),
('2+ hectares', 'Land sold within a single development project', 'Zebulon Homes & Properties', 5);

-- Experience
insert into experience (company, role, start_date, end_date, summary, achievements, skills, featured, sort_order) values
('Pedagogic Hub', 'Digital Marketing Executive & Chief Writer / Social Media Manager', 'October 2023', 'Present',
 'Led marketing strategy and team coordination for an education and tech brand, driving sign-up growth and building an always-on content system.',
 array[
   'Led digital marketing strategy that doubled participant sign-ups for the 2024 Disrupt Summer Bootcamp compared to the prior year.',
   'Managed and coordinated a marketing team of writers, designers and social media managers, driving 100% growth in client registration.',
   'Built and maintained a marketing calendar delivering targeted messaging across Instagram, Facebook, LinkedIn and email.',
   'Introduced A/B testing, audience segmentation and SEO best practices into campaign workflows, improving lead-to-client conversion during key enrollment periods.',
   'Developed blog posts, newsletters and landing pages that grew organic traffic and strengthened brand authority in education and tech, using analytics and KPIs to refine strategy and ROI.'
 ],
 array['Digital Marketing Strategy','Team Leadership','A/B Testing','SEO','Content Strategy','Email Marketing'],
 true, 1),

('Zebulon Homes & Properties Ltd.', 'Digital Marketer / Content Strategist & Sales Executive', 'September 2025', 'June 2026',
 'Combined content strategy, digital mapping and direct sales to grow audience reach and become the highest-performing in-house Sales Executive.',
 array[
   'Grew the company''s social media audience from 2,000 to over 5,000 followers through strategic content planning and campaign execution.',
   'Led digital and geo-mapping of the full property portfolio, improving online visibility and customer accessibility.',
   'Planned marketing strategy for new property launches, overseeing creative direction, content production and editing.',
   'Designed lead-generation campaigns for realtors and prospective clients, strengthening the sales pipeline.',
   'Engaged directly with prospective buyers across digital and field channels, nurturing leads and closing sales; became the highest-performing in-house Sales Executive, selling more than two hectares of land within a single development project.',
   'Collaborated with cross-functional teams to align marketing campaigns with sales objectives and customer experience.'
 ],
 array['Lead Generation','Content Strategy','Sales','Marketing Strategy','Audience Growth'],
 true, 2),

('Ava & George', 'Digital Marketer', 'October 2024', 'July 2025',
 'Drove brand campaigns and audience growth for a fashion brand across social, email and experiential channels.',
 array[
   'Developed and implemented marketing strategies to drive brand awareness, including loyalty schemes and email lead-generation campaigns.',
   'Restructured the content calendar and contributed creative direction, growing Instagram followers by more than 100% within five months.',
   'Created targeted content across social media, blog and email channels.',
   'Led brand campaigns for the 2024 GTCO Fashion Weekend and the 2025 Ecobank Oja Oge Fashion Exhibition.',
   'Drove visibility that led to a sponsorship invitation from Upbeat for the 2024 Upbeat Fest.',
   'Spearheaded the 2024 Colorful Christmas campaign, including a new collection launch and a week-long Abuja pop-up with Hello Homes, contributing to an all-time high in December sales.',
   'Organized an exclusive Mothers In Motion launch event, secured a brand ambassadorship partnership, and managed collaborations with social media personalities and partner brands.',
   'Applied SEO and email marketing, and analyzed performance metrics across Meta Ads, Google Ads and email campaigns to optimize results.'
 ],
 array['Social Media Strategy','Influencer Marketing','Email Marketing','SEO','Campaign Management'],
 true, 3),

('Freelance', 'Content Writer', 'January 2022', 'Present',
 'Ongoing content writing and ghostwriting practice, managed alongside full-time roles and university study.',
 array[
   'Provided content writing services for clients including TopCasinoSearch.com and KB Klub.',
   'Delivered ghostwriting projects for established writers while managing multiple concurrent assignments as a university student.',
   'Applied Grammarly, Hemingway Editor and Surfer SEO to support content quality and search performance.'
 ],
 array['Content Writing','Copywriting','SEO','Ghostwriting'],
 true, 4),

('Prime Waves Hospital', 'Pharmacy Assistant & Laboratory Assistant (NYSC Batch B)', '2025', '2026',
 'Clinical placement supporting pharmacy and laboratory operations during National Youth Service.',
 array[
   'Supported medication dispensing, inventory management, prescription documentation, laboratory operations and patient record maintenance.',
   'Followed clinical safety and infection prevention protocols and gained practical exposure to pharmacotherapy, diagnostic procedures and healthcare workflow.'
 ],
 array['Pharmacology','Health Communication'],
 false, 5),

('Nigeria Institute of Medical Research (NIMR)', 'SIWES Intern', 'August 2024', 'November 2024',
 'Three-month training placement in Biochemistry and Nutrition.',
 array[
   'Completed a three-month training placement in Biochemistry and Nutrition.',
   'Gained exposure to clinical diagnosis procedures and assisted with laboratory research, data collection and parasite culture.'
 ],
 array['Pharmacology'],
 false, 6);

-- Case studies
insert into case_studies (slug, title, client, role, industry, date, status, summary, services, tools, context, approach, execution, results, external_url, featured, sort_order, published) values
('pedagogic-hub', 'Doubling sign-ups for a summer tech bootcamp', 'Pedagogic Hub', 'Digital Marketing Executive & Chief Writer / Social Media Manager', 'Education & Tech', 'Oct 2023 — Present', 'Ongoing',
 'Rebuilt the marketing engine behind Pedagogic Hub''s flagship bootcamp and content operation, doubling sign-ups and lifting client registration by 100%.',
 array['Digital Marketing Strategy','Team Leadership','SEO','A/B Testing','Content Strategy','Email Marketing'],
 array['A/B Testing','Audience Segmentation','SEO','Analytics & KPIs'],
 'Pedagogic Hub needed to grow enrollment for its annual Disrupt Summer Bootcamp and strengthen its ongoing content presence in the education and tech space, while coordinating a distributed team of writers, designers and social media managers.',
 'Took ownership of the full marketing calendar across Instagram, Facebook, LinkedIn and email, and introduced A/B testing, audience segmentation and SEO best practices into the campaign workflow to improve lead-to-client conversion during enrollment periods.',
 'Managed and coordinated a marketing team of writers, designers and social media managers. Developed blog posts, newsletters and landing pages to grow organic traffic, using analytics and KPIs to continuously refine strategy and ROI.',
 array['Doubled participant sign-ups for the 2024 Disrupt Summer Bootcamp compared to the prior year.','Drove 100% growth in client registration through team coordination and refined campaign workflows.','Grew organic traffic and strengthened brand authority through blog, newsletter and landing-page content.'],
 '', true, 1, true),

('zebulon-homes-properties', 'From content strategy to closed sales in real estate', 'Zebulon Homes & Properties Ltd.', 'Digital Marketer / Content Strategist & Sales Executive', 'Real Estate', 'Sep 2025 — Jun 2026', 'Complete',
 'Grew Zebulon''s social audience from 2,000 to over 5,000 followers, mapped the full property portfolio digitally, and personally closed more than two hectares of land sales.',
 array['Content Strategy','Lead Generation','Marketing Strategy','Digital Mapping','Sales'],
 array['Geo-Mapping','Lead Generation Campaigns','Cross-Functional Collaboration'],
 'Zebulon needed stronger online visibility for a multi-site property portfolio, a reliable lead pipeline for realtors and prospective buyers, and hands-on sales coverage for active developments.',
 'Combined strategic content planning with digital and geo-mapping of the full property portfolio, and designed lead-generation campaigns aimed at both realtors and prospective buyers.',
 'Planned marketing strategy for new property launches, overseeing creative direction, content production and editing. Engaged directly with prospective buyers across digital and field channels, nurturing leads through to close, while collaborating with cross-functional teams to align marketing with sales objectives.',
 array['Grew the company''s social media audience from 2,000 to over 5,000 followers.','Improved online visibility and customer accessibility through full digital and geo-mapping of the property portfolio.','Became the highest-performing in-house Sales Executive, selling more than two hectares of land within a single development project.'],
 '', true, 2, true),

('ava-and-george', 'Doubling Instagram growth for a fashion brand', 'Ava & George', 'Digital Marketer', 'Fashion & Retail', 'Oct 2024 — Jul 2025', 'Complete',
 'Restructured Ava & George''s content calendar and led national brand campaigns, growing Instagram followers by more than 100% within five months and contributing to a record December.',
 array['Social Media Strategy','Campaign Management','Influencer Marketing','SEO','Email Marketing'],
 array['Meta Ads','Google Ads','Email Marketing','Performance Analytics'],
 'Ava & George needed to build brand awareness and audience growth across social channels while executing a calendar of high-visibility fashion campaigns and retail moments.',
 'Restructured the content calendar and brought creative direction to social, blog and email content, while developing loyalty schemes and email lead-generation campaigns to support brand awareness goals.',
 'Led brand campaigns for the 2024 GTCO Fashion Weekend and the 2025 Ecobank Oja Oge Fashion Exhibition, spearheaded the 2024 Colorful Christmas campaign — including a new collection launch and a week-long Abuja pop-up with Hello Homes — and organized the Mothers In Motion launch event, securing a brand ambassadorship partnership. Applied SEO and email marketing, and analyzed performance across Meta Ads, Google Ads and email campaigns.',
 array['Grew Instagram followers by more than 100% within five months.','Drove visibility that led to a sponsorship invitation from Upbeat for the 2024 Upbeat Fest.','Contributed to an all-time high in December sales through the Colorful Christmas campaign.','Secured a brand ambassadorship partnership and managed collaborations with social media personalities and partner brands.'],
 '', true, 3, true),

('freelance-content-writing', 'An ongoing freelance content writing practice', 'Freelance', 'Content Writer', 'Content & Publishing', 'Jan 2022 — Present', 'Ongoing',
 'Independent content writing and ghostwriting work sustained continuously since 2022, alongside full-time roles and university study.',
 array['Content Writing','Copywriting','SEO','Ghostwriting'],
 array['Grammarly','Hemingway Editor','Surfer SEO'],
 'Clients needed reliable, search-aware writing support, from client-facing content to ghostwritten work for established writers.',
 'Took on concurrent assignments for a range of clients, applying editing and SEO tools to keep quality and search performance consistent across projects.',
 'Delivered content for clients including TopCasinoSearch.com and KB Klub, and completed ghostwriting projects for established writers, managing multiple concurrent assignments throughout.',
 array['Sustained a freelance writing practice continuously since January 2022.','Delivered work for named clients including TopCasinoSearch.com and KB Klub.'],
 '', false, 4, true);

-- Projects
insert into projects (slug, title, category, role, description, highlights, external_url, link_label, featured, sort_order, published) values
('brandora-media', 'Brandora Media Services', 'Built From Scratch', 'Founder & Digital Marketing Strategist',
 'A creative media and digital marketing agency built independently from concept to launch — brand identity, positioning, service offering and website.',
 array['Founded and independently built a creative media and digital marketing agency from concept to launch.','Developed the brand identity, positioning, service offering, client acquisition approach and brand-audit workflows.','Defined the venture''s digital marketing strategy across social and web channels.','Designed and built the agency website using AI-assisted tools, translating brand strategy into a functional digital platform.'],
 'https://brandoraservicedeck.netlify.app', 'View live site', true, 1, true),

('thepharmadon', 'ThePharmaDon', 'Built From Scratch', 'Founder & Health Content Creator',
 'A health and pharmacology communication platform built to make evidence-based health information accessible to a general, non-clinical audience.',
 array['Founded a health and pharmacology communication platform focused on making evidence-based health information accessible to a general, non-clinical audience.','Developed the brand''s content strategy and created educational health and pharmacology content.','Built the platform''s digital presence and developed a consumer health education product under the brand.'],
 'https://www.instagram.com/thepharmadon', 'View Instagram', true, 2, true),

('before-its-too-late', 'Before It''s Too Late', 'Built From Scratch', 'Author & Digital Product Creator',
 'A 111-page consumer health education handbook covering 20 common infections, written for a general, non-clinical audience — with a dedicated purchase and landing page.',
 array['Authored a 111-page consumer health education handbook for a general, non-clinical audience.','Conducted health and pharmacology research and structured the content for accessibility and clarity.','Designed and built a dedicated purchase/landing page using AI-assisted digital tools.'],
 '', 'View landing page', true, 3, true),

('branded-ecommerce-project', 'Branded E-commerce Web Project', 'Digital Experience', 'Website Design & Digital Product Development',
 'A single-page e-commerce storefront designed and built independently, from information architecture and brand implementation through to live product presentation.',
 array['Designed the site structure, navigation and product presentation from the ground up.','Implemented brand identity and visual system directly into the live storefront.','Built and shipped the experience using AI-assisted development tools, handling content architecture end to end.'],
 '', 'View project', true, 1, true);
