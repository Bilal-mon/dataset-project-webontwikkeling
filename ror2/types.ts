export interface ArenaInfo {
    id: number;
    name: string;
    environment: string;
}

export interface Boss {
    id: number;
    name: string;
    description: string;
    health: number;
    isActive: boolean;
    firstEncounterDate: string;
    imageUrl: string;
    difficulty: "Easy"|"Medium"|"Hard"|"Extreme";
    abilities: string[];
    arenas: ArenaInfo[];
}

export interface Arena {
    id: number;
    name: string;
    environment: string;
    isOpenArea: boolean;
    dangerLevel: number;
    imageUrl: string;
}