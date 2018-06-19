$('.scrape').click(()=>{
    console.log('yeah');
    $.getJSON('/api/scrape', data => {
        let results;
        if (data.results) results = `Successfully scraped ${data.results.length} articles!`;
        else if(data.errors.result.nInserted > 0) {
            results = `Successfully scraped ${data.errors.result.nInserted} articles!`;
        } else results = `No new articles at this time...`;
        let modalBody = $('.modal-body');
        modalBody.fadeOut(function(){
            modalBody.empty();
            modalBody.text(results);
            modalBody.fadeIn();
            if(results != `No new articles at this time...`) {
                $('<p>').hide().text("Reloading in 5 seconds...").appendTo(modalBody).fadeIn();
                setTimeout(function() {
                    location.reload();
                }, 4000)
            }
        })
    })
});