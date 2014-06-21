var print1 = function(){
	var width = 400;
	var height = 500;
	 var printWindow = window.open('', 'PrintMap',
      'width=' + width + ',height=' + height);
    printWindow.document.writeln($('#map-canvas').html());
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
};
$('#print').on('click', print1);
