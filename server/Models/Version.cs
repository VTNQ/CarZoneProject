using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace server.Models;

[Table("Version")]
public partial class Version
{
    [Key]
    public int Id { get; set; }

    [StringLength(20)]
    [Unicode(false)]
    public string ReleaseYear { get; set; } = null!;

    [InverseProperty("IdVersionNavigation")]
    public virtual ICollection<Car> Cars { get; set; } = new List<Car>();
}
