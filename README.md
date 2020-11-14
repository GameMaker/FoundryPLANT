# Foundry PLANT (**PLA**yer **N**eeds **T**racker)

A module for Foundry VTT to track your players needs.

Needs can be whatever you feel like:
- Frequent enough chance to do something
- Enough interactions in a session
- Roleplaying
- Strategy
- Combat
- Magic and wonder
- Story
- Just plain rolling dice

# Special Thanks

FoundryVTT Discord members, in order of addition to the list:
- @cole for helping me figure out why I couldn't get my module to load in the first place, how to run an interval only once, and about reacting to changes instead of re-rendering. And for reminding me that `console.log("some string" + anobject)` !== `console.log("some string", anobject)`.
- @forien for letting me review the Quest Log module for overall code structure, and general dev questions. If you love great modules, please support the [Foundry Workshop](https://www.patreon.com/foundryworkshop/posts) on Patreon.
- @Spice_King for pointing me in the direction of web workers so the A/V doesn't skip and it's not so demanding client-side, and for pointing me to the performance tab in Chrome.
- @vance for pointing out `CONFIG.debug.hooks=true` and registering with the keyboard event manager, and for reviewing the manifest to help me release.