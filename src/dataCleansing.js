export function reFormat(data){

	 // Calculate Total for Year to represent data as % of Total
    var total = 0;
    data.forEach(function(item){
      total += item.pigPopulation
    })

    // Add Percent of total to data
    data.forEach(function(item){
      item.percent = Number(((item.pigPopulation/total)*100).toFixed(1))
  })

    // return data
	return data
}