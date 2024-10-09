<template>
    <div>
        <h1>Filmdetaljer</h1>
        <p>Du har valt filmen med ID: {{ movieId }}</p>
    </div>
</template>

<script>
import { useRoute } from 'vue-router';

export default {
    setup() {
        const route = useRoute();
        const movieId = route.params.id;

        // Logga filmens ID för att kontrollera om navigeringen fungerar
        console.log("Navigerad till film med ID:", movieId);

        return {
            movieId
        };
    }
};
</script>