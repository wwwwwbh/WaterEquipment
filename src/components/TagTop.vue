<template>
    <el-tag style="
        height: 3rem;
        width: 100%;
        font-size: 24px;
        padding: 4px;
        margin-bottom: 10px;">{{this.contentText}}</el-tag>
</template>
    
<script>
export default {
    name: 'tag-top',
    props: {
        contentText: {
            type: String,
            required: false
        }
    }
}
</script>
    
<style>

</style>