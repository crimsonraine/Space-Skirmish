// CharacterList represents a list of (unique) characters
// Used by the game loop to manage all characters

class CharacterList {
    characters : Character[]; // two for now if we don't implement something like a 4 player

    constructor(){
        this.characters = [];
    }

    /**
     * Add character to list (if not already included)
     * @param character 
     */
    addCharacter(character : Character) : void {
        if (! this.characters.includes(character)){
            this.characters.push(character);
        }
    }

    /**
     * Add multiple characters to list (if not already included)
     * @param characters 
     */
     addAllCharacters(characters : Character[]) : void {
        for (const character of characters){
            this.addCharacter(character);
        }

    }
    
    /**
     * Use to safely remove an character from the list.
     * Do NOT use this in a loop over this list's characters - instead, call removeAllCharacters.
     * @param character 
     */    
    removeCharacter( character : Character) : void {
        let index : number = this.characters.indexOf(character);
        if (index > -1)
            this.characters.splice(index, 1);
    }

    /**
     * Use to safely remove multiple characters from the list.
     * If not passed an array of characters to remove, removes all characters in this list.
     * @param characters
     */    
    removeAllCharacters( characters : Character[] = this.characters) : void {
        if (characters === this.characters){
            this.characters = [];
            return;
        }
        for (const character of characters){
            this.removeCharacter(character);
        }
    }
}