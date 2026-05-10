<?php

namespace Database\Seeders;

use App\Models\FundingRound;
use App\Models\NewsArticle;
use App\Models\Sector;
use App\Models\Startup;
use App\Models\TeamMember;
use Illuminate\Database\Seeder;

class StartupTrackerSeeder extends Seeder
{
    public function run(): void
    {
        $this->seedStartups();
        $this->seedNewsArticles();
        $this->seedSectors();
    }

    private function seedStartups(): void
    {
        // Week 15 startups
        $neuralink = Startup::factory()->featured()->create([
            'name' => 'NeuraLink Systems', 'slug' => 'neuralink-systems',
            'description' => 'Advanced BCI and neural mapping interfaces.',
            'mission' => 'NeuraLink Systems is pioneering the next generation of brain-computer interface (BCI) technology. Our goal is to bridge the gap between biological intelligence and digital processing, enabling non-invasive neural mapping and advanced rehabilitation tools for neurodegenerative conditions.',
            'logo_url' => 'https://lh3.googleusercontent.com/aida-public/AB6AXuA1-L2n11GKvSq5QptI_9rm4KELGQxF8xynjH2sFfM_eJyXis1hevyArO-4Et4TFtIlMBfd5VPIDzdHsknuEPIhypk7cdn33lvrx1BK8nI1KFlCtDaCHeJ9Nz8zt6sZP-I7V6ZXdyceRk5NF3qth6zNFHfTy77-UPJxlIHaPvkcaUp21QpyEz061Asey9MdXJ3TakLALC6fY-62HDDC3Rq9tDFqKApvP-cJooLaWxxkK4CjXDsWBGALukR53rGA3DB3qEh63_u_ASI',
            'funding_amount' => 14200000, 'funding_stage' => 'series-b', 'funding_label' => 'SERIES A TRENDING',
            'sector' => 'Neurotech', 'hq_location' => 'Berlin, DE', 'founding_date' => '2021-03-12',
            'burn_rate' => 'low', 'total_funding' => 21500000, 'week_number' => 15, 'year' => 2024,
        ]);
        FundingRound::factory()->create(['startup_id' => $neuralink->id, 'round_name' => 'Series B Round', 'amount' => 14200000, 'lead_investor' => 'Sequoia Capital', 'date' => '2024-08-15']);
        FundingRound::factory()->create(['startup_id' => $neuralink->id, 'round_name' => 'Series A Round', 'amount' => 5500000, 'lead_investor' => 'Index Ventures', 'date' => '2023-01-20']);
        FundingRound::factory()->create(['startup_id' => $neuralink->id, 'round_name' => 'Seed Round', 'amount' => 1800000, 'lead_investor' => 'Y Combinator', 'date' => '2021-06-10']);
        TeamMember::factory()->create(['startup_id' => $neuralink->id, 'name' => 'Dr. Elias Vance', 'role' => 'CEO & Founder', 'photo_url' => 'https://lh3.googleusercontent.com/aida-public/AB6AXuD6ezGhxZyycARLQ5tNdcCc8YaCr9wW5VZlIaw3uE8gwnnTXghpaz9Hd3nmZXKBsK1fbKKATJPinxyBm20l0knoJkhSWZRz5fsVGKII0o-2hPX7KQSn-pGgGVxJ9lfHJiTKzAf-MD00REF-aeQWtsn8RiQ4Q31Bf0n_zFAuw_rYUW-qFhPhtWoZ5AuNMQc-pvqNlIAfWv6IqBbfe7Nk1pr2hqamHfjZnI245yAFMMHDnZh5mc6hLsYOehI9PdEeYR0OUInrOc1n-KQ']);
        TeamMember::factory()->create(['startup_id' => $neuralink->id, 'name' => 'Sarah Jenkins', 'role' => 'CTO', 'photo_url' => 'https://lh3.googleusercontent.com/aida-public/AB6AXuCcUZ3BKRlKgDTaaPgtahNUwHWEuFNwkNRtwG6oy92fv_Rhh-2ZhoxL588ordVGjgP2XLtV5GE1_wOyabLnBuh4DE07eti0tPLviBGGyB4uv-KLkESGEDb30qMvshV6FWEdzKG5fQqp37g7f240LLiYTTOWQml9z0_UMtRslY_LPxrG1ntbQlfxMERypn-y7aUG4Y_EscVWgf5bb4nauzHEnJLa89vLVc1B8M-m8ccbw58Du_UT3WpVKCmyYErZOP7qk6It0NPsTrw']);

        $this->createStartup('VoltCore', 'voltcore', 'Solid-state battery technology for long-haul EVs.', 2500000, 'seed', 'HIGH GROWTH POTENTIAL', 'Sustainability', 'Munich, DE', 15,
            'https://lh3.googleusercontent.com/aida-public/AB6AXuBDVGNcZu0SYiumklLpje_RvIKx31JC9fQ7vGpL6dqUXiyk-kxcLfTy505r6lOvhVfuTFPMkXNpT6r1k_-ihIyOwAnoWX100S-VAcDOf-Vtr-Hi7A1tgPUmWlympwhuFLGJLwXm6fkrdxdw8fULC_lzLwvCq2xv5axz_RciiLv1fpMFnd0Q4sy0CCPfX5rYiUtR-wUOKPNUvfztOsyewdETu4Z0_5W2Oml8vMdlh6Pzd0iDexJrODEWCX2Ai9f_CoHa2Rq7diI92tk');

        $this->createStartup('LedgerFlow', 'ledgerflow', 'Automated reconciliation for crypto-fiat gateways.', 820000, 'pre-seed', 'UNICORN WATCH', 'Fintech', 'London, UK', 15,
            'https://lh3.googleusercontent.com/aida-public/AB6AXuAsxZEZ0p1KeMdbbG0skatpwjgIUzNWE7JL6nCQBldY69m0q2dYBwtWo50RWO5agGmjG-Tkdmtt7qX-4mUxzTAcgg5A0qDhElpKfHmBnivU6sWqYwYqbng9B28kzFjdvCR8ejWyX8wxDPZAt9T2xxK3HdJvL9h6FjNEcm8n103WWhR7objhCQLpO0WK1XlLKMko4haBWxYGGj0rRBM6BaVPO2RUIUMyHo90eWouz2vcmfQiCQHY94HaeESBMRc_JuDFj1i5rmj9fSw');

        // Week 16 startups
        $this->createStartup('EcoSystemic', 'ecosystemic', 'Automated carbon footprint tracking for Fortune 500 supply chains.', 12500000, 'series-a', 'LATE STAGE VENTURE', 'Climate Tech', 'San Francisco, US', 16,
            'https://lh3.googleusercontent.com/aida-public/AB6AXuBwC7faQNq_OlnqJ8dgBIwEe0L6aip5Z8N-DQDWGPm61FrVJqqsDpuZs0Zcl1j7Zrkl7oQuBwjny8dTgV1ffLoDmo-Y8_hrLp_e-IZtPlDbYnybIRLoK5VCrUTpeOcC6Vpi2HCtmgEZraBciAE1fvZqL6wLWEdf6k7GMjRlWx02dtVcjCr9FzkJIHXJ2CYkwVBsrEtkMEW2_Z-CavDRVirtDQYyv-jVsLJ5ljIKJ4C4dQYr0AKdkXGfybcfwXvWd2LUI-Ccwydp9sM');

        $this->createStartup('SafeGuard IO', 'safeguard-io', 'Zero-trust network architecture for distributed remote workforces.', 8900000, 'pre-seed', 'HIGH GROWTH POTENTIAL', 'Cybersecurity', 'Austin, US', 16,
            'https://lh3.googleusercontent.com/aida-public/AB6AXuDzALsKKcsc3Yz7O2ps56nh0DD0UXeN02CVf2eiMk4cFfmKW6z_Lx_N-kkdA_gfdp1c026flXA8CFFoe-G1teevcGghCZkZMFndQQ2_g9TZ-ywDcQ8lm_FvOEGDJ7ngLuoyHlHFyVxHhFPWDjs6UTPzXr82nedVvLArOzcPFUT57pi3rJeyODMAKLJuMS_gmiqoIgJU2hE844kc7ld_PJZWyMn-tEByNPRgkCciB1wKJfibx2_rVY9wudu8HobbkhMBRVKvWETVuH8');

        // Week 17 startups
        $this->createStartup('NeuraLink Analytics', 'neuralink-analytics', 'AI-driven predictive maintenance for renewable energy grids globally.', 4200000, 'seed', 'SERIES A TRENDING', 'AI & ML', 'Stockholm, SE', 17,
            'https://lh3.googleusercontent.com/aida-public/AB6AXuC9VHccXjA2aJ5whKekNPqu_zjjToa1I2ib5o-ZNdc2v_RIhRhwsZOe59KRtb2bB44TkQxV8FWA30eDQ5F7lWZqU6ro6lVrFP658Ep7Fe56zpTltU7WIj7kgSF684iefj4tM9AXPlqo0FxYV5BiF9i5uW--wQa5EncQlKEx2EvD__DK2Wfc6Lig2VgMwpVAMd01q1aHK0orfGQNTGVyih8MbnwLT1QNuB5PMkm1MGc-_4eKoCZlb9HVS5uNnWFjGgP8gAKcp1n86WU');

        $this->createStartup('MediScan AI', 'mediscan-ai', 'AI-powered diagnostic imaging for early cancer detection.', 7800000, 'series-a', 'HIGH GROWTH POTENTIAL', 'Health Tech', 'Boston, US', 17, null);

        // Week 18 startups
        $this->createStartup('CloudForge', 'cloudforge', 'Next-gen multi-cloud orchestration platform for enterprises.', 18500000, 'series-b', 'LATE STAGE VENTURE', 'SaaS', 'Seattle, US', 18, null);
        $this->createStartup('GreenGrid', 'greengrid', 'Smart grid optimization using machine learning for utilities.', 3100000, 'seed', 'SERIES A TRENDING', 'Climate Tech', 'Amsterdam, NL', 18, null);

        // Week 19 (current) startups
        $this->createStartup('QuantumLeap', 'quantumleap', 'Quantum computing as a service for pharma research.', 22000000, 'series-b', 'UNICORN WATCH', 'AI & ML', 'Zurich, CH', 19, null);
        $this->createStartup('PayNova', 'paynova', 'Instant cross-border B2B payment rails for SMEs.', 5600000, 'series-a', 'HIGH GROWTH POTENTIAL', 'Fintech', 'Singapore, SG', 19, null);
        $this->createStartup('BioSync', 'biosync', 'Wearable biosensor platform for clinical trials.', 1200000, 'seed', 'SERIES A TRENDING', 'Health Tech', 'San Diego, US', 19, null);
    }

    private function createStartup(string $name, string $slug, string $desc, int $amount, string $stage, string $label, string $sector, string $hq, int $week, ?string $logo): void
    {
        $startup = Startup::factory()->create([
            'name' => $name, 'slug' => $slug, 'description' => $desc, 'logo_url' => $logo,
            'funding_amount' => $amount, 'funding_stage' => $stage, 'funding_label' => $label,
            'sector' => $sector, 'hq_location' => $hq, 'total_funding' => $amount,
            'week_number' => $week, 'year' => 2024,
        ]);
        FundingRound::factory()->create(['startup_id' => $startup->id, 'amount' => $amount]);
        TeamMember::factory()->count(2)->create(['startup_id' => $startup->id]);
    }

    private function seedNewsArticles(): void
    {
        // Week 15
        NewsArticle::factory()->create(['title' => "AI Infrastructure firm 'Lumina' raises \$45M Series B for edge computing expansion", 'excerpt' => 'Lumina announced today that it has secured significant capital to scale its distributed cloud infrastructure.', 'category' => 'funding', 'source' => 'TechCrunch', 'source_time' => '2h ago', 'week_number' => 15, 'year' => 2024]);
        NewsArticle::factory()->create(['title' => 'Databricks completes strategic acquisition of stealth-mode security startup', 'excerpt' => 'The move is seen as a major push into the cybersecurity space.', 'category' => 'acquisition', 'source' => 'Bloomberg Technology', 'source_time' => '5h ago', 'week_number' => 15, 'year' => 2024]);

        // Week 16
        NewsArticle::factory()->featured()->create(['title' => 'The SaaS winter is ending: Analysis of Q3 investment trends.', 'excerpt' => 'Early data from Q3 2024 suggests a significant rebound in SaaS investment activity.', 'source' => 'Market Pulse', 'source_time' => '1h ago', 'week_number' => 16, 'year' => 2024]);
        NewsArticle::factory()->create(['title' => 'Sustainable Energy: The new frontier for VC', 'excerpt' => 'Venture capital is increasingly flowing into renewable energy startups.', 'category' => 'funding', 'source' => 'Market Pulse', 'source_time' => '6h ago', 'read_time' => '8m read', 'thumbnail_url' => 'https://lh3.googleusercontent.com/aida-public/AB6AXuB4qpk1khn3Svm1dc2vneEpY_4YpcbPOQoNC96mBEzOOVjFSwHvQjyrdxWT0FhyhirjjVwYAi7iKY61rsDhBZqfv7-F1dSRqS91XS7KhkmSLf6Bg0QnJ0qPOpzwNfNR1_l7Q6QejQ6FuzGG5jDnm6dRoQjy3iF6YHC28aII87h6z0RhEUXmli4wBLDjdBNkzo1X6UlqcHzEaRIUQtbOJfQ7RGF7d23b0oMobF-HVuS_IUrfVZNgYSf3y0L4CJ2CpCisTaE-jWK2W0Q', 'week_number' => 16, 'year' => 2024]);

        // Week 17
        NewsArticle::factory()->create(['title' => 'Semiconductor startups see 200% growth', 'excerpt' => 'The semiconductor industry is experiencing unprecedented growth.', 'category' => 'funding', 'source' => 'Wired', 'source_time' => '8h ago', 'read_time' => '12m read', 'thumbnail_url' => 'https://lh3.googleusercontent.com/aida-public/AB6AXuC0zSgLDstmxQYTXyX70Z-dTxWw_Is9JZ3xgvxuQLU0NerBXthoaerDx2tv261qA2t8y61yDSa7yey55hjJ1KJSS6AJoAHoWcI9J-ggn_mOQfMzUcgWIhfWoGZT59UBdX8oSCADr6UZFFDn8E3yB4fh4r-mMDqzl8XYyUqzCgHi5pYxJQXsAeF-cBoRG1K96fxCveT7p-o-jTmHEe51Wjd00v5yO0zPo4KiK2CKiETBzXgIWf45FCmyn1ifBi1oz6om4-PBCPIB8rA', 'week_number' => 17, 'year' => 2024]);
        NewsArticle::factory()->create(['title' => 'European Union proposes strict new audits for AI training data sets', 'excerpt' => 'The proposed framework would require startups to provide full transparency on licensed material.', 'category' => 'regulation', 'source' => 'Financial Times', 'source_time' => '8h ago', 'week_number' => 17, 'year' => 2024]);

        // Week 18
        NewsArticle::factory()->create(['title' => 'Quantum computing startups attract record funding in H1 2024', 'excerpt' => 'The quantum computing sector saw over $2B in venture funding during the first half of 2024.', 'category' => 'funding', 'source' => 'TechCrunch', 'source_time' => '3h ago', 'week_number' => 18, 'year' => 2024]);

        // Week 19 (current)
        NewsArticle::factory()->create(['title' => 'Cross-border fintech PayNova secures Series A from Tiger Global', 'excerpt' => 'PayNova will use the funding to expand into Southeast Asian markets.', 'category' => 'funding', 'source' => 'Bloomberg Technology', 'source_time' => '1h ago', 'week_number' => 19, 'year' => 2024]);
        NewsArticle::factory()->featured()->create(['title' => 'The rise of AI agents: How startups are redefining enterprise workflows.', 'excerpt' => 'A new wave of AI-first startups is building autonomous agents that handle complex business processes.', 'source' => 'Market Pulse', 'source_time' => '2h ago', 'week_number' => 19, 'year' => 2024]);
    }

    private function seedSectors(): void
    {
        $sectors = [
            ['name' => 'AI & Machine Learning', 'icon' => 'memory', 'percentage' => 42],
            ['name' => 'Biotech', 'icon' => 'biotech', 'percentage' => 28],
            ['name' => 'ClimateTech', 'icon' => 'electric_bolt', 'percentage' => 15],
            ['name' => 'SaaS & Enterprise', 'icon' => 'cloud', 'percentage' => 42],
            ['name' => 'Health Tech', 'icon' => 'biotech', 'percentage' => 28],
            ['name' => 'Energy & Infra', 'icon' => 'electric_bolt', 'percentage' => 15],
        ];
        foreach ($sectors as $sector) {
            Sector::create($sector);
        }
    }
}
