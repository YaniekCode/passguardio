# 🔐 PassGuardio — Simple, Local & Fast Password Manager

**PassGuardio** is a *simple, local and fast password manager* focused on privacy, minimalism, and performance. The project is **open source** and designed to work entirely **offline**, without sending any data to external servers.

---

## ✨ Features

* 🗄 **Local-first** – all data is stored locally on your device
* ⚡ **Fast & lightweight** – no unnecessary dependencies
* 🔒 **Privacy-focused** – no tracking, no cloud, no telemetry
* 🧠 **Simple UX** – minimal interface, easy to use
* 🧩 **Open Source** – transparent codebase, community-friendly

---

## 🎯 Philosophy

This project was created with a clear goal:

> *Your passwords should belong only to you.*

Unlike many modern password managers, this application:

* does **not** sync data to the cloud
* does **not** collect analytics

Everything runs locally, giving you full control over your data.

PassGuardio is not a cloud password manager and never will be.

---

## 🛠 Tech Stack


* **Frontend:** Next.js / React
* **Backend:** Local-only logic (no external API)
* **Storage:** Local Sqlite3 database
* **Language:** TypeScript

---

## 🚀 Installation

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

* Passwords are stored **locally**
* Encryption is always enabled
* Always use a **strong master password**

> This project is provided as-is. Review the code before using it for sensitive data.

---

## 🤝 Contributing

Contributions are welcome!

You can:

* open an issue
* suggest features
* submit a pull request

Please keep the project **simple**, **local**, and **privacy-respecting**.

---

## 📄 License

This project is licensed under the **GNU GPL v3 License**.

You are free to:

* use
* modify
* distribute

as long as the license terms are respected.

> See the `LICENSE` file for full details.

---

## ⭐ Support

If you find this project useful, consider giving it a ⭐ on GitHub.

---

## 🧠 Disclaimer

This software is intended for educational and personal use. The author is not responsible for any data loss or security issues resulting from improper use.
