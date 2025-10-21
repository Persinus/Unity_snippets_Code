


const tagColorMap: { [key: string]: string } = {
  // Unity specific
  Input: "blue",
  Gameplay: "green",
  Player: "cyan",
  Spawning: "yellow",
  Timer: "yellow",
  UI: "purple",
  Effects: "purple",
  "Pause Menu": "purple",
  Physics: "orange",
  Collision: "orange",
  Tag: "orange",
  Mobile: "red",
  "TextMeshPro": "purple",
  "Rich Text": "purple",
  "Addressables": "indigo",
  "Asset Management": "indigo",
  "Animator": "teal",
  "Movement": "teal",
  "Boundaries": "orange",
  "Time": "yellow",
  "Cinemachine": "red",
  "Camera": "red",
  "Scene Management": "green",
  "Health": "red",
  "Audio": "blue",
  "Visuals": "purple",
  "Rotation": "teal",
  "2D": "cyan",
  "3D": "cyan",
  "Platformer": "green",
  "Feedback": "yellow",
  "Joint": "orange",
  "Native": "red",
  "Integration": "red",
  "Configuration": "red",
  "Android": "green",
  "iOS": "gray",
  "Build": "gray",
  "Permissions": "orange",
  "Java": "orange",
  "Network": "blue",
  "Coroutine": "yellow",
  "Interface": "pink",

  // Data & Architecture
  "Data Persistence": "pink",
  Saving: "pink",
  PlayerPrefs: "pink",
  JSON: "pink",
  Newtonsoft: "pink",
  "ScriptableObject": "pink",
  Architecture: "pink",
  "Design Pattern": "pink",
  Singleton: "pink",
  "Object Pool": "pink",
  
  // AI
  "AI": "indigo",

  // Gameplay Systems
  "Interaction": "teal",
  "Inventory": "orange",
  "Stamina": "green",
  "Quest": "yellow",
  "Navigation": "blue",
  "Render Texture": "purple",

  // Monetization
  AdMob: "green",
  Monetization: "green",

  // Tools
  DOTween: "teal",
  Animation: "teal",
  Scale: "teal",
  Fade: "teal",
  Punch: "teal",
  "Rigidbody": "orange",

  // General
  Optimization: "indigo",
  Performance: "indigo",
  "Utility": "gray",
};

export function getTagColorClasses(tag: string, selected: boolean = false, hasSelection: boolean = false): string {
  const colorName = tagColorMap[tag] || "gray";
  const baseClasses = `bg-tag-${colorName}-bg text-tag-${colorName}-fg border-tag-${colorName}-bg`;
  
  if (hasSelection) {
    if (selected) {
      return `${baseClasses} brightness-125 shadow-md`;
    } else {
      return `${baseClasses} opacity-50 hover:opacity-100`;
    }
  }
  
  return `${baseClasses} hover:brightness-125`;
}

// Generates CSS variables for Tailwind
export function getTagColorVariables() {
  const colors = {
    blue: { bg: '217 91% 60%', fg: '217 91% 98%' },
    green: { bg: '142 71% 45%', fg: '142 71% 98%' },
    cyan: { bg: '187 81% 55%', fg: '187 81% 98%' },
    yellow: { bg: '48 96% 58%', fg: '48 96% 5%' },
    purple: { bg: '262 84% 60%', fg: '262 84% 98%' },
    orange: { bg: '24 95% 53%', fg: '24 95% 98%' },
    red: { bg: '0 84% 60%', fg: '0 84% 98%' },
    pink: { bg: '329 84% 60%', fg: '329 84% 98%' },
    teal: { bg: '166 84% 45%', fg: '166 84% 98%' },
    indigo: { bg: '239 84% 60%', fg: '239 84% 98%' },
    gray: { bg: '240 5% 50%', fg: '240 5% 98%' },
  };

  const variables: { [key: string]: string } = {};
  for (const [name, shades] of Object.entries(colors)) {
    variables[`--tag-${name}-bg`] = shades.bg;
    variables[`--tag-${name}-fg`] = shades.fg;
  }
  return variables;
}

    
    
