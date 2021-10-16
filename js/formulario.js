$('#submit').click(function (e) {
    e.preventDefault();
    let inputs = $('#formulario').find(':input[type="text"]')
    let email =$('#formulario').find(':input[type="email"]').val()

    inputs.each(function(index,elemento) {
        if($(elemento).val().length <= 0){
            $(elemento).css("border", "solid 2px #FA5858")
        }else{
            $(elemento).css('border', 'none')
        }
    })
    inputs.each(function (index,elemento) {
        console.log($(elemento).val())
    })
    console.log(email)
  })