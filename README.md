# Sport Science Applied

An athletic performance tracking matrix and global facility network database hub. This platform connects elite training facilities, registers performance analytics data pipelines, handles booking management natively, and integrates real-time sport science research streaming feeds with AI-assisted research querying capabilities.

---

##  Core Architecture Features

* **Unified Performance Dashboard:** Seamless single-page scrolling layout organizing training matrices, infinite research feeds, scheduling blocks, and facility registry options.
* **Global Facility Network Registry (`/gym/register`):** Secure asynchronous API endpoint allowing external performance labs and gyms to connect directly to the system.
* **Cloud-Hardened Email Database Backup:** Automated background integration using `nodemailer` to process booking payloads and facility telemetry straight into a secure database vault.
* **AI Research Assistant Feed (`/api/chat`):** Live asynchronous interface parsing and querying sport science research queries instantly.

---

##  Technology Stack

* **Runtime Environment:** Node.js (v24+)
* **Backend Framework:** Express.js
* **Templating Engine:** Embedded JavaScript (EJS)
* **Styling & Layout:** Modern CSS3 with CSS Variables (Fluid Matrix Layout)
* **SMTP Delivery Routing:** Nodemailer (Cloud-optimized TLS transport layer)

---

##  Local Development Setup

To run this platform on your local machine, follow these steps:

### 1. Clone the Repository
```bash
git clone [https://github.com/gloryilunga2000-cmyk/sport-science-applied.git](https://github.com/gloryilunga2000-cmyk/sport-science-applied.git)
cd sport-science-applied
