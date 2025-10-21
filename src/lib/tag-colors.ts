
const tagColorMap: { [key: string]: string } = {
  // Unity specific
  "Input": "bg-tag-blue-bg text-tag-blue-fg border-tag-blue-bg",
  "Gameplay": "bg-tag-green-bg text-tag-green-fg border-tag-green-bg",
  "Player": "bg-tag-cyan-bg text-tag-cyan-fg border-tag-cyan-bg",
  "Spawning": "bg-tag-yellow-bg text-tag-yellow-fg border-tag-yellow-bg",
  "Timer": "bg-tag-lime-bg text-tag-lime-fg border-tag-lime-bg",
  "UI": "bg-tag-purple-bg text-tag-purple-fg border-tag-purple-bg",
  "Effects": "bg-tag-violet-bg text-tag-violet-fg border-tag-violet-bg",
  "Pause Menu": "bg-tag-fuchsia-bg text-tag-fuchsia-fg border-tag-fuchsia-bg",
  "Physics": "bg-tag-orange-bg text-tag-orange-fg border-tag-orange-bg",
  "Collision": "bg-tag-amber-bg text-tag-amber-fg border-tag-amber-bg",
  "Tag": "bg-tag-warm-gray-bg text-tag-warm-gray-fg border-tag-warm-gray-bg",
  "Mobile": "bg-tag-red-bg text-tag-red-fg border-tag-red-bg",
  "TextMeshPro": "bg-tag-light-blue-bg text-tag-light-blue-fg border-tag-light-blue-bg",
  "Rich Text": "bg-tag-sky-bg text-tag-sky-fg border-tag-sky-bg",
  "Addressables": "bg-tag-indigo-bg text-tag-indigo-fg border-tag-indigo-bg",
  "Asset Management": "bg-tag-slate-bg text-tag-slate-fg border-tag-slate-bg",
  "Animator": "bg-tag-teal-bg text-tag-teal-fg border-tag-teal-bg",
  "Movement": "bg-tag-emerald-bg text-tag-emerald-fg border-tag-emerald-bg",
  "Boundaries": "bg-tag-true-gray-bg text-tag-true-gray-fg border-tag-true-gray-bg",
  "Time": "bg-tag-yellow-bg text-tag-yellow-fg border-tag-yellow-bg",
  "Cinemachine": "bg-tag-rose-bg text-tag-rose-fg border-tag-rose-bg",
  "Camera": "bg-tag-rose-bg text-tag-rose-fg border-tag-rose-bg",
  "Scene Management": "bg-tag-light-green-bg text-tag-light-green-fg border-tag-light-green-bg",
  "Health": "bg-tag-red-bg text-tag-red-fg border-tag-red-bg",
  "Audio": "bg-tag-sky-bg text-tag-sky-fg border-tag-sky-bg",
  "Visuals": "bg-tag-fuchsia-bg text-tag-fuchsia-fg border-tag-fuchsia-bg",
  "Rotation": "bg-tag-cyan-bg text-tag-cyan-fg border-tag-cyan-bg",
  "2D": "bg-tag-cool-gray-bg text-tag-cool-gray-fg border-tag-cool-gray-bg",
  "3D": "bg-tag-blue-gray-bg text-tag-blue-gray-fg border-tag-blue-gray-bg",
  "Platformer": "bg-tag-lime-bg text-tag-lime-fg border-tag-lime-bg",
  "Feedback": "bg-tag-amber-bg text-tag-amber-fg border-tag-amber-bg",
  "Joint": "bg-tag-orange-bg text-tag-orange-fg border-tag-orange-bg",
  "Native": "bg-tag-red-bg text-tag-red-fg border-tag-red-bg",
  "Integration": "bg-tag-red-bg text-tag-red-fg border-tag-red-bg",
  "Configuration": "bg-tag-gray-bg text-tag-gray-fg border-tag-gray-bg",
  "Android": "bg-tag-green-bg text-tag-green-fg border-tag-green-bg",
  "iOS": "bg-tag-slate-bg text-tag-slate-fg border-tag-slate-bg",
  "Build": "bg-tag-cool-gray-bg text-tag-cool-gray-fg border-tag-cool-gray-bg",
  "Permissions": "bg-tag-orange-bg text-tag-orange-fg border-tag-orange-bg",
  "Java": "bg-tag-orange-bg text-tag-orange-fg border-tag-orange-bg",
  "Network": "bg-tag-blue-bg text-tag-blue-fg border-tag-blue-bg",
  "Coroutine": "bg-tag-yellow-bg text-tag-yellow-fg border-tag-yellow-bg",
  "Interface": "bg-tag-pink-bg text-tag-pink-fg border-tag-pink-bg",
  "Tooltip": "bg-tag-gray-bg text-tag-gray-fg border-tag-gray-bg",
  "Settings": "bg-tag-slate-bg text-tag-slate-fg border-tag-slate-bg",
  "Stealth": "bg-tag-indigo-bg text-tag-indigo-fg border-tag-indigo-bg",
  "Rendering": "bg-tag-purple-bg text-tag-purple-fg border-tag-purple-bg",

  // Data & Architecture
  "Data Persistence": "bg-tag-pink-bg text-tag-pink-fg border-tag-pink-bg",
  "Saving": "bg-tag-pink-bg text-tag-pink-fg border-tag-pink-bg",
  "PlayerPrefs": "bg-tag-pink-bg text-tag-pink-fg border-tag-pink-bg",
  "JSON": "bg-tag-pink-bg text-tag-pink-fg border-tag-pink-bg",
  "Newtonsoft": "bg-tag-pink-bg text-tag-pink-fg border-tag-pink-bg",
  "ScriptableObject": "bg-tag-pink-bg text-tag-pink-fg border-tag-pink-bg",
  "Architecture": "bg-tag-pink-bg text-tag-pink-fg border-tag-pink-bg",
  "Design Pattern": "bg-tag-pink-bg text-tag-pink-fg border-tag-pink-bg",
  "Singleton": "bg-tag-pink-bg text-tag-pink-fg border-tag-pink-bg",
  "Object Pool": "bg-tag-indigo-bg text-tag-indigo-fg border-tag-indigo-bg",
  
  // AI & Combat
  "AI": "bg-tag-indigo-bg text-tag-indigo-fg border-tag-indigo-bg",
  "Combat": "bg-tag-red-bg text-tag-red-fg border-tag-red-bg",

  // Gameplay Systems
  "Interaction": "bg-tag-teal-bg text-tag-teal-fg border-tag-teal-bg",
  "Inventory": "bg-tag-orange-bg text-tag-orange-fg border-tag-orange-bg",
  "Stamina": "bg-tag-green-bg text-tag-green-fg border-tag-green-bg",
  "Quest": "bg-tag-yellow-bg text-tag-yellow-fg border-tag-yellow-bg",
  "Navigation": "bg-tag-blue-bg text-tag-blue-fg border-tag-blue-bg",
  "Render Texture": "bg-tag-purple-bg text-tag-purple-fg border-tag-purple-bg",
  "Trigger": "bg-tag-orange-bg text-tag-orange-fg border-tag-orange-bg",

  // Monetization
  "AdMob": "bg-tag-green-bg text-tag-green-fg border-tag-green-bg",
  "Monetization": "bg-tag-green-bg text-tag-green-fg border-tag-green-bg",

  // Tools
  "DOTween": "bg-tag-teal-bg text-tag-teal-fg border-tag-teal-bg",
  "Animation": "bg-tag-teal-bg text-tag-teal-fg border-tag-teal-bg",
  "Scale": "bg-tag-teal-bg text-tag-teal-fg border-tag-teal-bg",
  "Fade": "bg-tag-teal-bg text-tag-teal-fg border-tag-teal-bg",
  "Punch": "bg-tag-teal-bg text-tag-teal-fg border-tag-teal-bg",
  "Rigidbody": "bg-tag-orange-bg text-tag-orange-fg border-tag-orange-bg",

  // General
  "Optimization": "bg-tag-indigo-bg text-tag-indigo-fg border-tag-indigo-bg",
  "Performance": "bg-tag-indigo-bg text-tag-indigo-fg border-tag-indigo-bg",
  "Utility": "bg-tag-gray-bg text-tag-gray-fg border-tag-gray-bg",
  "Gesture": "bg-tag-sky-bg text-tag-sky-fg border-tag-sky-bg",
  "Sensor": "bg-tag-cyan-bg text-tag-cyan-fg border-tag-cyan-bg",
  
  // New tags from this request
  "Daily Reward": "bg-tag-gold-bg text-tag-gold-fg border-tag-gold-bg",
  "IAP": "bg-tag-lime-bg text-tag-lime-fg border-tag-lime-bg",
  "Drag and Drop": "bg-tag-true-gray-bg text-tag-true-gray-fg border-tag-true-gray-bg",
  "UniTask": "bg-tag-deep-purple-bg text-tag-deep-purple-fg border-tag-deep-purple-bg",
};

const defaultColorClasses = "bg-tag-gray-bg text-tag-gray-fg border-tag-gray-bg";

export function getTagColorClasses(tag: string, selected: boolean = false, hasSelection: boolean = false): string {
  const baseClasses = tagColorMap[tag] || defaultColorClasses;
  
  // Add a general transition for a smoother effect
  const transitionClass = "transition-all duration-200";

  if (hasSelection) {
    if (selected) {
      // The tag is selected, make it pop
      return `${baseClasses} ${transitionClass} brightness-100 shadow-md`;
    } else {
      // There's a selection, but this tag is not it, so dim it
      return `${baseClasses} ${transitionClass} opacity-40 hover:opacity-100 hover:brightness-125`;
    }
  }
  
  // No selection, default hover effect
  return `${baseClasses} ${transitionClass} hover:brightness-125`;
}
