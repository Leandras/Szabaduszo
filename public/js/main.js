
function selectCity(e){
   var currentCity = e;
    console.log("város: " + e )
    const headers = {
        'csrf-token': $('[name="_csrf"]').val()
     }
     return Promise.resolve(
        $.ajax({
         url: `/ajax/ajaxCityFilter/${e}`,
         type: 'GET',   
         success: function(){
             location.assign('/')
         },
         error: function () {
            console.log("Sikertelen Város választás");
         },
         headers
     })
     )  
}


function selectCategory(e){
    var currentCategory = e;
    console.log("kategória: " + e )
    const headers = {
        'csrf-token': $('[name="_csrf"]').val()
     }
     return Promise.resolve(
        $.ajax({
         url: `/ajax/ajaxCategoryFilter/${e}`,
         type: 'GET',   
         success: function(){
             console.log("Siekres kategória választás: " + currentCategory)
             location.assign('/')
         },
         error: function () {
            console.log("Sikertelen kategória választás");
            },
         
         headers
     })
     )
}

function deleteJob(e){
    console.log("Job: " + e)
    $('#confirmModal').modal('toggle');
    $('#okButton').click(function(){
        const headers = {
        'csrf-token': $('[name="_csrf"]').val()
     }
        return $.ajax({
            url: `/ajax/job/${e}/delete`,
            method: 'GET',            
            success: function(){
                console.log("succ");
                location.assign('/')
            },
            error: function(){
                console.log("Sikertelen törlés");
            },
            headers
        })
    });
    
}


function acceptJob(e){
     const headers = {
        'csrf-token': $('[name="_csrf"]').val()
     }
     return $.ajax({
         url: `/ajax/job/${e}/take`,
         method: 'GET',
         succes: function(){
             location.assign('/')
         },
         headers
     })
}

function getCategoryStats(e){
    alert("A kategóriában " + e + " darab munka van.");
}

function getCityStats(e){
    alert("A városban " + e + " darab munka van.");
}
