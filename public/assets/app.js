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

$(".replyBtn").click( e => {
    e.preventDefault();
    let articleId = $(e.target).attr("data-articleId");
    let author = $("#authorField-" + articleId).val().trim();
    let body = $("#commentField-" + articleId).val().trim();
    let data = {body: body};
    if (author.length > 0) data.author = author;
    $.post('/api/commentOn/' + articleId, data, resp => {
        location.reload();
    });
});

$(".pin").click( e => {
    let pinned = $(e.target).attr('data-pinned');
    let newPin;
    pinned === "true" ? newPin = false : newPin = true;
    let articleId = $(e.target).attr('data-articleId');
    console.log("id: ", articleId )
    $.post('/api/pins/' + articleId, {pin: newPin}, resp => {
        //console.log(resp)
        location.reload();
    });
});