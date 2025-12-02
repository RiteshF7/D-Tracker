export type DifficultyLevel = "Beginner" | "Intermediate" | "Athlete";
export type MuscleGroup = "Legs" | "Biceps" | "Chest" | "Back" | "Shoulders" | "Core" | "Full Body";
export type Category = "Weight Loss" | "Strength Build" | "Calisthenics" | "Warmup/Stretches" | "Yoga";

export interface Exercise {
    id: string;
    name: string;
    category: Category;
    muscleGroup: MuscleGroup;
    difficulty: DifficultyLevel;
    image: string; // URL to illustration
    steps: string[];
}

export const exercises: Exercise[] = [
    // --- Weight Loss ---
    {
        id: "wl-1",
        name: "High Knees",
        category: "Weight Loss",
        muscleGroup: "Full Body",
        difficulty: "Beginner",
        image: "https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?q=80&w=1000&auto=format&fit=crop",
        steps: ["Stand tall with feet hip-width apart.", "Lift right knee to chest.", "Switch quickly to left knee.", "Continue alternating at a running pace."]
    },
    {
        id: "wl-2",
        name: "Burpees",
        category: "Weight Loss",
        muscleGroup: "Full Body",
        difficulty: "Intermediate",
        image: "https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?q=80&w=1000&auto=format&fit=crop",
        steps: ["Drop to a squat position.", "Kick feet back into a plank.", "Perform a push-up.", "Jump feet back to hands.", "Explode up into a jump."]
    },
    {
        id: "wl-3",
        name: "Mountain Climbers",
        category: "Weight Loss",
        muscleGroup: "Core",
        difficulty: "Intermediate",
        image: "https://images.unsplash.com/photo-1434608519344-49d77a699ded?q=80&w=1000&auto=format&fit=crop",
        steps: ["Start in a plank position.", "Drive right knee towards chest.", "Switch quickly to left knee.", "Keep hips down and core tight."]
    },

    // --- Strength Build ---
    {
        id: "sb-1",
        name: "Barbell Squat",
        category: "Strength Build",
        muscleGroup: "Legs",
        difficulty: "Intermediate",
        image: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=1000&auto=format&fit=crop",
        steps: ["Place barbell on upper back.", "Feet shoulder-width apart.", "Lower hips back and down.", "Keep chest up and knees out.", "Drive back up to standing."]
    },
    {
        id: "sb-2",
        name: "Deadlift",
        category: "Strength Build",
        muscleGroup: "Back",
        difficulty: "Athlete",
        image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1000&auto=format&fit=crop",
        steps: ["Stand with feet hip-width under bar.", "Hinge at hips to grip bar.", "Keep back flat and chest up.", "Drive through heels to stand up.", "Lower with control."]
    },
    {
        id: "sb-3",
        name: "Bench Press",
        category: "Strength Build",
        muscleGroup: "Chest",
        difficulty: "Intermediate",
        image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1000&auto=format&fit=crop",
        steps: ["Lie on bench, eyes under bar.", "Grip bar slightly wider than shoulders.", "Lower bar to mid-chest.", "Press bar back up to start."]
    },
    {
        id: "sb-4",
        name: "Dumbbell Bicep Curl",
        category: "Strength Build",
        muscleGroup: "Biceps",
        difficulty: "Beginner",
        image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1000&auto=format&fit=crop",
        steps: ["Stand holding dumbbells at sides.", "Keep elbows close to torso.", "Curl weights up towards shoulders.", "Squeeze biceps at top.", "Lower slowly."]
    },

    // --- Calisthenics ---
    {
        id: "cal-1",
        name: "Push-ups",
        category: "Calisthenics",
        muscleGroup: "Chest",
        difficulty: "Beginner",
        image: "https://images.unsplash.com/photo-1598971639058-9b196488868b?q=80&w=1000&auto=format&fit=crop",
        steps: ["Start in plank position.", "Lower body until chest nearly touches floor.", "Push back up to start.", "Keep body in a straight line."]
    },
    {
        id: "cal-2",
        name: "Pull-ups",
        category: "Calisthenics",
        muscleGroup: "Back",
        difficulty: "Intermediate",
        image: "https://images.unsplash.com/photo-1598971639058-9b196488868b?q=80&w=1000&auto=format&fit=crop", // Reusing generic fitness image for now
        steps: ["Grip bar wider than shoulders.", "Hang with arms fully extended.", "Pull chest up to bar.", "Lower slowly to start."]
    },
    {
        id: "cal-3",
        name: "Muscle-up",
        category: "Calisthenics",
        muscleGroup: "Full Body",
        difficulty: "Athlete",
        image: "https://images.unsplash.com/photo-1522898467493-49726bf28798?q=80&w=1000&auto=format&fit=crop",
        steps: ["Explosive pull-up.", "Transition chest over bar.", "Press up to straight arms.", "Lower with control."]
    },

    // --- Warmup/Stretches ---
    {
        id: "wu-1",
        name: "Arm Circles",
        category: "Warmup/Stretches",
        muscleGroup: "Shoulders",
        difficulty: "Beginner",
        image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1000&auto=format&fit=crop",
        steps: ["Stand with arms extended to sides.", "Make small circles forward.", "Gradually increase circle size.", "Reverse direction."]
    },
    {
        id: "wu-2",
        name: "Leg Swings",
        category: "Warmup/Stretches",
        muscleGroup: "Legs",
        difficulty: "Beginner",
        image: "https://images.unsplash.com/photo-1434682881908-b43d0467b798?q=80&w=1000&auto=format&fit=crop",
        steps: ["Stand next to a wall for support.", "Swing one leg forward and back.", "Keep upper body stable.", "Switch legs."]
    },

    // --- Yoga ---
    {
        id: "yg-1",
        name: "Downward Dog",
        category: "Yoga",
        muscleGroup: "Full Body",
        difficulty: "Beginner",
        image: "https://images.unsplash.com/photo-1544367563-12123d8965cd?q=80&w=1000&auto=format&fit=crop",
        steps: ["Start on hands and knees.", "Lift hips up and back.", "Straighten legs and arms.", "Press heels towards floor."]
    },
    {
        id: "yg-2",
        name: "Warrior II",
        category: "Yoga",
        muscleGroup: "Legs",
        difficulty: "Beginner",
        image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1000&auto=format&fit=crop",
        steps: ["Step feet wide apart.", "Turn right foot out 90 degrees.", "Bend right knee.", "Extend arms out to sides.", "Gaze over right hand."]
    },
    {
        id: "yg-3",
        name: "Crow Pose",
        category: "Yoga",
        muscleGroup: "Core",
        difficulty: "Athlete",
        image: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?q=80&w=1000&auto=format&fit=crop",
        steps: ["Squat down, hands on floor.", "Place knees on upper arms.", "Lean forward to lift feet.", "Balance on hands."]
    }
];
