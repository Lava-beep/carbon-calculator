/**
 * Advanced AI Chatbot with NLP and Context Understanding
 * Implements natural language processing for intelligent carbon accounting assistance
 */

class IntelligentChatbot {
    constructor() {
        this.conversationHistory = [];
        this.userProfile = {};
        this.contextMemory = {};
        this.intentClassifier = new IntentClassifier();
        this.entityExtractor = new EntityExtractor();
        this.knowledgeBase = new CarbonKnowledgeBase();
    }

    /**
     * Process user message with advanced NLP
     */
    async processMessage(message, sessionId = 'default') {
        try {
            // Clean and preprocess the message
            const cleanMessage = this.preprocessMessage(message);
            
            // Extract intent and entities
            const intent = await this.intentClassifier.classify(cleanMessage);
            const entities = await this.entityExtractor.extract(cleanMessage);
            
            // Update conversation context
            this.updateContext(intent, entities, sessionId);
            
            // Generate intelligent response
            const response = await this.generateResponse(intent, entities, sessionId);
            
            // Store conversation for learning
            this.storeConversation(message, response, intent, sessionId);
            
            return {
                response: response.text,
                suggestions: response.suggestions,
                data: response.data,
                confidence: response.confidence
            };
        } catch (error) {
            console.error('Chatbot processing error:', error);
            return this.getFallbackResponse();
        }
    }

    /**
     * Preprocess user message
     */
    preprocessMessage(message) {
        return message
            .toLowerCase()
            .trim()
            .replace(/[^\w\s.-]/g, ' ')
            .replace(/\s+/g, ' ');
    }

    /**
     * Update conversation context
     */
    updateContext(intent, entities, sessionId) {
        if (!this.contextMemory[sessionId]) {
            this.contextMemory[sessionId] = {
                intents: [],
                entities: [],
                topics: [],
                lastAction: null
            };
        }
        
        const context = this.contextMemory[sessionId];
        context.intents.push(intent);
        context.entities.push(...entities);
        context.lastAction = intent.name;
        
        // Keep only last 10 interactions for memory efficiency
        if (context.intents.length > 10) {
            context.intents = context.intents.slice(-10);
            context.entities = context.entities.slice(-20);
        }
    }

    /**
     * Generate intelligent response based on intent and context
     */
    async generateResponse(intent, entities, sessionId) {
        const context = this.contextMemory[sessionId] || {};
        
        switch (intent.name) {
            case 'greeting':
                return await this.handleGreeting(entities, context);
            
            case 'goodbye':
                return await this.handleGoodbye(entities, context);
            
            case 'basic_concepts':
                return await this.handleBasicConcepts(entities, context);
            
            case 'calculator_usage':
                return await this.handleCalculatorUsage(entities, context);
            
            case 'industry_benchmarks':
                return await this.handleIndustryBenchmarks(entities, context);
            
            case 'recommendations':
                return await this.handleRecommendations(entities, context);
            
            case 'advanced_analytics':
                return await this.handleAdvancedAnalytics(entities, context);
            
            case 'ai_ml_features':
                return await this.handleAIMLFeatures(entities, context);
            
            case 'reporting_tracking':
                return await this.handleReportingTracking(entities, context);
            
            case 'industry_specific':
                return await this.handleIndustrySpecific(entities, context);
            
            case 'general_info':
                return await this.handleGeneralInfo(entities, context);
            
            case 'calculate_carbon':
                return await this.handleCarbonCalculation(entities, context);
            
            case 'get_recommendations':
                return await this.handleRecommendations(entities, context);
            
            case 'explain_concept':
                return await this.handleConceptExplanation(entities, context);
            
            case 'compliance_standards':
                return await this.handleComplianceQuestions(entities, context);
            
            case 'cost_analysis':
                return await this.handleCostAnalysis(entities, context);
            
            case 'reduction_strategies':
                return await this.handleReductionStrategies(entities, context);
            
            case 'data_interpretation':
                return await this.handleDataInterpretation(entities, context);
            
            default:
                return await this.handleGeneralQuery(intent, entities, context);
        }
    }

    /**
     * Handle greeting messages
     */
    async handleGreeting(entities, context) {
        const greetings = [
            "Hello! 👋 I'm your AI-powered carbon accounting assistant. I use advanced machine learning to help you understand and reduce your carbon footprint.",
            "Hi there! 🌱 Welcome to our AI-driven carbon calculator. I'm here to help you with intelligent insights about your environmental impact.",
            "Greetings! 🤖 I'm equipped with natural language processing and machine learning algorithms to assist you with carbon accounting questions.",
            "Hello! ✨ I'm your smart carbon footprint advisor, powered by AI. How can I help you achieve your sustainability goals today?"
        ];
        
        const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
        
        return {
            text: randomGreeting,
            suggestions: [
                "Calculate my carbon footprint",
                "How does AI improve carbon calculations?",
                "Get carbon reduction recommendations",
                "Explain machine learning in sustainability"
            ],
            confidence: 0.95
        };
    }

    /**
     * Handle goodbye messages
     */
    async handleGoodbye(entities, context) {
        const goodbyes = [
            "Thank you for using our AI-powered carbon calculator! 🌍 Keep making sustainable choices!",
            "Goodbye! 👋 Remember, every action towards sustainability counts. Come back anytime for more AI insights!",
            "See you later! 🌱 Our AI is always here when you need carbon accounting assistance.",
            "Farewell! ✨ Keep reducing that carbon footprint with AI-driven strategies!"
        ];
        
        const randomGoodbye = goodbyes[Math.floor(Math.random() * goodbyes.length)];
        
        return {
            text: randomGoodbye,
            suggestions: [],
            confidence: 0.95
        };
    }

    /**
     * Handle carbon calculation requests
     */
    async handleCarbonCalculation(entities, context) {
        const suggestions = [
            "Try our Carbon Calculator above",
            "Tell me your energy consumption",
            "What's your company size?",
            "Need help with data collection?"
        ];

        const extractedData = this.extractCalculationData(entities);
        
        if (extractedData.hasPartialData) {
            return {
                text: `I can help you calculate your carbon footprint! I see you mentioned ${extractedData.mentionedFields.join(', ')}. To get an accurate calculation, I'll also need: ${extractedData.missingFields.join(', ')}. You can use our calculator above or tell me the values here.`,
                suggestions: suggestions,
                confidence: 0.9,
                data: extractedData
            };
        }

        return {
            text: "I'd be happy to help calculate your carbon footprint! You can use our interactive calculator above, or tell me about your company's energy usage, fuel consumption, number of employees, business travel, and waste generation.",
            suggestions: suggestions,
            confidence: 0.85,
            data: null
        };
    }

    /**
     * Handle recommendation requests
     */
    async handleRecommendations(entities, context) {
        const industry = this.extractIndustry(entities);
        const emissionLevel = this.extractEmissionLevel(entities);
        
        let recommendations = await this.knowledgeBase.getRecommendations(industry, emissionLevel);
        
        // Personalize based on context
        if (context.lastAction === 'calculate_carbon') {
            recommendations = this.personalizeRecommendations(recommendations, context);
        }

        return {
            text: `Here are personalized recommendations for ${industry || 'your business'}:\n\n${recommendations.join('\n\n')}`,
            suggestions: [
                "How much can I save?",
                "Implementation timeline?",
                "Industry best practices",
                "Government incentives?"
            ],
            confidence: 0.92,
            data: { recommendations, industry, emissionLevel }
        };
    }

    /**
     * Handle concept explanations
     */
    async handleConceptExplanation(entities, context) {
        const concept = this.extractConcept(entities);
        const explanation = await this.knowledgeBase.explainConcept(concept);
        
        return {
            text: explanation.text,
            suggestions: explanation.relatedTopics,
            confidence: explanation.confidence,
            data: { concept, relatedConcepts: explanation.related }
        };
    }

    /**
     * Handle industry-specific questions
     */
    async handleIndustryQuestions(entities, context) {
        const industry = this.extractIndustry(entities);
        const question = this.extractQuestionType(entities);
        
        const response = await this.knowledgeBase.getIndustryInsights(industry, question);
        
        return {
            text: response.answer,
            suggestions: response.followUpQuestions,
            confidence: 0.88,
            data: { industry, questionType: question }
        };
    }

    /**
     * Handle compliance and standards questions
     */
    async handleComplianceQuestions(entities, context) {
        const standard = this.extractStandard(entities);
        const region = this.extractRegion(entities);
        
        const compliance = await this.knowledgeBase.getComplianceInfo(standard, region);
        
        return {
            text: compliance.information,
            suggestions: [
                "Implementation steps?",
                "Required documentation?",
                "Certification process?",
                "Deadlines and timelines?"
            ],
            confidence: 0.90,
            data: { standard, region }
        };
    }

    /**
     * Handle cost analysis questions
     */
    async handleCostAnalysis(entities, context) {
        const analysisType = this.extractAnalysisType(entities);
        const timeframe = this.extractTimeframe(entities);
        
        const costData = await this.knowledgeBase.getCostAnalysis(analysisType, timeframe);
        
        return {
            text: costData.analysis,
            suggestions: [
                "ROI calculations?",
                "Financing options?",
                "Government incentives?",
                "Payback period?"
            ],
            confidence: 0.85,
            data: costData
        };
    }

    /**
     * Handle reduction strategy questions
     */
    async handleReductionStrategies(entities, context) {
        const targetReduction = this.extractTargetReduction(entities);
        const timeframe = this.extractTimeframe(entities);
        const industry = this.extractIndustry(entities);
        
        const strategies = await this.knowledgeBase.getReductionStrategies(
            targetReduction, timeframe, industry
        );
        
        return {
            text: `Here's a strategic roadmap for achieving ${targetReduction}% reduction:\n\n${strategies.roadmap}`,
            suggestions: strategies.nextSteps,
            confidence: 0.87,
            data: { strategies, targetReduction, timeframe }
        };
    }

    /**
     * Handle basic concepts questions
     */
    async handleBasicConcepts(entities, context) {
        const conceptResponses = {
            'carbon footprint': "A carbon footprint is the total amount of greenhouse gases (including CO2) produced directly or indirectly by human activities, measured in CO2 equivalent.",
            'scope 1': "Scope 1 emissions are direct emissions from sources owned or controlled by your organization, like company vehicles and on-site fuel combustion.",
            'scope 2': "Scope 2 emissions are indirect emissions from purchased electricity, heat, or steam consumed by your organization.",
            'scope 3': "Scope 3 emissions are all other indirect emissions in your value chain, including business travel, employee commuting, and supply chain activities.",
            'emission factor': "An emission factor is a representative value that relates the quantity of a pollutant released to the atmosphere with an activity associated with that release.",
            'renewable energy': "Renewable energy comes from sources that naturally replenish, like solar, wind, hydro, and geothermal power, producing minimal greenhouse gas emissions."
        };

        const message = entities.concept || "general";
        const response = conceptResponses[message.toLowerCase()] || 
            "Carbon accounting involves measuring, monitoring, and managing greenhouse gas emissions from business activities. Our AI system helps automate these calculations with high precision.";

        return {
            text: response,
            suggestions: ["Calculate my carbon footprint", "What are Scope 1 emissions?", "Explain emission factors", "How does AI help with carbon accounting?"],
            confidence: 0.9
        };
    }

    /**
     * Handle calculator usage questions
     */
    async handleCalculatorUsage(entities, context) {
        const usageGuides = {
            'energy': "Enter your monthly energy consumption in kWh. You can find this on your electricity bills. Our AI will apply appropriate emission factors based on your location's energy grid mix.",
            'travel': "Input business travel data including distance, mode of transport, and frequency. Our ML algorithms consider factors like fuel efficiency and occupancy rates for accurate calculations.",
            'waste': "Add waste generation data by type (general, recycling, food waste). The AI considers local waste processing methods and disposal emissions.",
            'fuel': "Select your fuel type from our comprehensive database. Our system automatically applies the most current emission factors and efficiency ratings.",
            'remote': "Specify the percentage of remote work. This helps our AI calculate reduced office energy consumption and commuting emissions."
        };

        return {
            text: "🔧 **Calculator Usage Guide**: " + (usageGuides.energy) + "\n\n💡 **Pro Tip**: Our AI validates your inputs and suggests improvements for more accurate calculations.",
            suggestions: ["How to add travel data?", "What fuel types are supported?", "How to include waste data?", "Start carbon calculation"],
            confidence: 0.95
        };
    }

    /**
     * Handle industry benchmarks questions
     */
    async handleIndustryBenchmarks(entities, context) {
        const benchmarkData = {
            'technology': "Tech companies average 15-25 tonnes CO2e per employee annually. Top performers achieve under 10 tonnes through renewable energy and efficient operations.",
            'manufacturing': "Manufacturing sector averages 50-150 tonnes CO2e per $M revenue. Leading companies use lean processes and circular economy principles.",
            'retail': "Retail companies typically emit 20-40 tonnes CO2e per $M revenue. Best practices include sustainable packaging and supply chain optimization.",
            'finance': "Financial services average 5-15 tonnes CO2e per employee. Leaders focus on green investments and digital transformation.",
            'healthcare': "Healthcare organizations average 30-50 tonnes CO2e per bed. Efficiency measures include energy management and sustainable procurement."
        };

        return {
            text: "📊 **Industry Benchmarks**: Our AI analyzes your performance against industry peers using machine learning models trained on thousands of companies.\n\n" + 
                  Object.values(benchmarkData).join('\n\n'),
            suggestions: ["Compare my company performance", "Get industry-specific recommendations", "View detailed benchmarks", "Calculate my footprint"],
            confidence: 0.88
        };
    }

    /**
     * Handle advanced analytics questions
     */
    async handleAdvancedAnalytics(entities, context) {
        return {
            text: "🔮 **Advanced AI Analytics**: Our machine learning models provide:\n\n" +
                  "📈 **Predictive Forecasting**: ML algorithms predict your future emissions based on growth patterns, seasonal trends, and industry data\n\n" +
                  "💰 **Cost-Benefit Analysis**: AI calculates ROI for reduction initiatives, factoring in energy prices, carbon costs, and operational savings\n\n" +
                  "🎯 **Smart Targets**: Algorithms recommend achievable reduction targets based on your industry, size, and current performance\n\n" +
                  "⚡ **Real-time Insights**: AI continuously analyzes your data to identify optimization opportunities and track progress",
            suggestions: ["Predict next year's emissions", "Calculate carbon neutrality timeline", "Analyze reduction potential", "Get cost savings estimates"],
            confidence: 0.92
        };
    }

    /**
     * Handle AI/ML features questions
     */
    async handleAIMLFeatures(entities, context) {
        return {
            text: "🤖 **AI/ML Features**: Our platform uses cutting-edge artificial intelligence:\n\n" +
                  "🧠 **Neural Networks**: Deep learning models trained on global emission datasets for accurate factor calculations\n\n" +
                  "🔍 **Pattern Recognition**: AI identifies hidden patterns in your data to suggest optimization opportunities\n\n" +
                  "📊 **Confidence Scoring**: Machine learning algorithms assess data quality and provide confidence levels for each calculation\n\n" +
                  "🎯 **Smart Recommendations**: AI generates personalized action plans based on your specific situation and industry best practices\n\n" +
                  "📈 **Continuous Learning**: The system improves accuracy as it processes more data and user feedback",
            suggestions: ["How does the AI calculate confidence?", "What ML models are used?", "Get AI recommendations", "Learn about neural networks"],
            confidence: 0.95
        };
    }

    /**
     * Handle reporting and tracking questions
     */
    async handleReportingTracking(entities, context) {
        return {
            text: "📋 **Reporting & Tracking**: Our AI-powered reporting system provides:\n\n" +
                  "📊 **Automated Reports**: AI generates compliance-ready reports for GHG Protocol, CDP, and other standards\n\n" +
                  "📈 **Trend Analysis**: Machine learning tracks your progress over time and identifies improvement opportunities\n\n" +
                  "🎯 **Science-Based Targets**: AI helps set and monitor targets aligned with climate science\n\n" +
                  "🔄 **Real-time Monitoring**: Continuous tracking with alerts when emissions exceed thresholds\n\n" +
                  "📱 **Dashboard Analytics**: Interactive visualizations powered by our analytics engine",
            suggestions: ["Generate emissions report", "Set science-based targets", "Track monthly progress", "View analytics dashboard"],
            confidence: 0.90
        };
    }

    /**
     * Handle industry-specific questions
     */
    async handleIndustrySpecific(entities, context) {
        const industryAdvice = {
            'technology': "🖥️ **Tech Industry**: Focus on green software practices, renewable energy for data centers, and sustainable hardware lifecycle management.",
            'manufacturing': "🏭 **Manufacturing**: Implement lean processes, energy-efficient equipment, and circular economy principles for waste reduction.",
            'retail': "🛍️ **Retail**: Optimize packaging, implement sustainable supply chains, and focus on last-mile delivery efficiency.",
            'finance': "💼 **Finance**: Develop green investment portfolios, digitalize operations, and measure financed emissions.",
            'healthcare': "🏥 **Healthcare**: Focus on energy management, sustainable procurement, and waste reduction in medical facilities."
        };

        return {
            text: "🏢 **Industry-Specific Solutions**: Our AI provides tailored recommendations for your sector:\n\n" +
                  Object.values(industryAdvice).join('\n\n'),
            suggestions: ["Get tech industry tips", "Manufacturing best practices", "Retail sustainability guide", "Healthcare carbon reduction"],
            confidence: 0.87
        };
    }

    /**
     * Handle general information questions
     */
    async handleGeneralInfo(entities, context) {
        return {
            text: "🌱 **About EcoLeaf Analytics**: We're pioneering AI-powered carbon accounting solutions.\n\n" +
                  "🚀 **Our Mission**: Making carbon accounting accessible and accurate through artificial intelligence\n\n" +
                  "🤖 **Technology**: Advanced machine learning models trained on global emissions data\n\n" +
                  "🎯 **Services**: Carbon calculation, benchmarking, reduction planning, and compliance reporting\n\n" +
                  "📞 **Contact**: Ready to transform your sustainability strategy with AI? Request a demo to see our platform in action!",
            suggestions: ["Request a demo", "Learn about our AI technology", "Calculate carbon footprint", "Get started with sustainability"],
            confidence: 0.88
        };
    }

    /**
     * Store conversation for machine learning
     */
    storeConversation(userMessage, botResponse, intent, sessionId) {
        const conversation = {
            timestamp: new Date().toISOString(),
            sessionId: sessionId,
            userMessage: userMessage,
            botResponse: botResponse.text,
            intent: intent, // Store the full intent object
            confidence: intent.confidence,
            entities: [], // Will be filled when entities are extracted
            satisfaction: null // Will be updated with user feedback
        };
        
        this.conversationHistory.push(conversation);
        
        // Send to learning system (in production, this would be an API call)
        this.updateLearningModel(conversation);
    }

    /**
     * Update learning model with conversation data (ML simulation)
     */
    updateLearningModel(conversation) {
        try {
            // Simulate machine learning model updates
            // In a real implementation, this would send data to ML training pipeline
            
            // Update intent confidence based on successful interactions
            if (conversation.intent && conversation.intent.confidence > 0.8) {
                // Reinforce successful intent classifications
                this.intentClassifier.reinforcePattern(conversation.userMessage, conversation.intent.name);
            }
            
            // Update entity extraction patterns
            if (conversation.entities && conversation.entities.length > 0) {
                this.entityExtractor.updatePatterns(conversation.userMessage, conversation.entities);
            }
            
            // Store successful response patterns for future use
            if (conversation.response && conversation.response.length > 0) {
                this.knowledgeBase.updateResponsePatterns(conversation.intent, conversation.response);
            }
            
            // Log learning activity (in development mode)
            console.log('🧠 ML Model updated with conversation data:', {
                intent: conversation.intent?.name || 'unknown',
                confidence: conversation.intent?.confidence || 0,
                entitiesFound: conversation.entities?.length || 0,
                timestamp: new Date().toISOString()
            });
            
        } catch (error) {
            console.warn('Learning model update failed:', error);
            // Don't throw error to avoid breaking conversation flow
        }
    }

    /**
     * Get fallback response for errors
     */
    getFallbackResponse() {
        const fallbacks = [
            "I'm here to help with carbon accounting questions. Could you rephrase that?",
            "I specialize in sustainability and carbon footprint topics. What would you like to know?",
            "Let me help you with carbon accounting. Try asking about calculations, recommendations, or industry standards.",
            "I can assist with carbon footprint calculations, reduction strategies, and compliance questions. What interests you?"
        ];
        
        return {
            response: fallbacks[Math.floor(Math.random() * fallbacks.length)],
            suggestions: [
                "Calculate carbon footprint",
                "Get reduction recommendations",
                "Learn about standards",
                "Industry best practices"
            ],
            confidence: 0.5,
            data: null
        };
    }

    // Entity extraction helper methods
    extractCalculationData(entities) {
        const fields = ['energy', 'fuel', 'employees', 'travel', 'waste'];
        const mentioned = entities.filter(e => fields.includes(e.type));
        const mentionedFields = mentioned.map(e => e.type);
        const missingFields = fields.filter(f => !mentionedFields.includes(f));
        
        return {
            hasPartialData: mentioned.length > 0,
            mentionedFields,
            missingFields,
            extractedValues: mentioned
        };
    }

    extractIndustry(entities) {
        const industryEntity = entities.find(e => e.type === 'industry');
        return industryEntity ? industryEntity.value : 'general';
    }

    extractEmissionLevel(entities) {
        const levelEntity = entities.find(e => e.type === 'emission_level');
        return levelEntity ? levelEntity.value : 'medium';
    }

    extractConcept(entities) {
        const conceptEntity = entities.find(e => e.type === 'concept');
        return conceptEntity ? conceptEntity.value : 'carbon_footprint';
    }

    extractQuestionType(entities) {
        const questionEntity = entities.find(e => e.type === 'question_type');
        return questionEntity ? questionEntity.value : 'general';
    }

    extractStandard(entities) {
        const standardEntity = entities.find(e => e.type === 'standard');
        return standardEntity ? standardEntity.value : 'ghg_protocol';
    }

    extractRegion(entities) {
        const regionEntity = entities.find(e => e.type === 'region');
        return regionEntity ? regionEntity.value : 'global';
    }

    extractAnalysisType(entities) {
        const analysisEntity = entities.find(e => e.type === 'analysis_type');
        return analysisEntity ? analysisEntity.value : 'cost_benefit';
    }

    extractTimeframe(entities) {
        const timeEntity = entities.find(e => e.type === 'timeframe');
        return timeEntity ? timeEntity.value : '5_years';
    }

    extractTargetReduction(entities) {
        const targetEntity = entities.find(e => e.type === 'percentage');
        return targetEntity ? parseInt(targetEntity.value) : 50;
    }
}

/**
 * Intent Classification System
 */
class IntentClassifier {
    constructor() {
        this.intents = {
            'greeting': [
                'hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening',
                'greetings', 'welcome', 'start', 'begin', 'sup', 'howdy'
            ],
            'goodbye': [
                'bye', 'goodbye', 'see you', 'farewell', 'exit', 'quit', 'leave',
                'thank you', 'thanks', 'done'
            ],
            'basic_concepts': [
                'what is', 'define', 'explain', 'meaning of', 'carbon footprint',
                'emission factor', 'scope 1', 'scope 2', 'scope 3', 'renewable energy',
                'greenhouse gas', 'co2', 'sustainability', 'climate change'
            ],
            'calculator_usage': [
                'how do i enter', 'how to add', 'how to input', 'data entry',
                'energy usage', 'travel data', 'waste management', 'fuel types',
                'remote work', 'employee data', 'usage calculator'
            ],
            'industry_benchmarks': [
                'benchmark', 'compare', 'industry average', 'performance',
                'technology companies', 'manufacturers', 'retail sector',
                'how does my company', 'average carbon footprint'
            ],
            'recommendations': [
                'how can i reduce', 'reduce carbon', 'best practices', 'quick wins',
                'energy savings', 'travel emissions', 'scope 3 reduction',
                'renewable energy transition', 'carbon reduction strategies'
            ],
            'advanced_analytics': [
                'projected', 'prediction', 'forecast', 'next year', 'future',
                'electric vehicles', 'reduction potential', 'money save',
                'carbon neutrality', 'milestones', 'targets'
            ],
            'ai_ml_features': [
                'ai improve', 'machine learning', 'ml models', 'confidence scores',
                'ai recommend', 'system learn', 'algorithms', 'artificial intelligence',
                'how does ai', 'neural network'
            ],
            'reporting_tracking': [
                'track emissions', 'monthly tracking', 'breakdown', 'report',
                'science-based targets', 'emissions by source', 'carbon reporting'
            ],
            'industry_specific': [
                'green software', 'tech companies', 'manufacturers optimize',
                'retailers reduce', 'finance companies', 'healthcare organizations',
                'packaging emissions', 'green portfolios'
            ],
            'general_info': [
                'who made', 'ecoleaf analytics', 'demo', 'sustainability goals',
                'cost of carbon', 'about this', 'company information'
            ],
            'calculate_carbon': [
                'calculate', 'footprint', 'emissions', 'carbon', 'co2', 'compute',
                'estimate', 'measure', 'assessment', 'audit'
            ],
            'get_recommendations': [
                'recommend', 'suggest', 'advice', 'tips', 'best practices',
                'improve', 'reduce', 'optimize', 'strategies'
            ],
            'explain_concept': [
                'what is', 'explain', 'define', 'meaning', 'understand',
                'how does', 'why', 'difference between'
            ],
            'compliance_standards': [
                'ghg protocol', 'iso 14064', 'sbti', 'tcfd', 'cdp',
                'compliance', 'regulation', 'standard', 'reporting'
            ],
            'cost_analysis': [
                'cost', 'price', 'investment', 'roi', 'savings', 'budget',
                'financial', 'economic', 'payback'
            ],
            'reduction_strategies': [
                'reduce', 'decrease', 'lower', 'cut', 'minimize',
                'strategy', 'plan', 'roadmap', 'targets'
            ],
            'get_recommendations': [
                'recommend', 'suggest', 'advice', 'tips', 'best practices',
                'improve', 'reduce', 'optimize', 'strategies'
            ],
            'explain_concept': [
                'what is', 'explain', 'define', 'meaning', 'understand',
                'how does', 'why', 'difference between'
            ],
            'industry_specific': [
                'manufacturing', 'retail', 'technology', 'healthcare', 'finance',
                'automotive', 'aviation', 'construction', 'agriculture'
            ],
            'compliance_standards': [
                'ghg protocol', 'iso 14064', 'sbti', 'tcfd', 'cdp',
                'compliance', 'regulation', 'standard', 'reporting'
            ],
            'cost_analysis': [
                'cost', 'price', 'investment', 'roi', 'savings', 'budget',
                'financial', 'economic', 'payback'
            ],
            'reduction_strategies': [
                'reduce', 'decrease', 'lower', 'cut', 'minimize',
                'strategy', 'plan', 'roadmap', 'targets'
            ]
        };
    }

    async classify(message) {
        const cleanMessage = message.toLowerCase().trim();
        const words = cleanMessage.split(' ');
        const scores = {};
        
        // Initialize scores
        Object.keys(this.intents).forEach(intent => {
            scores[intent] = 0;
        });
        
        // Special handling for short greetings
        if (words.length <= 2) {
            const firstWord = words[0];
            
            if (['hello', 'hi', 'hey', 'sup', 'howdy'].includes(firstWord)) {
                scores['greeting'] = 100; // High priority for greetings
            }
            if (['bye', 'goodbye', 'thanks', 'thank'].includes(firstWord)) {
                scores['goodbye'] = 100; // High priority for goodbyes
            }
        }
        
        // Calculate intent scores with keyword matching
        Object.entries(this.intents).forEach(([intent, keywords]) => {
            keywords.forEach(keyword => {
                const keywordLower = keyword.toLowerCase();
                
                // Exact phrase match (highest score)
                if (cleanMessage.includes(keywordLower)) {
                    scores[intent] += keywordLower.split(' ').length * 3;
                }
                
                // Individual word match (lower score)
                words.forEach(word => {
                    if (keywordLower.includes(word) && word.length > 2) {
                        scores[intent] += 1;
                    }
                });
            });
        });
        
        // Find best matching intent
        const bestIntent = Object.entries(scores).reduce((a, b) => 
            scores[a[0]] > scores[b[0]] ? a : b
        );
        
        // Improved confidence calculation
        let confidence;
        if (bestIntent[1] >= 100) {
            confidence = 0.95; // High confidence for special cases (greetings, goodbyes)
        } else if (bestIntent[1] > 5) {
            confidence = Math.min(0.9, 0.7 + (bestIntent[1] * 0.02));
        } else if (bestIntent[1] > 0) {
            confidence = Math.min(0.7, 0.4 + (bestIntent[1] * 0.1));
        } else {
            confidence = 0.2; // Low confidence for no matches
        }
        
        // If confidence is too low or no clear winner, mark as unknown
        const intentName = (bestIntent[1] === 0 || confidence < 0.3) ? 'unknown' : bestIntent[0];
        
        return {
            name: intentName,
            confidence: confidence,
            scores: scores
        };
    }
    
    /**
     * Reinforce successful intent patterns (ML simulation)
     */
    reinforcePattern(message, intentName) {
        try {
            // Simulate machine learning reinforcement
            // In real implementation, this would update ML model weights
            
            const words = message.toLowerCase().split(' ');
            const relevantWords = words.filter(word => word.length > 3);
            
            // Add successful keywords to intent patterns
            if (this.intents[intentName] && relevantWords.length > 0) {
                relevantWords.forEach(word => {
                    if (!this.intents[intentName].includes(word)) {
                        // Add word with low weight initially
                        this.intents[intentName].push(word);
                        console.log(`🔄 Learned new keyword "${word}" for intent "${intentName}"`);
                    }
                });
            }
        } catch (error) {
            console.warn('Intent reinforcement failed:', error);
        }
    }
}

/**
 * Entity Extraction System
 */
class EntityExtractor {
    constructor() {
        this.patterns = {
            'energy': /(\d+(?:,\d{3})*(?:\.\d+)?)\s*(?:kwh|kilowatt|energy)/i,
            'fuel': /(\d+(?:,\d{3})*(?:\.\d+)?)\s*(?:liters?|litres?|gallons?|fuel)/i,
            'employees': /(\d+(?:,\d{3})*)\s*(?:employees?|workers?|staff)/i,
            'travel': /(\d+(?:,\d{3})*(?:\.\d+)?)\s*(?:km|kilometers?|miles?|travel)/i,
            'waste': /(\d+(?:,\d{3})*(?:\.\d+)?)\s*(?:tons?|tonnes?|waste)/i,
            'percentage': /(\d+(?:\.\d+)?)\s*(?:%|percent)/i,
            'industry': /(manufacturing|retail|technology|healthcare|finance|automotive|aviation|construction|agriculture)/i,
            'timeframe': /(\d+)\s*(?:years?|months?)/i
        };
    }

    async extract(message) {
        const entities = [];
        
        Object.entries(this.patterns).forEach(([type, pattern]) => {
            const matches = message.match(pattern);
            if (matches) {
                entities.push({
                    type: type,
                    value: matches[1],
                    confidence: 0.9
                });
            }
        });
        
        return entities;
    }
    
    /**
     * Update entity extraction patterns based on successful extractions (ML simulation)
     */
    updatePatterns(message, extractedEntities) {
        try {
            // Simulate machine learning pattern updates
            // In real implementation, this would update ML model patterns
            
            extractedEntities.forEach(entity => {
                if (entity.type && entity.value) {
                    console.log(`🔍 Learning entity pattern: ${entity.type} = "${entity.value}"`);
                    // In a real ML system, we would update pattern weights and add new patterns
                }
            });
        } catch (error) {
            console.warn('Entity pattern update failed:', error);
        }
    }
}

/**
 * Carbon Knowledge Base
 */
class CarbonKnowledgeBase {
    constructor() {
        this.concepts = {
            'carbon_footprint': {
                text: "A carbon footprint is the total amount of greenhouse gases produced directly and indirectly by human activities, measured in CO2 equivalent. It includes emissions from energy use, transportation, waste, and supply chains.",
                related: ['scope_1', 'scope_2', 'scope_3'],
                confidence: 0.95
            },
            'scope_1': {
                text: "Scope 1 emissions are direct greenhouse gas emissions from sources owned or controlled by your organization, such as fuel combustion in company vehicles or on-site energy generation.",
                related: ['scope_2', 'scope_3', 'ghg_protocol'],
                confidence: 0.95
            },
            'scope_2': {
                text: "Scope 2 emissions are indirect emissions from purchased electricity, steam, heating, or cooling consumed by your organization.",
                related: ['scope_1', 'scope_3', 'renewable_energy'],
                confidence: 0.95
            }
        };
        
        this.industryInsights = {
            'technology': {
                'general': "Tech companies typically have lower Scope 1&2 emissions but significant Scope 3 emissions from supply chains and cloud services.",
                'reduction': "Focus on renewable energy procurement, efficient data centers, and sustainable software practices."
            },
            'manufacturing': {
                'general': "Manufacturing has high direct emissions from production processes and energy-intensive operations.",
                'reduction': "Implement lean manufacturing, process optimization, and transition to renewable energy sources."
            }
        };
    }

    async explainConcept(concept) {
        const info = this.concepts[concept];
        if (info) {
            return {
                text: info.text,
                related: info.related,
                confidence: info.confidence,
                relatedTopics: info.related.map(r => `Learn about ${r.replace('_', ' ')}`)
            };
        }
        
        return {
            text: "I'd be happy to explain carbon accounting concepts. Try asking about carbon footprint, scope emissions, or GHG protocol.",
            related: [],
            confidence: 0.6,
            relatedTopics: ["Carbon footprint basics", "Emission scopes", "GHG Protocol"]
        };
    }

    async getRecommendations(industry, level) {
        const baseRecommendations = [
            "🔋 Switch to renewable energy sources",
            "📊 Implement comprehensive emissions tracking",
            "🚗 Optimize transportation and logistics",
            "♻️ Establish circular economy practices",
            "🎯 Set science-based reduction targets"
        ];
        
        if (industry === 'technology') {
            baseRecommendations.unshift("☁️ Optimize cloud infrastructure and data centers");
        } else if (industry === 'manufacturing') {
            baseRecommendations.unshift("🏭 Implement lean manufacturing processes");
        }
        
        return baseRecommendations;
    }

    async getIndustryInsights(industry, questionType) {
        const insights = this.industryInsights[industry] || this.industryInsights['technology'];
        
        return {
            answer: insights[questionType] || insights['general'],
            followUpQuestions: [
                "Specific reduction strategies?",
                "Industry benchmarks?",
                "Case studies?",
                "Implementation costs?"
            ]
        };
    }

    async getComplianceInfo(standard, region) {
        const compliance = {
            'ghg_protocol': "The GHG Protocol is the global standard for measuring and managing greenhouse gas emissions. It provides frameworks for Scope 1, 2, and 3 emissions accounting.",
            'iso_14064': "ISO 14064 is an international standard for greenhouse gas accounting and verification, providing principles and requirements for quantification and reporting."
        };
        
        return {
            information: compliance[standard] || compliance['ghg_protocol']
        };
    }

    async getCostAnalysis(analysisType, timeframe) {
        return {
            analysis: `Carbon reduction investments typically show positive ROI within ${timeframe}. Energy efficiency measures often pay back in 2-4 years, while renewable energy projects show returns in 5-8 years.`,
            roi: "15-25% annually",
            payback: "3-6 years average"
        };
    }

    async getReductionStrategies(targetReduction, timeframe, industry) {
        const roadmap = `
Phase 1 (Year 1): Quick wins - Energy efficiency, waste reduction (10-15% reduction)
Phase 2 (Years 2-3): Infrastructure - Renewable energy, equipment upgrades (20-30% reduction)  
Phase 3 (Years 4-5): Advanced - Supply chain optimization, innovation (${targetReduction}% total reduction)
        `;
        
        return {
            roadmap: roadmap.trim(),
            nextSteps: [
                "Conduct energy audit",
                "Set interim milestones", 
                "Develop investment plan",
                "Engage suppliers"
            ]
        };
    }
    
    /**
     * Update response patterns based on successful interactions (ML simulation)
     */
    updateResponsePatterns(intent, response) {
        try {
            // Simulate machine learning response optimization
            // In real implementation, this would update response generation models
            
            if (intent && intent.name && response) {
                console.log(`💡 Learning response pattern for intent "${intent.name}"`);
                // In a real ML system, we would analyze response effectiveness and update generation patterns
            }
        } catch (error) {
            console.warn('Response pattern update failed:', error);
        }
    }
}

// Make classes globally available for browser environment
window.IntelligentChatbot = IntelligentChatbot;
window.IntentClassifier = IntentClassifier;
window.EntityExtractor = EntityExtractor;
window.CarbonKnowledgeBase = CarbonKnowledgeBase;
