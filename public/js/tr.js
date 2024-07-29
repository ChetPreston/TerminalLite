const createTRPage = () => /*html*/`
<html>
    <head>
        <title>LSO Terminal Rooms</title>
        <script src="https://unpkg.com/htmx.org@2.0.0" 
        integrity="sha384-wS5l5IKJBvK6sPTKa2WZ1js3d947pvWXbPJ1OmWfEuxLgeHcEbjUUA5i9V5ZkpCw"
        crossorigin="anonymous"></script>
        <link rel="stylesheet" href="/styles.css">
    </head>
    <body>
        <header>
            <div id='tr-list'>
                <button hx-get='/v' hx-swap='innerHTML' hx-target='#display'>VEEx</button>
                <button hx-get='/g' hx-swap='innerHTML' hx-target='#display'>GEEx</button>
                <button hx-get='/x' hx-swap='innerHTML' hx-target='#display'>XEEx</button>
        <main>
            <div id='display'>
            </div>
        </main>
    </body>
</html>
`

module.exports = createTRPage