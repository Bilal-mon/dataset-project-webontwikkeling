import readline from "readline-sync"
import {Boss, Arena} from "./types";

const BOSSES_URL: string = "https://raw.githubusercontent.com/Bilal-mon/dataset-project-webontwikkeling/refs/heads/main/bosses.json";
const ARENAS_URL: string = "https://raw.githubusercontent.com/Bilal-mon/dataset-project-webontwikkeling/refs/heads/main/arenas.json";

function printBossSummary(boss: Boss): void {
    console.log(`- ${boss.name} (${boss.id})`);
}

function printBoss(boss: Boss): void {
    console.log(`[${boss.id}] ${boss.name}`);
    console.log(`Description: ${boss.description}`);
    console.log(`Health: ${boss.health} HP`);
    console.log(`Difficulty: ${boss.difficulty}`);
    console.log(`Active: ${boss.isActive}`);
    console.log(`First seen: ${boss.firstEncounterDate}`);
    console.log(`Abilities: ${boss.abilities.join(", ")}`);
    console.log(`Arenas:`);
    for (let arena of boss.arenas) {
        console.log(`- ${arena.name} (${arena.environment})`);
    }
    console.log();
}

function printArenaSummary(arena: Arena): void {
    console.log(`- ${arena.name} (${arena.id})`);
}

function printArena(arena: Arena): void {
    console.log(`[${arena.id}] ${arena.name}`);
    console.log(`Environment: ${arena.environment}`);
    console.log(`Open Area: ${arena.isOpenArea}`);
    console.log(`Danger Level: ${arena.dangerLevel}/6`);
    console.log(`Image: ${arena.imageUrl}`);
    console.log();
}

function showAllBosses(bosses: Boss[]): void {
    for (let boss of bosses) {
        printBossSummary(boss);
    }
}

function showBossById(bosses: Boss[]): void {
    const id: number = readline.questionInt("Please enter boss ID: ");
    const boss: Boss | undefined = bosses.find(boss => boss.id === id);
    if (boss) {
        printBoss(boss);
    } else {
        console.log("Boss not found");
    }
}

function showAllArenas(arenas: Arena[]): void {
    for (let arena of arenas) {
        printArenaSummary(arena);
    }
}

function showArenaById(arenas: Arena[]): void {
    const id: number = readline.questionInt("Please enter arena ID: ");
    const arena: Arena | undefined = arenas.find(arena => arena.id === id);
    if (arena) {
        printArena(arena);
    } else {
        console.log("Arena not found");
    }
}

async function main() {
    const bossResponse: Response = await fetch(BOSSES_URL);
    const arenaResponse: Response = await fetch(ARENAS_URL);

    if (bossResponse.ok && arenaResponse.ok) {
        const bosses: Boss[] = await bossResponse.json();
        const arenas: Arena[] = await arenaResponse.json();

        let choice: number = -1;
        do {
            choice = readline.keyInSelect(["Show all bosses", "Find boss by ID", "Show all arenas", "Find arena by ID"]);

            switch (choice) {
                case 0:
                    showAllBosses(bosses);
                    break;
                case 1:
                    showBossById(bosses);
                    break;
                case 2:
                    showAllArenas(arenas);
                    break;
                case 3:
                    showArenaById(arenas);
                    break;
                default:
                    console.clear()
                    break;
            }
        } while (choice !== -1);

    } else {
        console.log("Something went wrong fetching data");
    }
}
main();