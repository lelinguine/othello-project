export class Timer {
    constructor() {
        this.elapsedTime = 0;  // Temps écoulé en secondes
        this.timerInterval = null;  // Référence à l'intervalle du timer
        this.timerElement = document.getElementById('timer');  // L'élément DOM où afficher le temps

        this.start();  // Démarrer le timer
    }

    /**
     * Start the timer and update the elapsed time every second
     */
    start() {
        if (this.timerInterval) {
            return;
        }

        const startTime = Date.now(); // Enregistrer le temps de départ

        this.timerInterval = setInterval(() => {
            const currentTime = Date.now();
            this.elapsedTime = Math.floor((currentTime - startTime) / 1000); // Temps écoulé en secondes

            // Mettre à jour l'affichage dans le DOM
            this.updateDOM();
        }, 100); // Mettre à jour chaque seconde
    }

    /**
     * Stop the timer
     */
    stop() {
        if (!this.timerInterval) {
            console.warn("Timer is not running.");
            return;
        }

        clearInterval(this.timerInterval);  // Arrêter l'intervalle
        this.timerInterval = null;  // Réinitialiser la référence du timer
    }

    /**
     * Update the DOM with the current elapsed time
     */
    updateDOM() {
        if (this.timerElement) {
            // Créer ou mettre à jour l'élément <p> pour afficher le temps
            let timeDisplay = this.timerElement.querySelector('p');
            if (!timeDisplay) {
                timeDisplay = document.createElement('p');
                this.timerElement.appendChild(timeDisplay);
            }
            timeDisplay.textContent = `${this.elapsedTime}s`;
        }
    }

    /**
     * Get the current elapsed time
     * @returns {number} - Elapsed time in seconds
     */
    getElapsedTime() {
        return this.elapsedTime;
    }
}
