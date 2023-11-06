export class PetModel {
    birth?: string;
    breed?: string;
    weight?: { [key: string]: string };
    health_info?: {
        cardiac_freq: { [key: string]: string };
        vaccines: string[];
        observations: string;
        steps: { [key: string]: string };
    };
    height?: number;
    name?: string;
    type?: string;
    vet_id?: string;
    client_id?: string;
    profile_image?: string;
    id?: string;
}