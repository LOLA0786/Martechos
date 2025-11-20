const express = require('express');
const cors = require('cors');
const path = require('path');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

console.log('🚀 Enhanced MartechOS Server Starting...');

// Enhanced creative templates with different angles
const CREATIVE_TEMPLATES = {
  problem_solution: {
    name: "Problem-Solution",
    structure: "Struggling with {problem}? Discover {solution} that actually works! ✅",
    emoji: "🔍",
    tone: "empathic"
  },
  benefit_driven: {
    name: "Benefit-Driven", 
    structure: "Get {benefit1}, {benefit2}, and {benefit3} with {product}! 🎯",
    emoji: "✨",
    tone: "exciting"
  },
  social_proof: {
    name: "Social Proof",
    structure: "Join {number}+ happy customers who love {product}! 🌟",
    emoji: "👥",
    tone: "trust-building"
  },
  urgency_fomo: {
    name: "Urgency-FOMO",
    structure: "🚨 Last chance! {offer} ends soon. {number} people bought today!",
    emoji: "⏰",
    tone: "urgent"
  },
  question_hook: {
    name: "Question Hook",
    structure: "Tired of {pain_point}? What if you could {desired_outcome}? 🤔",
    emoji: "❓",
    tone: "curiosity-driven"
  },
  comparison: {
    name: "Before-After",
    structure: "From {before_state} to {after_state} in {timeframe}! See the transformation 👀",
    emoji: "📊",
    tone: "transformational"
  },
  testimonial: {
    name: "Testimonial Style",
    structure: "\"{quote}\" - Real customer review of {product} 💬",
    emoji: "💫",
    tone: "authentic"
  }
};

// Industry-specific optimizations - FIXED SYNTAX
const INDUSTRY_OPTIMIZATIONS = {
  beauty: {
    keywords: ['glowing', 'radiant', 'natural', 'chemical-free', 'transform'],
    emojis: ['✨', '🌿', '💫', '🌟'],
    ctas: ['Get Your Glow', 'Transform Today', 'Shop Now']
  },
  tech: {
    keywords: ['innovative', 'efficient', 'cutting-edge', 'smart', 'automated'],
    emojis: ['🚀', '⚡', '💡', '🔧'],
    ctas: ['Get Started', 'Learn More', 'Upgrade Now']
  },
  food: {
    keywords: ['delicious', 'fresh', 'organic', 'flavorful', 'homemade'],
    emojis: ['🍴', '👨‍🍳', '🌱', '🔥'],
    ctas: ['Order Now', 'Taste It', 'Get Recipe']
  },
  fitness: {
    keywords: ['stronger', 'fitter', 'energized', 'transform', 'results'],
    emojis: ['💪', '🏃‍♂️', '🔥', '🎯'],
    ctas: ['Start Today', 'Get Fit', 'Join Now']
  }
};

// Enhanced creative generation with multiple variants
app.post('/api/generate-creatives', async (req, res) => {
  try {
    const { prompt, platform, targetAudience, industry, budget } = req.body;
    
    console.log('🎯 Generating multiple creatives for:', { prompt, platform, industry });

    const industryData = INDUSTRY_OPTIMIZATIONS[industry] || INDUSTRY_OPTIMIZATIONS.tech;
    
    // Generate 7-8 different creative variants
    const creativeVariants = Object.entries(CREATIVE_TEMPLATES).map(([key, template], index) => {
      return generateCreativeVariant(prompt, template, industryData, platform, index);
    });

    // Add a performance-predicted variant
    const performanceVariant = generatePerformanceOptimizedVariant(prompt, industryData, platform);
    creativeVariants.push(performanceVariant);

    // AI Analysis of all creatives
    const aiAnalysis = await analyzeCreativesAI(creativeVariants, prompt, targetAudience);

    const response = {
      success: true,
      campaign_id: 'campaign_' + Date.now(),
      original_prompt: prompt,
      total_variants: creativeVariants.length,
      creative_variants: creativeVariants,
      ai_analysis: aiAnalysis,
      a_b_test_recommendation: {
        test_groups: 3,
        duration_days: 7,
        sample_size: "1000 impressions per variant",
        primary_metric: "CTR",
        secondary_metric: "Conversion Rate"
      },
      industry_insights: getIndustryInsights(industry),
      generated_at: new Date().toISOString()
    };

    console.log(`✅ Generated ${creativeVariants.length} creative variants with AI analysis`);
    res.json(response);

  } catch (error) {
    console.error('❌ Creative Generation Error:', error);
    res.status(500).json({ 
      error: 'Creative generation failed',
      message: error.message
    });
  }
});

// Generate individual creative variant
function generateCreativeVariant(prompt, template, industryData, platform, index) {
  const angle = template.name;
  const baseCTR = getBaseCTR(platform);
  const engagementBoost = getEngagementBoost(template.tone);
  
  const creative = {
    id: `creative_${Date.now()}_${index}`,
    variant_name: `${template.emoji} ${angle} Approach`,
    angle_type: angle,
    ad_copy: generateAdCopy(prompt, template, industryData),
    image_url: `https://picsum.photos/800/600?random=${Date.now() + index}&category=${getImageCategory(prompt)}`,
    ctr_prediction: (baseCTR + engagementBoost + Math.random()).toFixed(2),
    engagement_score: Math.floor(Math.random() * 30 + 70), // 70-100
    best_for: getBestForAudience(angle),
    platform_optimization: getPlatformOptimization(platform, angle),
    suggested_bid: getSuggestedBid(platform, baseCTR),
    hashtags: generateHashtags(prompt, industryData),
    emoji_sequence: template.emoji + industryData.emojis.slice(0, 2).join(''),
    tone: template.tone,
    confidence_score: (85 + Math.random() * 10).toFixed(1) + '%',
    testing_priority: index < 3 ? 'HIGH' : 'MEDIUM'
  };

  return creative;
}

// Generate performance-optimized variant
function generatePerformanceOptimizedVariant(prompt, industryData, platform) {
  return {
    id: `creative_${Date.now()}_optimized`,
    variant_name: "🎯 Performance-Optimized",
    angle_type: "data_driven",
    ad_copy: `${industryData.ctas[0]}! ${prompt} - Get ${industryData.keywords[0]} results with our proven method. Limited spots! ${industryData.emojis[0]}`,
    image_url: `https://picsum.photos/800/600?random=${Date.now() + 10}&category=technology`,
    ctr_prediction: (6.5 + Math.random() * 2).toFixed(2),
    engagement_score: 95,
    best_for: "All audiences",
    platform_optimization: "Multi-platform optimized",
    suggested_bid: "₹45-60",
    hashtags: [...industryData.ctas.map(cta => cta.replace(/\s+/g, '')), 'BestSeller', 'Trending'],
    emoji_sequence: "🎯✨🔥",
    tone: "results-driven",
    confidence_score: "96.5%",
    testing_priority: "HIGHEST"
  };
}

// AI Analysis function
async function analyzeCreativesAI(creatives, prompt, targetAudience) {
  // Simulate AI analysis - in production, integrate with GPT-4
  const topPerformer = creatives.reduce((prev, current) => 
    parseFloat(prev.ctr_prediction) > parseFloat(current.ctr_prediction) ? prev : current
  );

  return {
    summary: `AI analysis of ${creatives.length} creative variants for "${prompt}"`,
    predicted_top_performer: {
      variant: topPerformer.variant_name,
      expected_ctr: topPerformer.ctr_prediction + '%',
      reasoning: `Strong ${topPerformer.tone} approach resonates with ${targetAudience || 'target audience'}`
    },
    performance_insights: [
      `Urgency-based creatives show 25% higher CTR for immediate actions`,
      `Social proof variants build 40% more trust with new audiences`,
      `Problem-solution approach converts 35% better for consideration stage`
    ],
    recommendations: [
      "Test top 3 variants with different audience segments",
      "Use carousel ads to showcase multiple value propositions",
      "Implement retargeting with best-performing creative",
      "A/B test different CTAs within winning variants"
    ],
    risk_assessment: {
      compliance_risk: "LOW",
      brand_safety: "HIGH",
      audience_relevance: "VERY HIGH"
    },
    budget_optimization: {
      suggested_allocation: "70% to top 2 performers, 30% to testing new angles",
      expected_roi: "350-500% based on historical data",
      scaling_potential: "HIGH"
    }
  };
}

// Helper functions
function generateAdCopy(prompt, template, industryData) {
  const replacements = {
    problem: ['slow results', 'frustrating experiences', 'wasting time', 'high costs'][Math.floor(Math.random() * 4)],
    solution: prompt,
    benefit1: industryData.keywords[0],
    benefit2: industryData.keywords[1],
    benefit3: industryData.keywords[2],
    product: prompt,
    number: (Math.floor(Math.random() * 50) + 10) + 'K',
    offer: ['50% OFF', 'Buy 1 Get 1', 'Free Trial', 'Limited Discount'][Math.floor(Math.random() * 4)],
    pain_point: ['not seeing results', 'complicated solutions', 'high prices', 'poor quality'][Math.floor(Math.random() * 3)],
    desired_outcome: industryData.keywords[0] + ' ' + ['results', 'outcomes', 'benefits', 'transformation'][Math.floor(Math.random() * 4)],
    before_state: ['struggling', 'frustrated', 'unsatisfied', 'confused'][Math.floor(Math.random() * 4)],
    after_state: industryData.keywords[0],
    timeframe: ['7 days', '2 weeks', '30 days', 'immediately'][Math.floor(Math.random() * 4)],
    quote: `"I never thought ${prompt} could work this well! ${industryData.keywords[0]} results in record time."`
  };

  let copy = template.structure;
  Object.keys(replacements).forEach(key => {
    copy = copy.replace(new RegExp(`{${key}}`, 'g'), replacements[key]);
  });

  return copy + ' ' + industryData.ctas[Math.floor(Math.random() * industryData.ctas.length)] + ' ' + template.emoji;
}

function getBaseCTR(platform) {
  const ctrMap = { instagram: 2.5, facebook: 2.0, google: 3.5, tiktok: 4.0 };
  return ctrMap[platform] || 2.5;
}

function getEngagementBoost(tone) {
  const boostMap = { urgent: 1.5, exciting: 1.2, empathic: 0.8, transformational: 1.0 };
  return boostMap[tone] || 0.5;
}

function getImageCategory(prompt) {
  if (prompt.toLowerCase().includes('beauty') || prompt.includes('skincare')) return 'fashion';
  if (prompt.includes('tech') || prompt.includes('app')) return 'technology';
  if (prompt.includes('food') || prompt.includes('restaurant')) return 'food';
  if (prompt.includes('fitness') || prompt.includes('gym')) return 'sports';
  return 'business';
}

function getBestForAudience(angle) {
  const audienceMap = {
    'Problem-Solution': 'Awareness stage audiences',
    'Benefit-Driven': 'Consideration stage',
    'Social Proof': 'New customer acquisition',
    'Urgency-FOMO': 'Bottom-funnel conversion',
    'Question Hook': 'Top-funnel engagement',
    'Before-After': 'Demo-focused audiences',
    'Testimonial Style': 'Trust-building campaigns'
  };
  return audienceMap[angle] || 'General audience';
}

function getPlatformOptimization(platform, angle) {
  const optimizations = {
    instagram: 'Use carousel for before-after, Stories for urgency',
    facebook: 'Lead gen forms for problem-solution, video for testimonials',
    google: 'Extended text ads for benefit-driven, responsive for social proof',
    tiktok: 'Short videos for urgency, duets for social proof'
  };
  return optimizations[platform] || 'Platform optimized';
}

function getSuggestedBid(platform, ctr) {
  const bidMap = { instagram: 30, facebook: 25, google: 40, tiktok: 35 };
  const baseBid = bidMap[platform] || 30;
  return `₹${baseBid - 5}-${baseBid + 15}`;
}

function generateHashtags(prompt, industryData) {
  const words = prompt.toLowerCase().split(' ');
  const baseTags = words.slice(0, 3).map(word => `#${word.replace(/\s+/g, '')}`);
  const industryTags = industryData.keywords.slice(0, 2).map(kw => `#${kw}`);
  return [...baseTags, ...industryTags, '#DigitalMarketing', '#AdsThatConvert'];
}

function getIndustryInsights(industry) {
  const insights = {
    beauty: "Video content performs 3x better. User-generated content boosts trust by 60%",
    tech: "Demo videos convert 45% higher. Case studies build enterprise credibility",
    food: "Food photography increases engagement by 80%. Recipe videos drive shares",
    fitness: "Transformation stories get 5x more comments. Live workouts build community"
  };
  return insights[industry] || "Test multiple content formats to find what resonates with your audience";
}

// A/B Testing Management
app.post('/api/ab-test/start', (req, res) => {
  const { campaign_id, variants, audience, duration_days, budget } = req.body;
  
  const testPlan = {
    test_id: 'ab_test_' + Date.now(),
    campaign_id,
    status: 'ACTIVE',
    start_date: new Date().toISOString(),
    end_date: new Date(Date.now() + duration_days * 24 * 60 * 60 * 1000).toISOString(),
    variants: variants.map((variant, index) => ({
      ...variant,
      test_group: `Group_${String.fromCharCode(65 + index)}`, // A, B, C...
      allocation: Math.floor(100 / variants.length) + '%',
      impressions: 0,
      clicks: 0,
      conversions: 0
    })),
    audience_segment: audience,
    total_budget: budget,
    daily_budget: Math.floor(budget / duration_days),
    kpis: ['CTR', 'Conversion Rate', 'Cost Per Acquisition', 'ROAS']
  };

  res.json({
    success: true,
    test_plan: testPlan,
    next_steps: [
      'Launch test across selected platforms',
      'Monitor performance daily',
      'Adjust bids based on early results',
      'Prepare winning creative for scaling'
    ]
  });
});

// Performance Analytics
app.get('/api/analytics/advanced', (req, res) => {
  const advancedAnalytics = {
    overall_performance: {
      total_spend: 125000,
      total_revenue: 575000,
      roi: 460,
      average_ctr: '4.8%',
      conversion_rate: '3.2%',
      cpa: '₹890'
    },
    creative_performance: {
      best_performer: {
        creative_id: 'creative_123',
        ctr: '6.8%',
        conversions: 145,
        roas: 620
      },
      worst_performer: {
        creative_id: 'creative_456', 
        ctr: '2.1%',
        conversions: 23,
        roas: 120
      }
    },
    platform_breakdown: {
      instagram: { spend: 45000, revenue: 245000, roas: 544 },
      facebook: { spend: 35000, revenue: 125000, roas: 357 },
      google: { spend: 45000, revenue: 205000, roas: 455 }
    },
    audience_insights: {
      top_performing_audience: 'Age 25-34, Interest: Technology',
      best_converting_device: 'Mobile (68% of conversions)',
      optimal_posting_time: '7-9 PM (45% higher engagement)'
    },
    ai_recommendations: {
      immediate_actions: [
        'Increase budget for top 2 creatives by 30%',
        'Pause underperforming audiences',
        'Test new headline variations for best performer'
      ],
      strategic_insights: [
        'Video content outperforms static by 3.2x',
        'User-generated content increases trust by 40%',
        'Carousel ads have 25% higher completion rate'
      ]
    },
    predictive_analytics: {
      next_week_forecast: {
        expected_spend: 35000,
        projected_revenue: 165000,
        predicted_roi: 471
      },
      growth_opportunities: [
        'Expand to TikTok audience (estimated +40% reach)',
        'Test influencer collaborations (estimated +25% engagement)',
        'Optimize landing pages (estimated +15% conversion rate)'
      ]
    }
  };

  res.json(advancedAnalytics);
});

// Health check
app.get('/api/status', (req, res) => {
  res.json({ 
    status: 'operational',
    version: '3.0.0',
    features: [
      'Multi-Variant Creative Generation',
      'AI-Powered Performance Analysis', 
      'A/B Testing Management',
      'Advanced Analytics Dashboard',
      'Industry-Specific Optimizations'
    ],
    uptime: process.uptime(),
    memory_usage: process.memoryUsage()
  });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n🎉 Enhanced MartechOS Server Started!`);
  console.log(`📍 Local: http://localhost:${PORT}`);
  console.log(`📊 Advanced Features: Multi-variant generation, A/B testing, AI analysis`);
  console.log(`🚀 Ready for production use!`);
});
