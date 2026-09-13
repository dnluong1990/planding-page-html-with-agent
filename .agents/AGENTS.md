# AGENTS.md

This file provides guidance to Codex (Codex.ai/code) when working with code in this repository.

## Rules
- **Communication Language:** Always communicate with the user in Vietnamese (tiếng Việt). All responses, questions, and explanations must be in Vietnamese.
- **Task Management:** Save task checklists as Markdown `.md` files in the root `/tasks/` directory. New task files must increment the sequence number of the largest existing task file (e.g., if `task_06_...md` exists, the next file must be `task_07_...md`). Once a task checklist is completed, it is locked and must never be modified or updated for subsequent requests. Any new requirements or changes must always be managed by creating a new task file.
- **Before Modifying Source Code (CRITICAL RULE - HIGHEST PRIORITY):** Creating/updating an implementation plan (`implementation_plan.md`) and a task checklist (`tasks/task_xx_...md`) is strictly mandatory for EVERY single code modification, regardless of how small or simple the change is (including UI adjustments, moving lines, fixing typos, etc.). Do not make any source code changes until both documents are created/updated and explicitly approved/confirmed by the user.
- **Task Creation vs Execution Flow:**
  - When the user asks to "tạo tasks" (create tasks) or requests ANY modification, the agent must ONLY create/update the implementation plan and the task checklist file. The agent must NOT perform any source code modifications yet.
  - The agent must wait for the user to explicitly say "thực hiện tasks" (execute tasks), "tiến hành code" or "làm task" before making any changes to the source code files.
  - **Zero Tolerance Policy:** Any direct code modification without a corresponding approved plan and checklist will be considered a severe violation of repo integrity. Do not skip this process for "minor" or "hotfix" requests.
- **Git Commit/Push Policy (CRITICAL RULE):** Never perform a git commit or push unless explicitly requested or approved by the user. All git actions to save code changes to GitHub must wait for a direct instruction (e.g., "commit frontend", "push code", etc.) and must not be executed automatically as part of the task completion.
