using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace server.Models;

[Table("Contact")]
public partial class Contact
{
    [Key]
    public int Id { get; set; }

    [StringLength(100)]
    [Unicode(false)]
    public string NameCustomer { get; set; } = null!;

    [StringLength(100)]
    [Unicode(false)]
    public string EmailCustomer { get; set; } = null!;

    [Column(TypeName = "text")]
    public string Description { get; set; } = null!;
}
