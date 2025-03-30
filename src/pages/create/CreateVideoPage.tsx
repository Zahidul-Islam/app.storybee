import Navbar from "../home/Navbar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Wrapper from "@/components/Wrapper";
import { useState } from "react";
import { IoSparklesSharp } from "react-icons/io5";

export default function CreateVideoPage() {
  const [finalScript, setFinalScript] = useState<string>(dummyData);
  return (
    <Wrapper className="h-dvh pb-4">
      <h2 className="text-lg font-semibold text-center ">
        Final Script for video
      </h2>

      <Textarea
        value={finalScript}
        onChange={(e) => {
          setFinalScript(e.target.value);
        }}
        className="whitespace-pre-wrap flex-1 rounded-md p-4 max-w-3xl resize-none mx-auto  text-base font-sans "
        placeholder="Write your script here..."
      />

      <Button className=" hover:scale-105 transition-all duration-200 right-0 left-0 w-fit mx-auto  bg-gradient-to-r from-blue-500 to-purple-500">
        <IoSparklesSharp />
        Generate the Video
      </Button>
    </Wrapper>
  );
}

const dummyData = `Awesome — here’s a **full 1500-word YouTube video script**, perfect for a deep-dive product explainer, soft promo, or even a “here’s how I changed my life” style vlog. It keeps things natural, engaging, and useful — built for retention.

Let’s say it’s promoting a productivity app called **FocusFlow**. You can replace that with your own product later.

---

**[Opening shot: Creator walking around their room, casual music playing in the background]**  
**Creator (to camera):**  
You know what’s funny?  
I used to *love* making to-do lists…  
But I never actually got anything done.

I’d write stuff down, feel productive for like five minutes, and then spend the rest of the day putting out fires, checking emails, or scrolling TikTok like my life depended on it.

Sound familiar?

**[Cut to: fast montage of messy schedules, notification overload, endless tabs]**  
Life feels *noisy*.  
We're pulled in a million directions.  
And no matter how many planners or apps I tried, nothing actually stuck.

Until something finally *clicked*.

**[Cut to: clean, simple shot of the FocusFlow dashboard opening up on a laptop]**  
This — is **FocusFlow**.  
And no, this isn’t just another productivity tool.  
It’s more like a system — for people who hate systems.

Let me show you how I went from chaotic and overwhelmed to actually feeling in control of my day.

---

### **[Segment 1: The Problem We All Face]**

**[Cut to: Creator sitting at desk, talking to the camera with relatable tone]**  
We’ve all been there, right?  
You’ve got work deadlines, maybe a side hustle, school stuff, messages to reply to, family commitments, and on top of that — you’re supposed to drink water, meditate, sleep 8 hours, and somehow not lose your mind?

It’s exhausting.

Most productivity tools? They either overwhelm you with features… or feel so basic, you outgrow them in a week.

That’s why **FocusFlow** works differently.

It doesn’t try to change *you*.  
It adapts to how *you* work.

---

### **[Segment 2: What FocusFlow Actually Does]**

**[Screen recording: user logging into FocusFlow]**  
Here’s what you see when you log in.

Simple. Clean. No chaos.

At the top, you’ve got your daily dashboard — this is your command center.  
Tasks, goals, schedule — all right here.

**[Demo walkthrough: Clicks through features]**  
✦ Add a task — done.  
✦ Set a time block — drag and drop.  
✦ Weekly goals? Just type ‘em in.  
✦ Mood tracker? Optional, but honestly kind of nice.  
✦ Progress stats? Built-in. No spreadsheets needed.

One of my favorite things?  
You can group tasks by “Focus Zones” — like Work, Personal, Freelance, Self-Care.  
So your brain knows what mode you’re in.

---

### **[Segment 3: How It Changed My Routine]**

**[Cut to: Creator narrating over clips of their real day using FocusFlow]**  
Let me walk you through a normal day now.

☀️ Morning — I check my dashboard. 3 priorities for the day.  
No more 20-task lists I’ll never finish. Just what matters.

🧠 Midday — I use time blocks to stay focused. One hour deep work. 15-minute break.  
No guesswork. No burnout.

🌙 Evening — I check what got done, reflect on the day, and set up tomorrow.

It’s not just productivity…  
It’s *peace of mind*.

I actually stop working on time now.  
Because I know I’ve handled what needed to be done.

---

### **[Segment 4: What Makes It Different]**

Now you’re probably thinking…  
“Okay, but how’s this any different from Notion or Trello or XYZ?”

Fair question. Let’s break it down:

**1. Zero setup time.**  
With FocusFlow, you don’t need to build templates or read a 20-page guide. It just works out of the box.

**2. Clean and intuitive.**  
No endless menus or buttons. You see what matters, when it matters.

**3. Built for real humans.**  
It’s not designed for productivity nerds with 4 monitors. It’s made for creators, students, freelancers — people like us.

**4. Focus-first design.**  
You don’t just *track* time. You *protect* it.  
With modes like “Deep Focus” and “Quick Wins,” your brain knows what to tackle next.

---

### **[Segment 5: What Other People Say]**

Don’t just take my word for it.

**[Cut to short clips or quote cards with different people:]**  
**Student:**  
“I use it to balance school, work, and life — and it actually helps me breathe.”

**Startup founder:**  
“We run our whole team’s weekly plan in FocusFlow. Less Slack chaos, more clarity.”

**Freelancer:**  
“I track my client work here. Way easier than juggling 3 different apps.”

---

### **[Segment 6: Small Habits → Big Wins]**

FocusFlow isn’t about doing more.  
It’s about doing what *matters*.  
And feeling calm while doing it.

When you stop trying to remember everything, your brain finally relaxes.  
You start making space for the stuff that really matters.

I’ve written more. Slept better. Actually gone on walks.  
Not because I worked *harder* — but because I worked *smarter*.

---

### **[Segment 7: Final Thoughts + Call to Action]**

So if your brain feels cluttered…  
If you’ve tried 5 productivity apps and nothing sticks…  
If you’re tired of feeling like every day is a mini fire drill…

Try this.

**FocusFlow.**

✨ 7-day free trial  
✨ No credit card  
✨ Cancel anytime  
✨ Mobile + Desktop sync

You’ve got nothing to lose — except the overwhelm.

**[Cut back to creator, smiling]**  
Seriously — give yourself the gift of *clarity*.  
Click the link below, start your trial, and see what a difference one simple tool can make.

This isn’t about being perfect.  
It’s about feeling *in control* again.

I’ll see you inside FocusFlow.

---

**[Outro: Logo animation, upbeat music, end screen with subscribe + link]**  
**Voiceover:**  
FocusFlow — flow through your day.

---

Want this customized for your *actual* app or product — or a specific vibe like “funny startup founder,” “aesthetic lifestyle YouTuber,” or “tech review format”? Just say the word!`;
