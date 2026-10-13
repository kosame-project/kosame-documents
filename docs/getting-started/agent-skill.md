---
title: Agent Skill
---

# Agent Skill

Kosame ships a skill that teaches coding agents such as Claude Code how to write Kosame code.

## Installing the Skill

After installing `kosame`, run the following command in your project.

```bash
npx kosame skills install --claude-md
```

This copies the skill to `.claude/skills/kosame` and adds a line to `CLAUDE.md` that points to it.
If you do not want `CLAUDE.md` to be changed, leave out `--claude-md`. The line is printed instead, so you can add it to `CLAUDE.md` or `AGENTS.md` yourself.

## Updating the Skill

The skill is updated together with the package. After upgrading `kosame`, run the same command again to replace the installed skill.

## What the Skill Contains

The skill has a short `SKILL.md` with the rules to follow, examples, and known limits, and a `references` folder with the English pages of this documentation. Agents read the references only when they need them.
