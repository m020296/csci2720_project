<template>
<div>
    <p>{{id}}</p>
</div>
</template>

<script>
import firebase from "firebase";
import { db } from "../main";
export default {
    props:{
        
    },
    data: () => ({ 
        id: "",
        details: ""
    }),
    created() {
        this.id = this.$route.params.id;
        
    }
}
</script>