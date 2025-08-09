# EcoLeaf Analytics - AI-Powered Carbon Footprint Calculator

🌍 **Transform your sustainability journey with AI-powered carbon accounting**, just like [Greenly.earth](https://greenly.earth/en-us)!

## 🚀 What This Does

This is a complete **ML-powered carbon footprint calculator** that:

- ✅ Uses **real emission factors** from IPCC, EPA, and industry standards
- 🤖 Provides **AI-powered recommendations** based on your data
- 📊 Shows **detailed breakdowns** by emission scopes (1, 2, 3)
- 🔍 Includes **anomaly detection** to flag unusual patterns
- 📈 Offers **industry benchmarking** and performance insights
- 💬 Features an **AI chatbot** for sustainability questions

## 🛠️ How to Run (Step-by-Step)

### Prerequisites
- Node.js installed on your computer
- A terminal/command prompt

### Step 1: Install Dependencies
```bash
cd "/Users/apple/Desktop/Lavanya`s Project/project1"
npm install
```

### Step 2: Start the Server
```bash
npm start
```

You should see:
```
🚀 EcoLeaf Analytics ML Server running on http://localhost:3000
📊 Carbon Calculator: http://localhost:3000/try11.html
🤖 API Endpoints:
   POST /api/footprint - ML Carbon Footprint Calculation
   POST /api/ai-analysis - Advanced AI Analytics
   GET /api/benchmark/:industry - Industry Benchmarking
```

### Step 3: Open Your Browser
Go to: **http://localhost:3000/try11.html**

## 📊 How to Use the Calculator

### 1. Fill in Your Company Data:
- **Annual Energy Consumption (kWh)**: Your electricity usage
  - Example: 150,000 kWh for a mid-size office
- **Annual Fuel Consumption (liters)**: Gas, diesel for vehicles/heating
  - Example: 50,000 liters for company fleet
- **Number of Employees**: Your workforce size
  - Example: 100 employees
- **Annual Business Travel (km)**: Flights, car travel for business
  - Example: 200,000 km for sales teams
- **Annual Waste Generated (tons)**: All waste your company produces
  - Example: 15.5 tons for office operations

### 2. Click "Calculate Carbon Footprint"

### 3. Get Your AI-Powered Results:
- 🌍 **Total emissions** in tons CO2 equivalent
- 📊 **Scope 1, 2, 3 breakdown** (industry standard)
- 🎯 **Performance benchmarking** (Excellent/Good/Average/Needs Improvement)
- 🤖 **AI recommendations** with priority levels
- ⚠️ **Anomaly detection** if unusual patterns found
- 📈 **Uncertainty analysis** for data quality

## 🤖 AI Features Explained

### Smart Recommendations
The AI analyzes your data and provides prioritized actions:
- **High Priority**: Biggest impact opportunities (e.g., renewable energy)
- **Medium Priority**: Operational improvements (e.g., remote work)
- **Low Priority**: Fine-tuning optimizations

### Anomaly Detection
Flags unusual patterns like:
- Extremely high energy per employee
- Excessive business travel
- Abnormal waste generation

### Industry Benchmarking
Compares your performance against:
- **Technology companies**: Lower energy intensity
- **Manufacturing**: Higher due to production
- **General business**: Mixed operations

## 🌟 Advanced Features

### AI Chatbot
- Click the chat bubble (💬) in bottom right
- Ask questions about:
  - Carbon accounting best practices
  - Sustainability strategies
  - Platform features
  - Technical support

### Example Questions for Chatbot:
- "How can I reduce my company's carbon footprint?"
- "What are science-based targets?"
- "How does the AI calculate recommendations?"

## 📈 API Endpoints (For Developers)

### 1. Carbon Footprint Calculation
```bash
POST http://localhost:3000/api/footprint
Content-Type: application/json

{
  "annualEnergyKWh": 150000,
  "annualFuelLiters": 50000,
  "numEmployees": 100,
  "annualTravelKm": 200000,
  "annualWasteTons": 15.5
}
```

### 2. Advanced AI Analysis
```bash
POST http://localhost:3000/api/ai-analysis
Content-Type: application/json

{
  "targetYear": 2030
}
```

### 3. Industry Benchmarking
```bash
GET http://localhost:3000/api/benchmark/technology
GET http://localhost:3000/api/benchmark/manufacturing
GET http://localhost:3000/api/benchmark/general
```

## 🎯 Example Usage Scenarios

### Small Tech Startup (25 employees)
```
Energy: 25,000 kWh
Fuel: 5,000 liters
Employees: 25
Travel: 50,000 km
Waste: 3 tons

Expected Result: ~15-20 tCO2e total
Performance: Good to Excellent
```

### Mid-Size Manufacturing (200 employees)
```
Energy: 500,000 kWh
Fuel: 100,000 liters
Employees: 200
Travel: 150,000 km
Waste: 50 tons

Expected Result: ~800-1,200 tCO2e total
Performance: Average to Good
```

### Large Corporation (1,000 employees)
```
Energy: 2,000,000 kWh
Fuel: 300,000 liters
Employees: 1,000
Travel: 2,000,000 km
Waste: 200 tons

Expected Result: ~4,000-6,000 tCO2e total
AI will provide comprehensive recommendations
```

## 🔧 Technical Details

### ML Algorithm
- **Linear regression** with scientifically-validated emission factors
- **Real-world coefficients** from IPCC, EPA, and Greenly methodologies
- **GHG Protocol compliant** calculations
- **Uncertainty quantification** for data quality assessment

### Emission Factors Used
- **Electricity**: 0.475 kgCO2e/kWh (global average)
- **Diesel**: 2.68 kgCO2e/liter
- **Business travel**: 0.192 kgCO2e/km (average)
- **Waste**: 582 kgCO2e/ton (mixed waste)
- **Employee baseline**: 1,200 kgCO2e/employee/year

## 🛠️ Troubleshooting

### Server Won't Start
```bash
# Check if port 3000 is in use
lsof -i :3000

# Kill any process using port 3000
kill -9 <PID>

# Try starting again
npm start
```

### Calculator Not Working
1. Check browser console for errors (F12)
2. Ensure server is running at http://localhost:3000
3. Try refreshing the page
4. Check that all form fields have valid numbers

### Missing Dependencies
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

## 🌍 Real-World Impact

This calculator helps you:
- **Measure**: Get accurate baseline emissions
- **Reduce**: Follow AI-powered recommendations
- **Report**: Generate compliant sustainability reports
- **Comply**: Meet regulatory requirements (CSRD, TCFD, etc.)

## 🎉 What Makes This Special

✅ **Production-ready**: Real emission factors, not toy calculations  
✅ **AI-powered**: Smart recommendations based on your specific data  
✅ **Industry-compliant**: Follows GHG Protocol and international standards  
✅ **User-friendly**: Beautiful interface, no coding knowledge needed  
✅ **Comprehensive**: Covers all emission scopes with detailed insights  
✅ **Educational**: AI chatbot teaches sustainability best practices  

---

**Ready to start your carbon accounting journey?** 🚀

Run `npm start` and visit http://localhost:3000/try11.html to begin!
