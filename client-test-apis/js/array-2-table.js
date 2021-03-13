function arrayObject2HtmlTable(rows) {
    if (!rows || !Array.isArray(rows)) {
      return `<table cellspacing="0" id="table-datatables" class="table table-sm table-bordered table-striped"></table>`
    }
    let html = '<table cellspacing="0" id="table-datatables" class="table table-sm table-bordered table-striped">';
    let header = {};
    for (let row of rows) {
      let r = {};
      for (let key in row) {
        r[key] = 1;
      }
      // ưu tiên sắp xếp tên cột theo trật tự tìm thấy nhiều nhất
      header = { ...r, ...header };
    }
    // console.log("HEADER", header);
    // header 
    html += '<thead><tr>';
    for (let key in header) {
      html += '<th>' + key + '</th>';
    }
    html += '</tr></thead>';
    // data
    html += '<tbody>';
    for (let row of rows) {
      html += '<tr>';
      let i = 0;
      for (let key in header) {
        html += (i === 0 ? '<td><span class="co-name">' : '<td>') + (row[key] === undefined || row[key] === null ? "" : row[key]) + (i === 0 ? '</span></td>' : '</td>');
      }
      html += '</tr>';
    }
    html += '</tbody>';
    html += '</table>';
    return html;
  }