
const tagColorMap: { [key: string]: string } = {
  // Unity specific
  Input: "bg-tag-blue-bg text-tag-blue-fg border-tag-blue-bg",
  Gameplay: "bg-tag-green-bg text-tag-green-fg border-tag-green-bg",
  Player: "bg-tag-cyan-bg text-tag-cyan-fg border-tag-cyan-bg",
  Spawning: "bg-tag-yellow-bg text-tag-yellow-fg border-tag-yellow-bg",
  Timer: "bg-tag-yellow-bg text-tag-yellow-fg border-tag-yellow-bg",
  UI: "bg-tag-purple-bg text-tag-purple-fg border-tag-purple-bg",
  Effects: "bg-tag-purple-bg text-tag-purple-fg border-tag-purple-bg",
  "Pause Menu": "bg-tag-purple-bg text-tag-purple-fg border-tag-purple-bg",
  Physics: "bg-tag-orange-bg text-tag-orange-fg border-tag-orange-bg",
  Collision: "bg-tag-orange-bg text-tag-orange-fg border-tag-orange-bg",
  Tag: "bg-tag-orange-bg text-tag-orange-fg border-tag-orange-bg",
  Mobile: "bg-tag-red-bg text-tag-red-fg border-tag-red-bg",
  "TextMeshPro": "bg-tag-purple-bg text-tag-purple-fg border-tag-purple-bg",
  "Rich Text": "bg-tag-purple-bg text-tag-purple-fg border-tag-purple-bg",
  "Addressables": "bg-tag-indigo-bg text-tag-indigo-fg border-tag-indigo-bg",
  "Asset Management": "bg-tag-indigo-bg text-tag-indigo-fg border-tag-indigo-bg",
  "Animator": "bg-tag-teal-bg text-tag-teal-fg border-tag-teal-bg",
  "Movement": "bg-tag-teal-bg text-tag-teal-fg border-tag-teal-bg",
  "Boundaries": "bg-tag-orange-bg text-tag-orange-fg border-tag-orange-bg",
  "Time": "bg-tag-yellow-bg text-tag-yellow-fg border-tag-yellow-bg",
  "Cinemachine": "bg-tag-red-bg text-tag-red-fg border-tag-red-bg",
  "Camera": "bg-tag-red-bg text-tag-red-fg border-tag-red-bg",
  "Scene Management": "bg-tag-green-bg text-tag-green-fg border-tag-green-bg",
  "Health": "bg-tag-red-bg text-tag-red-fg border-tag-red-bg",
  "Audio": "bg-tag-blue-bg text-tag-blue-fg border-tag-blue-bg",
  "Visuals": "bg-tag-purple-bg text-tag-purple-fg border-tag-purple-bg",
  "Rotation": "bg-tag-teal-bg text-tag-teal-fg border-tag-teal-bg",
  "2D": "bg-tag-cyan-bg text-tag-cyan-fg border-tag-cyan-bg",
  "3D": "bg-tag-cyan-bg text-tag-cyan-fg border-tag-cyan-bg",
  "Platformer": "bg-tag-green-bg text-tag-green-fg border-tag-green-bg",
  "Feedback": "bg-tag-yellow-bg text-tag-yellow-fg border-tag-yellow-bg",
  "Joint": "bg-tag-orange-bg text-tag-orange-fg border-tag-orange-bg",
  "Native": "bg-tag-red-bg text-tag-red-fg border-tag-red-bg",
  "Integration": "bg-tag-red-bg text-tag-red-fg border-tag-red-bg",
  "Configuration": "bg-tag-red-bg text-tag-red-fg border-tag-red-bg",
  "Android": "bg-tag-green-bg text-tag-green-fg border-tag-green-bg",
  "iOS": "bg-tag-gray-bg text-tag-gray-fg border-tag-gray-bg",
  "Build": "bg-tag-gray-bg text-tag-gray-fg border-tag-gray-bg",
  "Permissions": "bg-tag-orange-bg text-tag-orange-fg border-tag-orange-bg",
  "Java": "bg-tag-orange-bg text-tag-orange-fg border-tag-orange-bg",
  "Network": "bg-tag-blue-bg text-tag-blue-fg border-tag-blue-bg",
  "Coroutine": "bg-tag-yellow-bg text-tag-yellow-fg border-tag-yellow-bg",
  "Interface": "bg-tag-pink-bg text-tag-pink-fg border-tag-pink-bg",

  // Data & Architecture
  "Data Persistence": "bg-tag-pink-bg text-tag-pink-fg border-tag-pink-bg",
  Saving: "bg-tag-pink-bg text-tag-pink-fg border-tag-pink-bg",
  PlayerPrefs: "bg-tag-pink-bg text-tag-pink-fg border-tag-pink-bg",
  JSON: "bg-tag-pink-bg text-tag-pink-fg border-tag-pink-bg",
  Newtonsoft: "bg-tag-pink-bg text-tag-pink-fg border-tag-pink-bg",
  "ScriptableObject": "bg-tag-pink-bg text-tag-pink-fg border-tag-pink-bg",
  Architecture: "bg-tag-pink-bg text-tag-pink-fg border-tag-pink-bg",
  "Design Pattern": "bg-tag-pink-bg text-tag-pink-fg border-tag-pink-bg",
  Singleton: "bg-tag-pink-bg text-tag-pink-fg border-tag-pink-bg",
  "Object Pool": "bg-tag-pink-bg text-tag-pink-fg border-tag-pink-bg",
  
  // AI
  "AI": "bg-tag-indigo-bg text-tag-indigo-fg border-tag-indigo-bg",

  // Gameplay Systems
  "Interaction": "bg-tag-teal-bg text-tag-teal-fg border-tag-teal-bg",
  "Inventory": "bg-tag-orange-bg text-tag-orange-fg border-tag-orange-bg",
  "Stamina": "bg-tag-green-bg text-tag-green-fg border-tag-green-bg",
  "Quest": "bg-tag-yellow-bg text-tag-yellow-fg border-tag-yellow-bg",
  "Navigation": "bg-tag-blue-bg text-tag-blue-fg border-tag-blue-bg",
  "Render Texture": "bg-tag-purple-bg text-tag-purple-fg border-tag-purple-bg",

  // Monetization
  AdMob: "bg-tag-green-bg text-tag-green-fg border-tag-green-bg",
  Monetization: "bg-tag-green-bg text-tag-green-fg border-tag-green-bg",

  // Tools
  DOTween: "bg-tag-teal-bg text-tag-teal-fg border-tag-teal-bg",
  Animation: "bg-tag-teal-bg text-tag-teal-fg border-tag-teal-bg",
  Scale: "bg-tag-teal-bg text-tag-teal-fg border-tag-teal-bg",
  Fade: "bg-tag-teal-bg text-tag-teal-fg border-tag-teal-bg",
  Punch: "bg-tag-teal-bg text-tag-teal-fg border-tag-teal-bg",
  "Rigidbody": "bg-tag-orange-bg text-tag-orange-fg border-tag-orange-bg",

  // General
  Optimization: "bg-tag-indigo-bg text-tag-indigo-fg border-tag-indigo-bg",
  Performance: "bg-tag-indigo-bg text-tag-indigo-fg border-tag-indigo-bg",
  "Utility": "bg-tag-gray-bg text-tag-gray-fg border-tag-gray-bg",
};

const defaultColorClasses = "bg-tag-gray-bg text-tag-gray-fg border-tag-gray-bg";

export function getTagColorClasses(tag: string, selected: boolean = false, hasSelection: boolean = false): string {
  const baseClasses = tagColorMap[tag] || defaultColorClasses;
  
  if (hasSelection) {
    if (selected) {
      return `${baseClasses} brightness-125 shadow-md`;
    } else {
      return `${baseClasses} opacity-50 hover:opacity-100`;
    }
  }
  
  return `${baseClasses} hover:brightness-125`;
}
