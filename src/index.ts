#!/usr/bin/env node
import fs from "fs-extra";
import path from "path";
import inquirer from "inquirer";
import chalk from "chalk";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function main() {
  console.log(chalk.cyan("\n🚀 Générateur de repo NestJS customisé\n"));

  const { projectName } = await inquirer.prompt([
    {
      name: "projectName",
      message: "project name:",
      default: "my-nest-app"
    }
  ]);

  const targetPath = path.join(process.cwd(), projectName);
  const templatePath = path.join(__dirname, "../template");

  if (fs.existsSync(targetPath)) {
    console.log(chalk.red(`❌ your project ${projectName} already exists.`));
    process.exit(1);
  }

  console.log(chalk.yellow("📂 copy your code ..."));
  await fs.copy(templatePath, targetPath);

  console.log(chalk.green(`\n✅ Project ${projectName} created !`));
  console.log(chalk.blue(`👉 cd ${projectName} && pnpm install`));
  console.log(chalk.blue(`👉 pnpm run start:dev`));
}

main();
