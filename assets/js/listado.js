$(function() {
    var table = $('#example').DataTable({
        'pagingType': 'full_numbers',
        language: {
            'decimal': '',
            'emptyTable': 'No hay información',
            'info': 'Mostrando _START_ a _END_ de _TOTAL_ entradas',
            'infoEmpty': 'Mostrando 0 to 0 of 0 entradas',
            'infoFiltered': '(Filtrado de _MAX_ total entradas)',
            'infoPostFix': '',
            'thousands': ',',
            'lengthMenu': 'Mostrar _MENU_ entradas',
            'loadingRecords': 'Cargando...',
            'processing': 'Procesando...',
            'search': 'Buscar ',
            'zeroRecords': 'Sin resultados encontrados',
            'paginate': {
                'first': 'Primero',
                'last': 'Ultimo',
                'next': 'Siguiente',
                'previous': 'Anterior'
            }
        },
    });
    
    $('body').loadingModal({
        text:'Un momento, por favor...',
        animation:'wave'
    });
    $.ajax({
        type: 'get',
        url: 'data-anios.php',
        dataType: 'html',
        success: function (json) {
            $('#slt-anio').empty();
            $('#slt-anio').append('<option selected value=""></option>');
            $($.parseJSON(json)).each(function () {
                var option = $(document.createElement('option'));
                option.val(this.anio);
                option.text(this.anio);
                $('#slt-anio').append(option);
            });
            $('#msj-rqst').text('');
            $('#div-span').css('display', 'none');
            $('body').loadingModal('destroy');
        },
        error: function(msg) {
            $('#msj-rqst').text(eval(msg.responseText).Message);
            $('#div-span').css('display', 'block');
            $('body').loadingModal('destroy');
        }
    });

    $('#slt-anio').change(function() {
        var anio = $('#slt-anio').val();
        if (anio) {
            $('body').loadingModal({
                text:'Un momento, por favor...',
                animation:'wave'
            });
            $.ajax({
                type: 'get',
                url: 'data-tipos.php',
                data: {'anio' : anio},
                dataType: 'html',
                success: function (json) {
                    $('#slt-rslc').empty();
                    $('#slt-rslc').append('<option selected value=""></option>');
                    $($.parseJSON(json)).each(function () {
                        var option = $(document.createElement('option'));
                        option.val(this.resolucion);
                        option.text(this.resolucion);
                        $('#slt-rslc').append(option);
                    });
                    $('#slt-rslc').attr('disabled', false);
                    $('#msj-rqst').text('');
                    $('#div-span').css('display', 'none');
                    $('body').loadingModal('destroy');
                },
                error: function(msg) {
                    $('#slt-rslc').attr('disabled', true);
                    $('#msj-rqst').text(eval(msg.responseText).Message);
                    $('#div-span').css('display', 'block');
                    $('body').loadingModal('destroy');
                }
            });
        }
        $('#slt-rslc').attr('disabled', true);
        $('#slt-prod').attr('disabled', true);
        $('#slt-tema').attr('disabled', true);
        $('#slt-rslc').val('');
        $('#slt-prod').val('');
        $('#slt-tema').val('');
        getData();
    });

    $('#slt-rslc').change(function() {
        var anio = $('#slt-anio').val();
        var resolucion = $('#slt-rslc').val();
        if (anio && resolucion) {
            $('body').loadingModal({
                text:'Un momento, por favor...',
                animation:'wave'
            });
            $.ajax({
                type: 'get',
                url: 'data-productos.php',
                data: {
                    'anio' : anio,
                    'resolucion' : resolucion
                },
                dataType: 'html',
                success: function (json) {
                    $('#slt-prod').empty();
                    $('#slt-prod').append('<option selected value=""></option>');
                    $($.parseJSON(json)).each(function () {
                        var option = $(document.createElement('option'));
                        option.val(this.producto);
                        option.text(this.producto);
                        $('#slt-prod').append(option);
                    });
                    $('#slt-prod').attr('disabled', false);
                    $('#msj-rqst').text('');
                    $('#div-span').css('display', 'none');
                    $('body').loadingModal('destroy');
                },
                error: function(msg) {
                    $('#slt-prod').attr('disabled', true);
                    $('#msj-rqst').text(eval(msg.responseText).Message);
                    $('#div-span').css('display', 'block');
                    $('body').loadingModal('destroy');
                }
            });
        }
        $('#slt-prod').attr('disabled', true);
        $('#slt-tema').attr('disabled', true);
        $('#slt-prod').val('');
        $('#slt-tema').val('');
        getData();
    });

    $("#slt-prod").change(function() {
        var anio = $('#slt-anio').val();
        var resolucion = $('#slt-rslc').val();
        var producto = $('#slt-prod').val();
        if (anio && resolucion && producto) {
            $('body').loadingModal({
                text:'Un momento, por favor...',
                animation:'wave'
            });
            $.ajax({
                type: 'get',
                url: 'data-temas.php',
                data: {
                    'anio' : anio,
                    'resolucion' : resolucion,
                    'producto' : producto,
                },
                dataType: 'html',
                success: function (json) {
                    $('#slt-tema').empty();
                    $('#slt-tema').append('<option selected value=""></option>');
                    $($.parseJSON(json)).each(function () {
                        var option = $(document.createElement('option'));
                        option.val(this.tema);
                        option.text(this.tema);
                        $('#slt-tema').append(option);
                    });
                    $('#slt-tema').attr('disabled', false);
                    $('#msj-rqst').text('');
                    $('#div-span').css('display', 'none');
                    $('body').loadingModal('destroy');
                },
                error: function(msg) {
                    $('#slt-tema').attr('disabled', true);
                    $('#msj-rqst').text(eval(msg.responseText).Message);
                    $('#div-span').css('display', 'block');
                    $('body').loadingModal('destroy');
                }
            });
        } 
        $('#slt-tema').attr('disabled', true);
        $('#slt-tema').val('');
        getData();
    });

    $("#slt-tema").change(function() {
        getData();
    });

    $("#btn-clear").click(function() {
        $('#slt-rslc').attr('disabled', true);
        $('#slt-prod').attr('disabled', true);
        $('#slt-tema').attr('disabled', true);
        $('#slt-anio').val('');
        $('#slt-rslc').val('');
        $('#slt-prod').val('');
        $('#slt-tema').val('');
        getData();
    });

    function getData() {
        var anio = $('#slt-anio').val();
        var resolucion = $('#slt-rslc').val();
        var producto = $('#slt-prod').val();
        var tema = $('#slt-tema').val();
        table.clear().draw();

        $('body').loadingModal({
            text:'Un momento, por favor...',
            animation:'wave'
        });
        $.ajax({
            type: 'get',
            url: 'data-resoluciones.php',
            data: {
                'anio' : anio,
                'resolucion' : resolucion,
                'producto' : producto,
                'tema' : tema,
            },
            dataType: 'html',
            success: function (json) {
                var dataSet = [];
                $($.parseJSON(json)).each(function() {
                    dataSet.push([
                        this.anio,
                        this.resolucion,
                        this.producto,
                        this.tema,
                        this.resultado,
                        this.impugnada,
                        '<a href="' + this.url + '" download>Descargar</a>',
                    ]);
                });
                table.rows.add(dataSet).draw();
                $('#msj-rqst').text('');
                $('#div-span').css('display', 'none');
                $('body').loadingModal('destroy');
            },
            error: function(msg) {
                $('#msj-rqst').text(eval(msg.responseText).Message);
                $('#div-span').css('display', 'block');
                $('body').loadingModal('destroy');
            }
        });
    }
});
