
# 🔐 PassGuardio — Simple, Local & Fast Password Manager

[![GitHub Stars](https://img.shields.io/github/stars/YaniekCode/passguardio?style=for-the-badge&logo=github)](https://github.com/YaniekCode/passguardio/stargazers) [![Docker Pulls](https://img.shields.io/docker/pulls/yaniekcode/passguardio?style=for-the-badge&logo=docker)](https://hub.docker.com/r/yaniekcode/passguardio) [![Docker Image Size](https://img.shields.io/docker/image-size/yaniekcode/passguardio/latest?style=for-the-badge&logo=docker)](https://hub.docker.com/r/yaniekcode/passguardio) [![Docker Image Version](https://img.shields.io/docker/v/yaniekcode/passguardio?style=for-the-badge&logo=docker)](https://hub.docker.com/r/yaniekcode/passguardio)

> Privacy-first password manager that keeps your data **100% local**
> 
[![GitHub License](https://img.shields.io/github/license/YaniekCode/passguardio?style=for-the-badge)](LICENSE)
![Status](https://img.shields.io/badge/status-active-success?style=for-the-badge)
![Local First](https://img.shields.io/badge/data-local--only-informational?style=for-the-badge)

**PassGuardio** is a simple, fast, and privacy-first password manager that stores your data locally and works without external services.

---

## ❓ Why PassGuardio?

Most modern password managers rely on the cloud.

PassGuardio is different:

- 📴 Works fully offline
- 🔐 No third-party access to your data
- ⚡ Instant performance — no network latency
- 🧘 No unnecessary complexity

Built for people who value **privacy, control, and simplicity**.

---

## ✨ Features

- 🗄 **100% Local Storage** – your data never leaves your device
- ⚡ **Fast & lightweight** – no bloated dependencies
- 🚫 **No cloud, no tracking** – zero telemetry, zero analytics
- 🧠 **Simple UX** – minimal interface, easy to use
- 🧩 **Open Source** – fully transparent and community-driven

---

## 🎯 Philosophy

> _Your passwords should belong only to you._

PassGuardio is built around a simple principle: **full user control**.

- no cloud sync
- no analytics
- no external services

Everything runs locally — your data stays yours.

**This is not a cloud password manager. And it never will be.**

---

## 🛠 Tech Stack
- **Framework:**
![Next.js](https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js&logoColor=white)

- **UI:**  
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Shadcn/ui](https://img.shields.io/badge/shadcn/ui-%23000000.svg?style=for-the-badge&logo=shadcnui&logoColor=white)

- **Language:**  
  ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

- **Database:**  
  ![SQLite](https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white)

- **Architecture:**  
  ![Local-first](https://img.shields.io/badge/Local--first-informational?style=for-the-badge)

- **Deployment:**
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)




---

## 🚀 Installation

Get up and running in under a minute.

PassGuardio can be installed in two ways: **using Docker (recommended)** or **manually**.

---

### 🐳 Option 1: Docker (Recommended)

Docker provides the easiest and fastest way to run PassGuardio without setting up the environment manually.

#### 1. Pull and run the Docker container

```bash
docker run -d -p 9820:9820 --restart=always --name passguardio yaniekcode/passguardio:latest
```

The application will be available at:

```
http://localhost:9820
```

> All data will remain **local** inside the Docker container.

---

### 🛠 Option 2: Manual Installation

Use this method if you prefer to run PassGuardio directly on your machine.

#### 1. Clone the repository

```bash
git clone https://github.com/yaniekcode/passguardio.git
cd passguardio
```

#### 2. Install dependencies

```bash
npm install
```

#### 3. Run the project

```bash
npm run dev
```

The application will be available at:

```
http://localhost:9820
```

---

## 🔐 Security Notes

- Passwords are stored **locally**
- Data is **encrypted at rest**
- No data is sent to external servers
- Always use a **strong master password**

---

## 🤝 Contributing

Contributions are welcome!

You can:

- open an issue
- suggest features
- submit a pull request

Please keep the project **simple**, **local**, and **privacy-respecting**.

---

## 📄 License

This project is licensed under the **GNU GPL v3 License**.

You are free to:

- use
- modify
- distribute

as long as the license terms are respected.

> See the `LICENSE` file for full details.

---

## ⭐ Support

If you find this project useful, consider giving it a ⭐ on GitHub — it really helps.

This project is free and open source, but its continued development depends on community support.  
If you'd like to help keep it alive and evolving, consider supporting it:

[![BuyMeACoffee](https://img.shields.io/badge/Buy%20Me%20a%20Coffee-ffdd00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black)](https://buymeacoffee.com/yaniekcode)
[![Ko-Fi](https://img.shields.io/badge/Ko--fi-F16061?style=for-the-badge&logo=ko-fi&logoColor=white)](https://ko-fi.com/yaniekcode)

---

## 🧠 Disclaimer

This software is intended for educational and personal use. The author is not responsible for any data loss or security issues resulting from improper use.
