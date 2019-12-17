Cruiser Chaos
Ethan Dorow, Nile Henry, Kyle Wybranowski


Game Background: You are a Colgate University cruiser driver who is in charge of transporting students safely through the town. There are three lanes that you can drive in. You start the game with three students on board the cruiser. While driving, you must avoid hitting geese, potholes, and road blocks. If you do hit an obstacle, you lose a student (nobody likes a reckless driver!), however you can pick more up along the drive. The game ends when you run out of students. 


Scene: The game consists of a rolling world, which is represented by a sphere. The roads are cylinders with radii slightly bigger than that of the world (so they stick out from the surface of the world). Buildings are pinned in specific spots on the sides of the road. The goose, roadblock, and pothole obstacles are basic models with minimalist style art. The obstacles spawn randomly in the three lanes below the horizon of the world and move towards you quickly. Once the obstacles are behind you, they will despawn to conserve memory. 


Achievements:
* Nile:
   * Worked on goose, roadblock, pothole, and building models
   * Timer.js utility used in spawners and as components in some GameObjects
   * RotationAbout to assist in having objects move around the world
   * Collision boxes to allow GameObjects to interact with each other
* Kyle:
   * UI/UX for start and end screens
   * Sky object with sun and moon to create world shading
   * Cruiser lane controls
   * DebugGUI
* Ethan:
   * Worked on cruiser model
   * Code structure - engine, GameObjects, ECS, Spawners, Callbacks, Transforms
   * Particle system
   * Utility functions
* Team:
   * Gameplay logic
   * Debugging


List Of References: See references in code


Browser To Run On:  Google Chrome 


Instructions:  Press “A” to move left, Press “D” to move right.
Code Download Link: https://github.com/nhenrycolgate/Cruiser-Chaos 




Post Implementation Objectives: 
* What did we accomplish?
   * We were successful in implementing Cruiser movement 
   * We successfully created goose, pothole, and roadblock obstacles.
   * We implemented a sun and moon light source that produce shading on the world below them.
   * We have a UI/UX window (start screen/game over screen)
   * We have a GUI for instructions and health remaining during gameplay.
   * Camera Perspective: Camera situated above Cruiser and looking down at it. 
   * We have a continuous game engine that updates all components in the game and allows for pausing/playing
   * We were successful in implementing collisions among objects.
   * We were successful in spawning and despawning objects at appropriate times. 
* What did we not accomplish? 
   * We did not implement stoplight functionality to have the user yield or continue at a stoplight (because we did not view it as realistic to the Hamilton area which does not have many stoplights).
   * We did not have the Goose explode into feathers when hitting a cruiser (because we felt that it depicted violence which poorly represents the Colgate and Hamilton setting)
   * We did not add street lamps (due to shortage of time and prioritization of other objectives)
   * We did not add levels because we preferred an endless scroller game.
   * We did not implement animations (due to shortage of time)
      * Cutscenes
      * Cruiser collision animations
   * We did not implement a level creator interpreter (because we switched from having different levels to having only one endless level)
   * We did not complete the intersection logic.


Technical Components:
The architecture for our game is extremely strong and modular. Through the use of the following components, adding, removing, updating, and interacting with objects in the game is easy.
* Engine
   * Easy play/pause
   * Adding and removing objects from scene
   * Managing object collisions
* GameObject
   * Easy transformations
   * Inheritance to unify different objects for shared functionality (enable/disable, destroy, rotate, etc.)
* Component
   * added to a gameobject to allow for simple modding of different code aspects without interrupting whole code structure. 
   * Ex. BoxCollider, Timer
* Spawner
   * Handles the logic for spawning GameObject renderings
* CollisionBox
   * Handles the collisions of any GameObjects to produce an outcome
      * Ex: Cruiser colliding with an obstacle will reduce health by 1.
      * Ex: Obstacle objects colliding with despawn collider despawn them from the scene.
* Transform
   * Allows the movement of any rendering’s local coordinate system into a global coordinate system via the shifting of the x, y and z axes).




Next Steps:
* Implement objectives that we failed to implement due to time constraints 
* Power-ups: 
   * Speed slow-down
   * Points multiplier
   * Student magnet 
   * Temporary invulnerability
* Additional world environments: Colgate Campus, random environment
* Weather: 
   * Precipitation (snow, rain)
   * Seasons (leaves for fall, snow for winter, trees for spring, heat wave for summer)
* Ability to jump or yield in order to avoid obstacles (to add more dynamic gameplay)
* Dynamic obstacles (ex. Moving Goose, last second spawning obstacles)


Project Takeaways/Lessons: 
* While ambition gives you a goal to strive for, over-stretching a small team from the beginning leads to compromises.
* Prioritize the simple/easier objectives first and then build up. Don’t start with the hardest objectives. Doing so wasted a lot of time that we could have used more productively towards the final outcome, as we ended up pivoting during our compromising stage.
* Building a highly modular architecture improves overall efficiency, but has a steep ramp to implementation.
* Because we had high standards for our achievements, we fell short of some of them, however, still ended up with a very successful product.