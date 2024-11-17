<?php
class MyHelpers
{
  public static function gcd($a,$b): int {
    $a = abs($a); $b = abs($b);
    if( $a < $b) list($b,$a) = Array($a,$b);
    if( $b == 0) return $a;
    $r = $a % $b;
    while($r > 0) {
        $a = $b;
        $b = $r;
        $r = $a % $b;
    }
    return $b;
  }

  public static function simplify($num,$den): array {
      $g = MyHelpers::gcd($num,$den);
      return Array($num/$g,$den/$g);
  }
}