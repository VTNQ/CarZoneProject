using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace server.Models;

[Table("Photo")]
public partial class Photo
{
    [Key]
    public int Id { get; set; }

    [StringLength(200)]
    [Unicode(false)]
    public string Link { get; set; } = null!;

    public byte Status { get; set; }

    public int IdCar { get; set; }

    [ForeignKey("IdCar")]
    [InverseProperty("Photos")]
    public virtual Car IdCarNavigation { get; set; } = null!;
}
