using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace server.Models;

[Table("Request")]
public partial class Request
{
    [Key]
    public int Id { get; set; }

    [StringLength(100)]
    [Unicode(false)]
    public string To { get; set; } = null!;

    [StringLength(100)]
    [Unicode(false)]
    public string From { get; set; } = null!;

    public bool Type { get; set; }

    public DateOnly CreateDay { get; set; }

    [Column(TypeName = "text")]
    public string? Description { get; set; }

    public bool Status { get; set; }
}
