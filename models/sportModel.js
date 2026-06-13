const sportDatabase = {
    soccer: {
        title: "Soccer (Football) Science",
        image: "/images/slide7.jpg", 
        demands: "High-intensity intermittent running, rapid directional changes, and a robust mix of aerobic and anaerobic energy systems.",
        metrics: ["VO2 Max (55-65 ml/kg/min)", "Repeated Sprint Ability (RSA)", "Change of Direction (COD) Deficit"],
        protocols: "Yo-Yo Intermittent Recovery Test, 30-15 Intermittent Fitness Test (30-15IFT)."
    },
    basketball: {
        title: "Basketball Science",
        image: "/images/slide9.jpg", 
        demands: "Frequent high-velocity accelerations, decelerations, vertical jumping, and heavy reliance on the ATP-PC and anaerobic glycolytic pathways.",
        metrics: ["Rate of Force Development (RFD)", "Reactive Strength Index (RSI)", "Approach Vertical Jump Height"],
        protocols: "Countermovement Jump (CMJ) on Force Plates, Line Drill Sprint Test."
    },
    swimming: {
        title: "Swimming Science",
        image: "/images/slide10.jpg", 
        demands: "Propulsive force generation, active hydrodynamic drag reduction, and high upper-body metabolic conditioning.",
        metrics: ["Stroke Rate vs. Stroke Length", "Lactate Threshold Testing", "Critical Swim Speed (CSS)"],
        protocols: "7x200m Step Test for Blood Lactate Profiling, Critical Swim Speed Test."
    },
    rugby: {
        title: "Rugby Union & League Science",
        image: "/images/slide5.jpg", 
        demands: "High collision forces, repeated high-intensity efforts, positional variation (forwards vs. backs), and massive upper/lower body power requirements.",
        metrics: ["Relative Strength (Squat/Bench to Bodyweight)", "Maximal Aerobic Speed (MAS)", "Momentum at Peak Velocity"],
        protocols: "1200m Shuttle Test (Bronco Test), 1RM Dynamic Strength Testing."
    },
    running: {
        title: "Endurance Running & Athletics",
        image: "/images/slide4.jpg", 
        demands: "Prolonged aerobic energy production, optimal running economy, high lactate threshold, and vertical stiffness maintenance over time.",
        metrics: ["Running Economy (Oxygen consumption at a set pace)", "Velocity at VO2 Max (vVO2max)", "Lactate Turnpoint 2 (LT2)"],
        protocols: "Graded Exercise Test (GXT) with metabolic cart analysis, Step Test for Lactate Threshold."
    },
    strength: {
        title: "Strength & Power Sports (Weightlifting/CrossFit)",
        image: "/images/slide11.png", 
        demands: "High neuromuscular recruitment, Olympic lifting technical proficiency, high glycolytic capacity (CrossFit), and maximal force output.",
        metrics: ["Barbell Peak Velocity (m/s)", "Maximal Voluntary Contraction (MVC)", "Anaerobic Power Output"],
        protocols: "Velocity-Based Training (VBT) profiling, Wingate Anaerobic Test."
    }
};

exports.getSportByCode = (code) => {
    return sportDatabase[code.toLowerCase()] || null;
};

exports.getAllSports = () => {
    return Object.keys(sportDatabase).map(key => {
        return {
            code: key,
            title: sportDatabase[key].title
        };
    });
};