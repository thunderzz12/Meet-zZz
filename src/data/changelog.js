const history = [
  {
    version: "1.6.0",
    date: "2026-02-04",
    changes: [
      {
        type: "added",
        title: "Onboarding & Identity",
        items: [
          "Complete Welcome Interface: Set your Display Name, Profile Picture, and Name Color.",
          "Account System: Generated Recovery Keys so you can restore your identity later.",
          "Added Advanced Settings with a specialized Delete Account button."
        ]
      },
      {
        type: "added",
        title: "Social Features",
        items: [
          "Ping System: @mentions now highlight the message in yellow for the recipient.",
          "Reply System: You can now reply to specific messages (also highlights the user).",
          "Live Online Count: Added an indicator to show how many people are currently in the chat."
        ]
      }
    ]
  },
  {
    version: "1.5.0",
    date: "2026-02-02", 
    changes: [
      {
        type: "added",
        title: "GIF Favorites System",
        items: [
          "Finally added local persistence for GIFs! using `localStorage` so your favorites don't vanish on refresh.",
          "Added a little \"Heart\" overlay when you hover a GIF. Click it to save.",
          "New \"Favorites\" tab in the `GifPicker`. It's empty by default, go save some memes."
        ]
      },
      {
        type: "added",
        title: "UX Improvements",
        items: [
          "Stopped the GIF picker from auto-closing every time you clicked the search bar. That was annoying fr."
        ]
      },
      {
        type: "fixed",
        title: "API Issues",
        items: [
          "Fixed the `403 Forbidden` errors from Giphy. Had to rotate the Beta key again D:"
        ]
      },
      {
        type: "fixed",
        title: "Layout Fixes",
        items: [
          "Bumped the sidebar width to 400px (was 320px). So now it covers actual meet chat.",
          "Fixed a flexbox bug where the \"Send\" button got pushed off-screen on smaller displays.",
          "Tweaked the GIF picker dimensions so it actually fits in the new sidebar."
        ]
      }
    ]
  },
  {
    version: "1.4.0",
    date: "2026-02-01",
    changes: [
      {
        type: "added",
        title: "GIF Support",
        items: [
          "Shipped the new `GifPicker.jsx`. It's got Trending *and* Search (powered by Giphy).",
          "Added the `MdGif` button to the toolbar. It actually works now.",
          "Backend update: `socket.io` can now handle `type: 'image'` messages without crashing.",
          "Inline GIF rendering in chat! Limited max-width to 300px so it doesn't blow up the layout."
        ]
      }
    ]
  },
  {
    version: "1.3.1",
    date: "2026-02-01", 
    changes: [
      {
        type: "fixed",
        title: "Emergency Fix",
        items: [
          "Fixed a regression where emojis + text in the same message broke everything.",
          "Swapped the simple string replace for a proper Regex parser."
        ]
      }
    ]
  },
  {
    version: "1.3.0",
    date: "2026-01-31",
    changes: [
      {
        type: "changed",
        title: "Visuals",
        items: [
          "**Discord-Style Emojis**: ditched the google style emojis (sorry -_-) for Twemoji to match the Discord-styled emojis.",
          "Updated `emoji-picker-react` to force dark mode."
        ]
      }
    ]
  },
  {
    version: "1.2.0",
    date: "2026-01-30",
    changes: [
      {
        type: "added",
        title: "Interactions",
        items: [
          "You can now hover messages to see actions: **React**, **Edit**, **Delete**.",
          "Hooked up `edit_message` and `delete_message` events on the server.",
          "Added a little \"(edited)\" tag for messages that have been changed."
        ]
      }
    ]
  },
  {
    version: "1.1.1",
    date: "2026-01-29",
    changes: [
      {
        type: "fixed",
        title: "Rendering Bug",
        items: [
          "Fixed emojis not rendering bug."
        ]
      }
    ]
  },
  {
    version: "1.1.0",
    date: "2026-01-28",
    changes: [
      {
        type: "added",
        title: "First Emoji Pass",
        items: [
          "Integrated the basic Emoji Picker.",
          "Added support for the Google emojis."
        ]
      }
    ]
  },
  {
    version: "1.0.0",
    date: "2026-01-25",
    changes: [
      {
        type: "added",
        title: "The Beginning",
        items: [
          "**Extension**: Manifest V3 + React sidebar.",
          "**Backend**: Node/Express server + `socket.io` for the real-time stuff.",
          "**Database**: SQLite3 is handling the history for now."
        ]
      },
      {
        type: "added",
        title: "MVP Features",
        items: [
          "Text messaging works.",
          "File attachments work (paperclip icon).",
          "Dark mode UI (Tailwind) is in place."
        ]
      }
    ]
  }
];


export const changelogData = history;
