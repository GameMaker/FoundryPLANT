# Foundry PLANT (**PLA**yer **N**eeds **T**racker)

A Foundry VTT module to track your players needs.

Like all plants, this one grew, and now has a collection of features:

* **The Need List** - Keep track of things your players want
* **Sidebar Hotkeys** - Quickly access Sidebar tabs with Alt+number keys
* **Cheat Sheet** - Press Alt+/ (question mark, without shift) to view tips

# Installation

Hopefully this will end up in the official list of modules, and can be installed directly with one click.

Or, on the Install Module dialog, copy/paste this Manifest URL:
https://raw.githubusercontent.com/GameMaker/FoundryPLANT/master/module.json

# Usage

## Needs List

We all play games because we like to. Some like combat. Others like puzzles. Others want to have a pet wolf.

As a GM, I try to work those things into the story, so players (and I!) have a great time. 

Of course, I can't get to them all in one session, so I like having a place to keep track of what people want. Then when I do session planning, I look at the list, pick a few, and work them into the next game.

### How to use :

The Needs List is activated by default when you install FoundryPLANT.

To open the Needs List, look at the bottom of the Chat log for an "I need something..." button:
![](https://i.imgur.com/kGC9wBZ.png)

If you run into trouble, have requests for more features, or just want to say "Hi", use the **FoundryPLANT help** button.

Click that to bring up the Needs List, which will look different for GMs and non-GM players.

#### GM View

All GMs and Assistant GMs have a "Delete all needs" button to wipe the data and start over. Don't click this unless you're serious - there's no safety on it, and it's non-recoverable.

![](https://i.imgur.com/ABCV1QM.png)

The GMs get to see everyone's Needs, and can reprioritize using the up/down arrow keys, and delete them from the list once the Need has been satisfied.

#### Player View

Just type in what you want and hit enter, or press the "Please" button, and it's added to the list. Players can only see their own currently active Needs, and cannot reprioritize or delete them, only add new ones:

![](https://i.imgur.com/gjLH4q7.png)

#### Troubleshooting

If the "I need something" button isn't in your chat log, check to see if the Setting is disabled. Under Settings -> Module Settings, make sure the first one is checked:

![](https://i.imgur.com/vsIb5qH.png)

It should be active by default, but may have gotten turned off.

## Hotkeys

Quick-access hotkeys for the sidebar tabs.

### How to use:

First, you need to enable this feature - I don't like it when modules "quietly break my stuff", and since this takes over keyboard shortcuts, it defaults to disabled. 

To enable, open Module Settings, and turn this one on:

![](https://i.imgur.com/6doUOcb.png)

This allows you to press Alt (Win) or Option (Mac) and a number key (1-0) to access the Chat, Combat, Journal, etc. tabs with one keypress.

Alt-1 opens the first tab (Chat), Alt-2 opens the second (Combat), etc.

**NOTE:** Since players and GMs have different tabs, the number keys are a little different:

| Key   | GM        | Player    |
| ----- | --------- | --------- |
| Alt-1 | Chat      | Chat      |
| Alt-2 | Combat    | Combat    |
| Alt-3 | Scenes    | Actors    |
| Alt-4 | Actors    | Items     |
| Alt-5 | Items     | Journals  |
| Alt-6 | Journals  | Tables    |
| Alt-7 | Tables    | Playlists |
| Alt-8 | Playlists | Compendia |
| Alt-9 | Compendia | Settings  |
| Alt-0 | Settings  |           |

## Cheat Sheet

The Cheat Sheet is a great place to put notes for beginning players, which anyone can access with a single keypress.

### Set Up

#### Create a Journal Entry

First you need to create a Journal Entry to hold your tips. 

The name of the entry needs to match the FoundryPLANT Cheat Sheet setting name (default "Cheat Sheet"):

![](https://i.imgur.com/dg0eny1.png)

If you give it a different name (for example, if you're alreayd using that name), be sure to update the setting - and you will probably need to have all players update their setting as well, since I don't think these are global.

#### Enable Hotkeys

The Hotkeys feature needs to be enabled (see above) for the Alt-/ hotkey to work. If anyone needs me to fix this (so the Cheat Sheet hotkey works without requiring all the other hotkeys) please comment on [this bug](https://github.com/GameMaker/FoundryPLANT/issues/17).

# Special Thanks

FoundryVTT Discord members, in order of addition to the list:
- @cole for helping me figure out why I couldn't get my module to load in the first place, how to run an interval only once, and about reacting to changes instead of re-rendering. And for reminding me that `console.log("some string" + anobject)` !== `console.log("some string", anobject)`.
- @forien for letting me review the Quest Log module for overall code structure, and general dev questions. If you love great modules, please support the [Foundry Workshop](https://www.patreon.com/foundryworkshop/posts) on Patreon.
- @Spice_King for pointing me in the direction of web workers so the A/V doesn't skip and it's not so demanding client-side, and for pointing me to the performance tab in Chrome.
- @vance for pointing out `CONFIG.debug.hooks=true` and registering with the keyboard event manager, and for reviewing the manifest to help me release.