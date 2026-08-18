export interface EnergyData {
  operon: number;
  temp: number;
  expected: number;
  actual: number;
  farmCapacityMW?: number; // E.g., 50 for a 50 MW farm
  electricityRate?: number; // SAR per kWh
}

export interface ScenarioResult {
  noAction: {
    threeDayLossPercent: number;
    moneyLost: number;
  };
  immediateAction: {
    savings: number;
    interventionCost: number;
  };
  delayedAction: {
    savings: number;
  };
}

export interface AuthOperatorOutput {
  issue: string;
  currentLossPercent: number;
  
  scenarios: ScenarioResult;

  decision: {
    recommendedAction: string;
    bestTime: string;
    reason: string;
  };

  automation: {
    status: string;
    message: string;
  };
}

export function analyzeEnergy(data: EnergyData): AuthOperatorOutput {
  const { operon, temp, expected, actual } = data;
  const SAR_PER_KWH = data.electricityRate || 0.18; // Standard Saudi industrial tariff approx
  
  let lossPercent = 0;
  if (expected > 0 && actual < expected) {
    lossPercent = ((expected - actual) / expected) * 100;
  }

  const isOperon = operon > 60;
  const isHeat = temp > 50;

  const issues = [];
  if (isOperon) issues.push("Operon Accumulation");
  if (isHeat) issues.push("High Temperature");
  if (!isOperon && !isHeat && lossPercent > 5) issues.push("Minor Inefficiency");
  
  const finalIssue = issues.length > 0 ? issues.join(" & ") : "Optimal Generation";

  // Daily multiplier: assume values are given for 1 hour, multiply by peak sun hours (e.g., 6)
  const peakSunHours = 6;
  const baseDailyRevenue = expected * peakSunHours * SAR_PER_KWH;
  const currentDailyLoss = (lossPercent / 100) * baseDailyRevenue;

  // Simulate +5% loss increase per day if operon/heat is unresolved
  const compoundingRate = isOperon ? 0.05 : isHeat ? 0.02 : 0.01;
  const day1Loss = currentDailyLoss;
  const day2Loss = baseDailyRevenue * Math.min(1, (lossPercent/100 + compoundingRate));
  const day3Loss = baseDailyRevenue * Math.min(1, (lossPercent/100 + compoundingRate * 2));
  
  const totalNoActionLoss = parseFloat((day1Loss + day2Loss + day3Loss).toFixed(2));
  const endOf3DayLossPercent = parseFloat((lossPercent + (compoundingRate * 2 * 100)).toFixed(1));

  // Immediate Action (Assume dispatch costs 500 SAR)
  const baseCleaningCost = 500; 
  // If we clean today, tomorrow and day 3 loss is 0. 
  const immediateSavings = totalNoActionLoss - baseCleaningCost - day1Loss; // Day 1 happened, day 2 and 3 saved

  // Delayed Action (Wait 2 days)
  // Day 1 & Day 2 occurs, cleaning happens end of day 2. Day 3 is saved.
  // Wait, if it costs less to bulk-clean later? Let's just assume flat dispatch fee.
  const delayedSavings = totalNoActionLoss - (day1Loss + day2Loss + baseCleaningCost); 

  // Decision Logic Setup
  let recommendedAction = "";
  let bestTime = "";
  let reason = "";
  let autoStatus = "";
  let autoMessage = "";

  if (lossPercent < 10) {
    recommendedAction = "None";
    bestTime = "N/A";
    reason = "System performance is within optimal range. Cleaning costs would exceed generation savings.";
    autoStatus = "Monitoring";
    autoMessage = "System running nominally. No maintenance required.";
  } else if (lossPercent >= 10 && lossPercent <= 25) {
    recommendedAction = "Maintenance Wash";
    bestTime = "48 Hours";
    reason = `Performance loss is minor (${lossPercent.toFixed(1)}%). Scheduled wash in 48 hours is more cost-effective than immediate dispatch.`;
    autoStatus = "Scheduled";
    autoMessage = "Scheduled maintenance wash queued.";
  } else {
    // > 25%
    recommendedAction = "Immediate Clean";
    bestTime = "Immediate";
    reason = `Significant efficiency loss detected. Immediate wash required to prevent generation loss (est. SAR ${totalNoActionLoss} over 3 days).`;
    autoStatus = "Dispatched";
    autoMessage = "Cleaning unit dispatched.";
  }

  return {
    issue: finalIssue,
    currentLossPercent: parseFloat(lossPercent.toFixed(1)),
    scenarios: {
      noAction: {
        threeDayLossPercent: Math.min(100, endOf3DayLossPercent),
        moneyLost: totalNoActionLoss,
      },
      immediateAction: {
        savings: parseFloat(Math.max(0, immediateSavings).toFixed(2)),
        interventionCost: baseCleaningCost,
      },
      delayedAction: {
        savings: parseFloat(Math.max(0, delayedSavings).toFixed(2)),
      }
    },
    decision: {
      recommendedAction,
      bestTime,
      reason
    },
    automation: {
      status: autoStatus,
      message: autoMessage
    }
  };
}

