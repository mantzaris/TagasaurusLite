<script lang="ts">
	import Upload from './Upload.svelte';
	import Pill from './../../components/Pill.svelte';
</script>


    
<header class="container-fluid p-4 bg-light ">

    <div class="d-flex justify-content-between align-items-center">
        <div>
            <img src="../../../assets/branding/cuttleFish.png" alt="" height="64px">
            <span id="tagasaurus-text" class="m-4">Tagasaurus</span>
        </div>
    
        <div class="d-flex">
            <Upload/>
            <button class="btn btn-outline-dark btn-sm"><i class="fa-solid fa-circle-nodes pe-1"></i> Face Map</button>
            <button class="btn btn-outline-dark btn-sm"><i class="fa-solid fa-users-viewfinder pe-1"></i> Stream Search</button>
            <button class="btn btn-outline-dark btn-sm"><i class="fa-solid fa-cog pe-1"></i> Settings</button>
        </div>
    </div>

    <div class="text-center" id="headline">
        <h1>Tag Your Planet!</h1>
        <small>Lorem ipsum dolor sit amet consectetur adipisicing elit.</small>    
    </div>

    <div class="d-flex justify-content-center align-items-center" id="search">
        <button class="btn btn-outline-dark">Search</button>
        <input type="text" class="form-control" placeholder="Search Tagging Entries">
    </div>

</header>

<section class="container-fluid p-4 " style="width:85%;">

    <h4 class="mb-4">Tagging Records</h4>

    <div id="records" class="container-fluid ">
        <a href="/tagging/0" class="card cursor-pointer" >
            <div class="d-flex card-body justify-content-between align-items-center">
                <span>The Labors of Hercules</span>
                <div class="d-flex gap-1">
                    <Pill>cat</Pill>
                    <Pill>hat</Pill>
                    <Pill>meow</Pill>
                    <Pill>+5</Pill>
                </div>
            </div>
        </a>
    </div>
</section>



<style>
    #tagasaurus-text {
        font-weight: 600;
        font-size: 2em;
    }

    header {
        padding-top: 2em !important;
        padding-bottom: 3em !important;
    }

    #headline {
        margin-top: 5em;
    }

    #search {
        margin-top: 2em;
    }

    #search button {
        border-top-right-radius: 0px;
        border-bottom-right-radius: 0px;
    }

    #search input {
        border-top-left-radius: 0px;
        border-bottom-left-radius: 0px;
        width: 40%
    }

</style>