$(document).ready(function() {
    // Contact form validation
    $('#contact-form').validate({
        rules: {
            name: {
                required: true,
                minlength: 2
            },
            email: {
                required: true,
                email: true
            },
            message: {
                required: true,
                minlength: 10
            }
        },
        messages: {
            name: {
                required: "Please enter your name",
                minlength: "Your name must consist of at least 2 characters"
            },
            email: {
                required: "Please enter your email",
                email: "Please enter a valid email address"
            },
            message: {
                required: "Please enter your message",
                minlength: "Your message must consist of at least 10 characters"
            }
        },
        submitHandler: function(form) {
            $(form).ajaxSubmit({
                type: "POST",
                data: $(form).serialize(),
                success: function() {
                    $('#contact-form').trigger("reset");
                    Swal.fire({
                        title: 'Success!',
                        text: 'Your message has been sent successfully.',
                        icon: 'success',
                        confirmButtonColor: '#3085d6'
                    });
                },
                error: function() {
                    Swal.fire({
                        title: 'Error!',
                        text: 'There was an error sending your message. Please try again.',
                        icon: 'error',
                        confirmButtonColor: '#d33'
                    });
                }
            });
            return false;
        }
    });
});
