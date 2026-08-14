import { Icons } from "@/components/icons";
import type { Project } from "@/types";

export const povGlobe: Project = {
    id: "pov-globe",
    title: "POV Globe - IoT Persistence-of-Vision LED Signboard",
    href: "https://github.com/ifham-mohamed/POV_GLOBE",
    dates: "Jul 2023 - Jun 2024",
    active: false,
    visual: "signal",
    signals: ["Persistence of vision", "Addressable RGB LEDs", "ESP32 interrupts"],
    featured: false,
    academicYear: "1st year project",
    projectType: "Group Project",
    role: "Project Lead / IoT & Web Developer (Group)",
    context:
      "4-person university hardware/IoT coursework project; I owned all four subsystems end to end — ESP32 firmware (C++/Arduino), a 2-layer Altium PCB, the web/IoT control layer, and the rotating assembly + power delivery.", // TODO(verify): course/module + institution; how the 4 subsystems were split with teammates
    oneLiner:
      "An IoT-controlled persistence-of-vision 3D globe LED signboard that renders text and graphics on a spinning WS2812B array, updatable live from any web browser over WiFi.",
    description:
      "IoT persistence-of-vision globe: a 30-LED WS2812B arm swept through rotation emulates a full cylindrical display, with dual ESP32s (master/slave), Hall-synced FastLED rendering, and live browser control of message, brightness and motor speed over WiFi.",
    overview:
      "POV Globe turns a single 30-LED WS2812B strip into a full cylindrical display by exploiting persistence of vision: as the arm spins, the LEDs are repainted in sync with rotation so text and graphics appear in mid-air. A master ESP32 serves a web UI and drives the motor; a second ESP32 renders characters as 16x16 bitmaps, advanced by a Hall-effect interrupt once per revolution. Message, brightness and speed are all changeable live from a browser — no reflash or rewiring.",
    problem:
      "Traditional signboards are static, single-message and non-interactive, and a flat LED matrix needs one physical LED per pixel (hundreds even for a small display). POV Globe makes the display remotely re-programmable in real time over WiFi, and uses persistence of vision so a single 30-LED strip emulates a cylindrical surface a fixed matrix would need hundreds of LEDs to reproduce.",
    flow: {
      diagram: `flowchart LR
  U["User Browser (HTML form)"] -->|"POST /sendmessage, /speed"| S["ESP32 Server (master)"]
  S -->|"POST /displaymessage (WiFi)"| C["ESP32 Client (display node)"]
  S -->|"PWM + direction"| M["L298N Motor Driver"]
  M --> G["DC Motor + Rotating Globe"]
  S -->|"I2C 0x27"| L["16x2 LCD (RPM / status)"]
  P["RPM Pulse Sensor (ISR)"] --> S
  G -->|"rotation sensed by"| H["Hall-Effect Sensor (ISR)"]
  H -->|"once-per-rev sync"| C
  C -->|"FastLED (GRB)"| LED["WS2812B Strip (30 px)"]
  LED -->|"swept through rotation"| POV["Persistence-of-Vision Image"]
  PWR["XL4015E1 Buck Converter"] --> S
  PWR --> C`,
      caption:
        "Master ESP32 (web UI + motor + RPM) relays messages over WiFi to the display ESP32, which paints 16x16 bitmaps on the WS2812B arm in sync with a Hall-effect once-per-revolution trigger.",
    },
    technologies: [
      "C++",
      "Arduino",
      "ESP32",
      "FastLED",
      "WS2812B LED",
      "ESPAsyncWebServer",
      "L298N",
      "Hall-Effect Sensor",
      "Altium Designer (PCB)",
      "I2C LCD",
    ],
    bestPractices: [
      "Separation of concerns across two ESP32s (master/slave): web UI, motor and RPM on one; time-critical LED rendering + rotation sync on the other, so web traffic never stalls the POV refresh",
      "Non-blocking I/O via the asynchronous ESPAsyncWebServer / AsyncTCP stack, so HTTP requests don't block the tight LED loop",
      "Interrupt-driven synchronization: Hall-effect (FALLING) and RPM-pulse (RISING) ISRs instead of polling, for deterministic POV alignment independent of loop jitter",
      "Signal conditioning: a moving-average filter to smooth the noisy tachometer (RPM) signal",
      "Power integrity: a dedicated XL4015E1 buck converter with motor power isolated from logic/LED rails to prevent motor-induced brownouts and noise",
      "Reproducible hardware: a complete 2-layer Altium PCB (top + bottom, PDF exports) plus an archived per-component datasheet library",
    ],
    challenges: [
      {
        challenge:
          "POV timing — characters smeared or drifted because rendering had to stay locked to the globe's angular position even as motor speed varied.",
        resolution:
          "Drove character advancement from a Hall-effect interrupt (one positional reference per revolution) instead of fixed delays, painting each 16x16 character at a known rotational position and tuning per-row timing (~2 ms/row) against the measured RPM so the image stayed crisp across speeds.",
      },
      {
        challenge:
          "Delivering stable power to the continuously rotating arm without brownouts or tangling wires.",
        resolution:
          "Regulated the supply with an XL4015E1 buck converter and separated motor and logic/LED rails.", // TODO(verify): exact method feeding the rotating arm (slip ring / brushes / on-board battery / only the arm spins)
      },
    ],
    evidence: [
      { value: "1000+", label: "RPM sustained", detail: "Stable POV image, live RPM on an on-board LCD" },
      { value: "16 x 16", label: "Character cells", detail: "Swept from just 30 physical LEDs" },
      { value: "2", label: "PCB layers", detail: "Fabricated, with a full component archive" },
    ],
    outcomes: [
      "Fully working, demonstrated prototype submitted as graded university coursework", // TODO(verify): grade/mark
      "Stable POV image sustained at >1000 RPM, with live RPM shown on an on-board 16x2 LCD",
      "Real-time browser control over WiFi of message, LED brightness (0-255) and motor speed (0-255 PWM) — no reflash or rewiring",
      "Complete 2-layer fabricated PCB (top + bottom) plus a full component datasheet/design archive",
      "Effective 16x16 character-cell display surface from just 30 physical LEDs swept through rotation",
    ],
    conceptsLearned: [
      "Persistence of vision (POV) display",
      "Addressable RGB LEDs (WS2812B) & FastLED",
      "Embedded interrupt service routines (ISRs) on ESP32",
      "Hall-effect rotational sensing & RPM tachometry",
      "PWM motor control via H-bridge (L298N)",
      "DC-DC buck conversion & power-rail isolation",
      "Asynchronous embedded web server (ESPAsyncWebServer)",
      "Master/slave microcontroller architecture over HTTP",
      "I2C peripheral interfacing",
      "ESP32 WiFi (station-mode) IoT control",
      "2-layer PCB design & layout (Altium Designer)",
      "Bitmap-to-LED framebuffer mapping & real-time sync",
    ],
    links: [
      {
        type: "Source",
        href: "https://github.com/ifham-mohamed/POV_GLOBE",
        icon: <Icons.github className="size-3" />,
      },
    ],
    // image: "/images/projects/pov-globe.png",  <- restore once the file exists in public/images/projects/
    image: "",
  };
