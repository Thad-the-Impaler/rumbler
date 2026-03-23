const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 960;
canvas.height = 540;

// Preloaded icon images
const iconImages = {};
const artikIconImg = new Image();
artikIconImg.onload = function() { iconImages['ARTIK'] = artikIconImg; };
artikIconImg.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAgKADAAQAAAABAAAAgAAAAABIjgR3AABAAElEQVR4Aex9B3xU1bb+2tP7JFMy6b0npJAQepVeBQ0iTUUQG/Z2bcR67b2CooKogIj0DqGGQAik956ZTGYm03s7/3Xi1efzvvvufSpe/3rP7weZeuacvdfee61vfd/aAP85/tMC/2mB/7TAf1rgPy3wnxb4Twv8pwX+0wJ/phZILH5BGl38muzPdM8/vVfGT1/4Mz33S2RzQSJc/Ge655/eK+unL/yZng9JjLjWR4GoF+CdP9N9//he/7wzQNaD4ZlxyrHZscphkH1fzI8b5c/0+E9rALzMxCkJMarQjHiVmJsSN+vP1Ok/vtc/rQEow2XFGTEyyIgOAVmY4uofN8qf6fGf0gB4c15OUIWKJyTKeRAVyoO4KPkYyTVvpvyZOv77e/1TGgBfJi8emholDhWyKQGPTeFjITtEOv/7Rvkz/f3zGUBxCUcqD100Kj0MHL4guANBGJ2qgJDQkGIouIX9Z+p8+l7/dAYQLU2cHK0MyYuU8SiLyw82t4/EKAWQECnLD8suKvqPAfyBWyCy4BYBW8B/ZGZBLPEBIUBR4PAGwRMEmFsQy2QLRQ8XFxcz/8BN8He39qeZAZJnlEh8abnfRkUqxxYmy8AXCFJAACRcFoWtQi0aFkUVpEfPOSuZuYOGiP+upf6gL/xpDKB1/1obE0iNDYf73modJeUyweYNQAiPBbkKPvmsvJcYfQzg87k97Vlu2x+0v//utv40BgBAKMrleNGm16u7jS7S1O8AOZ89aARvn+mFI00DoFVru+wOQwmUlOCi8Oc4/vDrXUkJxdAnhSVFjS8Otn16xwA7cxaTw+VPEYSIIFXBg4tqG7nYY4P+fiv0dajv7t94W1ns4r+GZk27VtJzdq/jj24Gf6gZoOD6VxQTJkz4bwmukhKgCF8cAiL5nrzHd5dw3fbNvWqtxu50ky6zB9gsJrDQF+jpVlcQnXF73qM7n5fGpH7tC3K5P+18xegV4rFrPsj86ev/Pz//QxmAnkBcd+ZN78CEkpD/6hRC1b6zvIKwWc8FecK14oS4Jz1O95E+tRFYbCaECNmg1Vkpu9W+TVGQ/jFXGvIQh89Ze+G1FT3/dQ4A2ZIPMiU5E77UOkHx49f/f3+Mtv8HOnC6T3V+eyI7QaUSBdzbztVpLxCf29prchsc279ty1x731uEMFc4TeYKGY9d8NrtE8HtD5LHPzvntri8pQyeYLrP43ygrbZ1d1qsMprLAKE0VByXl6QY7+WJZ5RWtl1u6gqMh20LA3+UVvtjGQD2SvRtX4yPi48svXVKFkRIWeDxeMHpcPl6dNaer891Dmg9jEIOm0UCFgv10T2TwIxg0H0flQHh84jH4XRNzFa1zMqPSZWL+Tw2mwVKmRga0GFcd7DO29jSPaHr3cVlf5TOp+/jD+cEWiu2d1HpM3tr1NYiHpclwtELihARMzMpPHRMVmRUc3s/qI0uCKKfPy03AtyeABys6oOAz0euLoph372gUJUaKWX5GSzKi1jR8VoNvHOwsd9stNza8nrxgT9S59P38ofyAegbevlglXDlOOUWj9d7nrDZcLzVBJ+e64Ej9X0Uk8OkVs3LAzGTArcvgP8wF+DxgxcRodRICXX95CzKYvdQn5ztoT4+00UudJkJxeaSoNu9c/m0tEuP7bj8h4OK/3AGEGfJca8/ZcwuzIqa6Ub73lvR6y1v1sO6o23kld31AGgUY4fGQhBh4CC+z2IS8Pv8MDonGrQWN3lhTz3sqdGRilY99eXpDooeIlflx8z59nQbxxd0a2gj+yMdvzsDGL7mLUnSold/NkVr4UISYLEZUWKxlFXfbWwM+nyjwOtAgD/YWt1tI58eqCPpCWEg5LExBGSAXMgBCZ8DshAheWdfPfSafSTgchzx2Kzj9f3G6WWN/RpEByOau23+l64ZgfTBn3fIEIoeee9W/s/79pX71u/OAOwBZjAlPe7F7JXrVT/3tn12V11Tl97v8wXOn35g7MXyR6d9zfI5pzGD3rqKlgFoUpshOkwESjEPScFckEk4cKlVBy3dZvA57YedPYb51c/MPtXz+vxDmChobtHaugd0jp/d+dHFH8nyCzPXOpju3117/+4uqO69O+wjsxOyk9LjSn6uAWjWLW7sN1hW2lzezNmvnY2iz3OhZHa7iB14Uijiw6lL3USCuQApjn65lA9cKkAuNPbjbB8IeOy2F+veW2invzP33ePJJrub3dzVfx3suvln5weGDo97eXJB6rDqV5b/7pDF350BANzIU4SK+BlxyhUw+/9G08p+bGfhQ7ubvrpvT9shpVzczGJ658tlHF78jZ/w6A4VhEiSBGIB2D0BKjxEAFxcBiRCHiSpRFSAyYRQZQhTqZD+gACGiEJdpn7znNz0mIy/nlQffWh/68aRrx1Pps/1Lx/zPsgcnhWzNEIlFeJ3fnft/QsviCKqqQ/QN/arHfwVU/NDxMKEvLRYTlRC1GSKokgJRf3T64xe/lnUtWPTd6bGqa7jcpijlCLOZ6V3TeyVCVjuGXOHvX3v1h6+zeKoDvp9ARaDQEYcLQgiYMNIID9JORgPs1gMHeWlKmDNW9x7djY+ESPjQ0JKJD9cLv6kTWcbEx0mWzY5O/rrxIe3/tN0ccnWOg7dKEnZMQvyUqM5fC4ng3PDFxm/WkPhiVRTl9Ft/4uwnH/asP/rBZc8RSjCXZZ32/pNw+7YcBdMfH48JNxNr90/G18YmhpenBmvZLIQoGfzOONp3kZRa+s/pWol5sUjABQTeaqm892mjr5xPp/7M4ASxmvFudpoRchoEHs+JeruY76Ar0Ep5ZHMODn4kQ7mwDAwLloOXAQGnA53+dlSjvGBadO/jFGK5jw7O1UTLeZazQ73o2W1PSl9/QOfDEmOyU1PTvin4WB+TtjgTCIUCIoCfj/ER8r5uRkRS/9heyav+WHm+Z8/U8yHopJUxfUfzLnhlX0PTXlsyzeEHbccM5e/yABY//OP/YuvYtpUV1CyUZnImD9r6sg3b5oXgJo2nf5S94SeLr2tweWnKl0OV43H5moBt8UANhczMj/jBlYgyOv+ZMVLg79SUsJI1kQktK5b3aa6cytS9UNuwKUZtGYHtaAobubT31a9uOmt8rfws/+rE8ZkMv2BQADiZfyMp441d8LHC5+jz09ICTxyqP1rkTjkiexJo6rPVHcxc2NCQSzi0aQQNAIKZFIBSVXy4FyPlXHtzWGPKSPC5xtNxscIITRZhPYH/pr59Il8ZSh/qMvpBLvT90/X8rue/Ub0zO6atQNuamJHv5nKiY4mmTHyGwx373yj4815/QWPf5U0h3VdB/bfYOo5bc7o1yyOolqezvDlQAADGZlE5aOYqWwWJ1sWKsxJDRPljExRRucmhwsudNvgwsFzG7TBsA1QctcvSl3/MgOgW/hiibMucM91Tpbgy4WT86avLh6pFDOJstvgGFrRaV7SqsE8u9llMzo8Ax5/kBkdoYhp7uw3Rd+86Zvej5e1phriUn0s1ho80x0yWejirMRwGc7Q1LR0BRjiZGKWQPCgUi6Z/TbzwFUNb0zvm7/h4qS8qNACndXR8G7x0/sBtg3i8l0a18HKZnXXmOy4SR/fJrnYsqBlX2Wv/XBll63cYHV8zfVR9yHI87TT6oSM8GjKhMQQCSaDOIgD6Kx+GJGqpE63GCYG/IyrdAMma2uvqXTS++WTUhTiYSoxZ2xKhGSiXCETHK5orTx5+lAFfevfHbewl3x++8S0CElOeZ2mfe9dY3bk3bMj7rbrCvalxodnyJkBEHAIxUI6QkaMPOJyp46eBV71BHiv7IFdj+DjptT7v06Pjo9cPj1CLCpr6n9U4fOz5RJeSHJkKDc/Xg6F8aEQJuZCj80DHxxqgSNna77q+WDDaoBS/98u4mf/+eUGQP/05TfMpvjXr/9sd8WuVrVp7NxRiVRuhBjum5xIPFQihU6X2OT0if04nkRcBnXPZiq0wmp/Gr+5mMETp3BZ3IXoqD1D+X3j03Ak0uvSq0c7SGWHfoDHJJ1j8xIKhg8Lnxz7TplnXGbkltyEcFBy/JB+8uXP17xdfOOoobKhOrPZWdstXBwgrM1FKeHx144Kv32+23N7a79ZV9VjblZbnW51v0XI9vqoorRwaLN4IFbIAj6mg50ePzUiKwqkB+sFerMDQgWM3slJ0k9GJCtTBWIRmL0AapMT9l3srKtoNy1NVGWmSR/dH3bpeVvp84fyNl4zPHGR3scEiVgM4g3nHwwLkXCtDFHG2i0VGjaLrZgzJIx90+gYiJPzgUEYk7If3/Etmyue5nZY38dbbfIC+8UkuVj0+OwMqmlYXDQXl79IKUYoQg7lxRmqBnMRh1sN8MXhJlLT2HlUoO74VToff/vnr9X0l398uBsPukNHLTzYo7WOs1ndUQJMorQZ3SDAERbCx5GGo03EQU+bzwK5iAMnOh1ZgqzZF/gCjpchCFnt9jgcHA4nY9GoxJjWXjP58oLGG3A6isse+/BR4cghQ+0O96UwmWQUujziXRWdb8eG8kYWJYcVECn7UGOHMSgWi7/V9Jv3tmgGnuozu7Q1apPcEwiqCpPDxSMSQmOdTje/srkfbGYbFOTGQ3KYECLFHHCiVYbjX5PDC7vPtGIn8uCB6Wny/KRwef2AD/ZWqV3nWvpPXO40PvXJkZZ7XXpDVniMarvVFdg+aklY4sqrsl7q7Lc4Xttd84LTFxiNTlHQ4vX3t2kGvJ3tuilMNhgb9K6puZEiYCHsuP9ir4XH4eYzufw8l831irioeEZoqPThZ+elU3xkKEmwfWJCeCDE9qruc8DBVjMY7B7YcrCeVDf3lAmDlmtbtz1s+nHb/5LHv8wJ/Mkv97xzvYbDsBefqu5u3Hu8EdsCYFeTEQ40m8CF/Ds2/tqA0w+jkuWwYlwSgykQvE/5fAjEBS2hEap7AkGS4nR7wYoJGqACWoWYcZqe4hWCwK0iH2OX1eH/tNdgLdtzuuoV7OSTTB4TPL5gYee5xq5ouSg8JVZ5wOcJlpSfq9+0+frsom8qu4v+uqfu4xcOtnhlISJy8+RUPC8FW8q7wIiNSvMCwwRs6EMI+KvTbeBwemD1xCRos1Hw/L5G+3sH614+fFmd99G1GVP27jq2P0nOXDtrXMa+OIWQ37b33AWRgDtKKmFBQ5917/47X32ud8D6XnOf5YmOXsNbAa/j7uZX5xisNuc2h8PlUFs8xOfxIrTMzBZLxcUCLtXsdnuj2ALhG3dOTgKVQggWtx+EiE72mN2wuUoPB7DzRchZ/fZwPals0VwMZZJrWj+5S/+TZv9FT39VA6CvpOPdlV1C4l9ypl5tOnWulSThSGs3oQXX6MnpTiu2PwV2pGKvHB1NLR2fEmcn3OeoQHBAFSaXsrkcRavWSolxvUMHTDDgpST0OTfeMEq99b5R7m9vyb/8xbL8VfDpTW67299vcALonAHKUaVxmm0u+6oJSez0hIi7opPj6lIeP/iWplHr3r58yMrqTt2cdcda+jRuQvLSI8DQZ4StNQboMrnB6PTByS4bdamhDybkxZA2ByHv7K/vLqtXTzlx14iHOH6PNPWJQ+tVaen1Y3LjH7p+VBy7S2fVQV2JHRgML9o18HhsBIm2eQ/dNuLumyaNrSlMjmDvvWN8A33tDrdPiLfMipUJoEtnAw6HxRNL+AyX3a0OsNlv3Tw+STozP5KikKSMCQrYiwNmR4MRTDgIssMFsPt4E7nQrOmREs+ihnXL+uhz/prHr24A9MV1fbKikuuz3bezrB36ew0kEY1AhOzbOoMLduHNNescgzPCX2YkU3dMTEkzWZzxJoudEgi51KmGfkhEmDYiVCg3GlxD6PPds6cm45EDrZ8+tLNRTD+nj8gQboQWF2e3n+oKyY5g6h1+BgdHzzvXZ1FLR8erCrLi1sSnRVTmrD24mavva5NyyPJjtVoHUyQkJoMFLDjlV2msSAtzE7sTZx27GwICIXxT3mHOVrFvSpWx2TlPHd1nD0JZamzYyvtmZiienJlE6fF7rsB3uMSA3dPdOeAHBZ+Tgpc0GI7tv3AuSiblnHzySOtE+jqZDPaoGASXVFIedbJ1gIgEHGrAYKbMZte4x+flJN8xOYkyO3xQ2maGPThTWhCXiMQlID1cSCoudZLS6h4Hz+9e1vbxylb6fL/2cUUMgL5I9abbPvX6/du2nmgFvt8DLJ+XCmEG0ekiUIsGsKvRCJW4xt05NY16aUEWceswWtCaoRKdnbpeCzU6LYz4g9Qi+lxirrCEz2VlvjQvfRCOjb73AEZunLyLrVqj0+4/q0iLiqQClKjL6IRQERtuHhVFlUyPo6YMieTxJNLFuiDvwowUydwhKl5VE3K6ggwmuF0eQN8PLIgKDlichMLXanussKQosl4F/mVVjX1HKcKYsXJiMvPV4gxqMeoG6KXJgjMGJpEU4TdtUNZ3Gi/WdWg98Qp+dsZzB8Lpa/121wWjXMwN8/qCq+jnvmBgxfRcFVxoN0BNl5nq7R0AptUOn90ygjF7WAz1dVU/+bKqH5NQLuBDAFheDzDxn0Gth+1nO4Dhd73Qu+mWE/S5rsTx60QB/+DKeAHn090Gy4Lnt1xmunGupKMAAZeFHcqAEAmPKhNxIS5CCnNzI2HXg5PgdczG7bjYCy9tq4S1S4ZBSrRiEdz99Rbk5kTw2ez05V/VzE4M5Z/Xu7xzxSKhUmMxnDp111B98j3fjmdz2WyZmEupLd5BZ7Pf4ob6HiN151XxGOapQnecaF7z4tICX4/aSDWYWDh7E0BtCMUECqxeinLi9Y2KFFCjokTDb95+YdTjy0YBVg+hjtX1wwTUDtK+gwtHp5jHAB6XG8oVS4Z1vVR+qKkwTjMxIyKhIDZ87D0VmmOnmnR/iVDKpL0mjUW+auuNeQlhI2MVPOq5bZcAXC64YVg0LJ+YCmWdJnj1WAXY7W4KlwNi8xNwugNAIWiEiCRmrVngtNnU4qDmrf5/0L6/xstX1AB6Nt1Wl3rL+icdThLw+4IGd5DwcabP1DI5I1gm1xAWg8k8gw28p6yDzBwaQz26IBeWjEuGN3ZVw6cH66kxmVH8PqPtw4auAfOwtEhRVIjg606zawATORw6ovD6A4NJGy9hFERJUN+H0C0Xow460jhSb4UJ6UpIk3Fh86Faqg4zgGX1GvZf5mRRy98+AbRBOvCf1x8EvdUN4HXDmimpsKW0iWmnmNShKg08MjsTaJimvH0ArhsWQysLQBAloSJlQqLpDBYi0rjP4Zpv5LEZCRhsLOs2uR6bkB2dE/R7qYZuY5ZMIVo8JCEUvjjWBHOyVLBsdALG8l5Y89VlaFFbIIiklO8WDsoV8Hku+J3uc+j8NwQpP2EKhbFMv7O3dXOJ9dfo6H90jitqAPijVPO6Vc//6McZMSs+ns0O4YZQQX+y3eUVc5kMykX5YTN6untPNlM3T8+A124dB50aM7T024JjMyPiaroG4nD0UWnRMq5IyIv0eJHFE6A9ZhKHI5OwHtgtMRgd8OjWGojBWPv6wiiIR92/Ep3Jd7+9TMobdRh/EwpDOWrBqGRg+n042nzg92MHBIPE5vCAENlC4XIhtOgcFL1EHLnQBdKgD26ZkwsanJ6P1PfDjkt9xOGnKJPdD4TJSKTvSyJkCdhoJQZncDbOGODTmKCuwwDqPsvYCRkqGIKjf1lhDiCwAx/sq8MIpBu4iD3w8TsDLjcuc0ChT2hDSlq7z+M7173x5m/pdvtRm13Rh1faAH64+KRl72d7BJJ1LC43HxveJeBwRDMLI6mRmRGADU+xMBunNTmgAr3xv24+B8tm5cKEXCmZMCSS0gw4oVNrgVbsHG+QgHrAAV9dUBN0AJPGvXIyviMQGKBRvbHZ4ZCgEIAB8X2EhEGAjqfeZKdiZQj7YktPRyZQfSci0hju8X1+wschzUMD9OJItGII1tI1AMsmpkDPrjpwYYhpcbgRv2CBFJcqFq7/K8bEUpU9FtheoUWxAcurvH1rMovNSvjyQg/UtvVT2eFCkLO5sLwgEpIjM6jUcDF4cIg3aW2wYfulwdTz+6tHYVEKAc4mQbjcZqAOVKvhRH1/GKYmJ/G5/MnRqzfeyfK6Hu38ZHX5D413BR/8ZgYglofYmVzubV6LxSIVh7zw0KJhCwuTFdDUZ4XSpgHSo7NRNuwEek3uxw7u2nQWbphXCGGYGECYFSKUYihE7J6LvnavwQY0b09jwxwOMJYjc7eXiQaw52QT8rsCVHKUBG6cmAY5iPkPTVYCu9cCr94wAlMRXrjl7eNAWGzM/Acpehmh+YFBjw8YHC48sqkcPrhzEnywchSsev8kFKWqABNHgJwA2Hm2HS626sFPGMAQinAUMyo4LP7NLX1OXp9HSz0+MwMl5iHAZqK+ENdwOtFUrraDweqCTftqwIeGJLL4oFLjGCShpKpEMBkN9tm8WMDlhnpl+8Vt2srmtcq0mHAfw/6b9ctg6HIFDezvTh13/84l98/P3zR1iArBlw5qd2UfMaNnzcAYGNnawCYBGDBYKafFDgvGJEL+qGwQIHtvUlIIhlQM6MOQiQ732LgElGyvI5e7TZoFI2L+evhiz7MavU0qFvMpxBAggJ36+k3DICc2FOY9vRfoOJtG+7w4vfO4bBAoQ+HNhUMQCGLBog/Pg8fmQG4gevjoHKLHAkKkiR18ag4gNk8e3nieYgt44EKQCn0GEirimouS5I8dqNU9nRsnkz91XR5FcTggRP8jWswGBH3gWIcFvPibpSfr4GIXrvdITxdjUsDL5AITP0twxlPiMrV8VAzMK4yBzWc6fS9+UzXV8M780r9rtCv4ws9O2/6sa5r2YcT8q9K2XjM6UVLVYaQ+ONSMbe25SLk9m/weTymXy7QkRobEzhyZxLYiUnf2chd2YAg42HyoRzxcgc5dIjYarexmcViQGSmGYzVaCcbVqbdNT2dUNOlELpxDbpmXAwmIPaw72AhXD4uFeETZtp3voRudxKlExO6lSJiEDwgcgUSAHY3TsN0bIElKAelFsMaDK/Dz1xdCCGYMb373BCyfkQ1JKRFQ22kkdCj70NXZul3nOodz+byoJ67NoeQyEbCxQSIwt1CGmToawcPIBbpbNbAbQ7lkLER149Qs4mcwXOjUHgePazOHGTzq9vrdzTpn4qgUJRmdHsZEccqQ89sGNgHU/+Ikz7/aP7+hASRzr77rpk8XTswa1orrebvRR6pa+nYGqtpntGy64aD5/NbjulObvxxQjT/N4PLGLp0xRKZB7/x0eStclRcNOAJJ64Ab+tCLjsJRFoX4PT2SpCjtOlCllROvV7hmRgbwcBbJjwuFFDSAby9pB9G3B+YOgepuE/Sh81aUGUGa0cGcOzSaTMHwk85RqHV2qOmzkiLMCNZieFY8KgHWzB4Cd3x6Hrown7FyWjoQdBjDOATunZkFW060SGr67PLb5w6h8hKVJBqxB9ooSxHpvNznQOPiEqbdBut3VsEwnOJXzc0nF9oGLh443z5f827xy6bz20oNZ746aTi1eXPouKXjx2ZHJdLXlJukioSMeEH1ng0H/9UO/KWf+y0MgKSv+ix17I03bCjKT53z7dkWqFdbqaL0SFLb3ldZ/9GSrd/fxIcVFHvLlJPqtSf4GHOTaXNGJ5FOqw9qLrXAVIRpkb9H9BYXKeswQYPahvJuJrJ5UPghF8Gmsh5oxlCP9rzpEO+Tkx1gR7e8rmOARCMMe/3oRDjdoockJIIYcZQ/ePWQwVGKSzVEo/d/rrEPq4WFDEYHr980Ejbg99HrR9o4Azr1DkgIob0PCt462AwtJg/jznm51JScKGIzu6i9dTpo0DkI7d1noSPIcTnhtS0VkJgWCUumZZH9lzX+sibNyu7X5p9+a18Ld//mtzH8wGP0i+K5M/PvTIkMUb26uxa6BlwwIitmZNyYBZGB6FGV2vM7Mcx96vvmuSJ/r7gPMLL4Nb5BJLxPGRszG7Na6E95NvIlQvHkoUmvI/dP2NRtOEYo/6YssfALjclFhUSJFzNY7FcweaSgZV0D6OpX1/UiqO5AR1AI8bFhIAoVgyvIAFR8QX4Yn8zKVVHnOs2w+Ww3tGsx34AeP8bmkIRLBJ/NpEN56oNl+XAKw8G9ON2HoA/x+HUFYLR5iADDP5pR8fauKjAiUjUhJwpS0WCe2VVPkFZG+TCjVd9nAz2ijHRqNitBBrdNSoIcTHfvr9bCURSehOJyImAEiVZjoPp69PQyQoXGhMPYYYnoDCLEEASikrBrA17/ba/OTj1z77YyXquJuTw5KvSufMwt7znbpD9X3Xk/OpBSsYC3AAWrEm2P5gu3q+u9zk9LEKS4cscVN4CfXvob59pVun4dfLy/UzliaOI4HIED9ZWdB9rXLbS8cKw9V+cK3ocOW2zPgD2vR++QsqkAdiIyRNAxM+qtmMgx4LrNhrQkFaSkxYAlyCa9fSbqptGxqO6Rwq4qLRxGcKmz14zeQHCQ+5eIUcTYNCVMTlPAyo/KoRbp328sHQqZsTKg+YG7LvaQz9FHyAsXUE8vzIfS1gHoN7ngfLsRLiM87EJDi5QLYEpWOFwzNAKae0yw6bwalBEhhOfzUPU17dDcpiWIJlJxiVGgipQDIpMEVxzKiQhfvFJgSo6QnMc436HgMp+8a1xc/ez3j0YpJPJJar2DOnWx7czFRwrUO7s80kdnDv1Vs30/bf+fPv/NDaBkd0WszQbOVxcXGuiLmb3+wh0iPm+czmx96Nido7vo18a/fvrp4UnKB4YlhPDDQvhUr9VD1NghlTiFt/cOUL3dOjDpzQgpM2FUQSIo4yOR6t0LC0bGwa0Tk9Eho9DzNsEl7OguvR3qEHWjqV8vLsoDTB7C3Z9fgmycHd5Ykk+TQeC+LdXEhi778/MzIYBo3+uoDjLh8pGIWAKdxRuD6eu8eBki9ThTHGqGE21GyE+UQXdTD5RXtGKVEYSIMd0cHRtOZeHSlhmnQCdUAClyPkrNfGhEZuvxWvX9e+8Y9XHJcYp1qae6ALWnd7d3qs+dfXASTXeD27eeD8dJJP+dRcOQ5fTbHb+5Afz41qa9c/aO7PT4d5CCdaDfaH7w0G3rW+d9eNvHyyakL86O4GO2zgEnGw0I3ujBaXdYY6VcdkaEmCdFkAbTwXD8Ujdc7jBCRJgUuCFi0GNnTx4WB8snpMCIGDHi/RjRIZ5/sskAT+5tAhWfAS9dlwvP4OPLbXry6sIcYHE51INbq2FiuoKsHpdIrdlYgaGmH24flwDXo0HxcSn5jpXjhHf31ZKL7UYqWs4n6tZeqheTV0MSlXBVYQJEyYUEk0VURYept77PPiAS85MKMuPECwpUQJNB6hC02HSy48FPluW+MuaV0uvz06LuF0kkBTXVTQ/vWTPuO37kjxvnN3r8WziB//BWRly35lZFqCC/rLZ3bX2vre/qVRNfvWNmzmIhjuzPcT3fcqqtoq65971YMfP1GTkqf4JSlNFvsPIQQoac5HC4e14uGIw2qGjWQRAXW4Ixvk5nBUGoCFoxVYx5G5DjcpGMvkOvwQ7ne+w0yZgMi5OS0po+6loMEbFIFDlU00cwKwnH67RwvM0EM5GPeO+0NGDihxt0TjiIqdrKBjXsOt4AfrcbdJipw7ARo4MsePXWCTiL+AbhX0Q4SW5aeN303PAHW3u0L59vNXRe6rFGs/nCsOGJIRClEF4VHFqMCSbdjqxosTghUjGhf8Biq9u5/gdH+B821hV6499qAPJxS5VIAp2bHim+Zmx62OqpBYm5fQiifH6iqelElWZVIXQ/ZnEyDBqr57rabsvS0ss9Eh5yBmhM4PNjzaAK4cPK6ZnwdWkjBHC4S5HOhbE0cSGINAbFnqVddrjYbR0MGWdhMqYe1+4yfE6zgnMihDAsTQUKzBeEo6VQ+P0tF9UwAgmYJXMyQI3h5rZaPVTp3RAnYcNH288TA0LVNAgVRDQwJoQLG+6fCh8cbIAnvqgEfAPzAT7Ydbot9kKLYZrJGSRsH7Wls7L7zW4KDBqbd4hKHiJNiZZPTI4U3RITJp3aiXWJLtZ2Pac9sbnmCvXvPz3tv9UAOiXT64DhRZIMM4aJ4PiFNl39kcu9r586Xn43CzihPUHxer6I/1xEhHzEgCfInV8USz2LkO6hy32DefnxQ2MgHkO47ee6wIqNPwqh1XSVEE5X9YIMU84pCLca0Rguq60gRA3gkuExSCYlkBUpgTwUg9AKYUwSQQqGfwGcQfIRQr55TAIcbTHA24ebAJFFiEJy5qWabqhqwbQwTvUKhRi6MWaPiQiF5ZMz0IHshmpM/ozMioR3bx8PHRgydjkpcUJE6Fg/FbzFwefkqrt7P+/p97+otdptSAOLZhMibO+ztJypbH2u6plZG7CXfrPkz08t4t/qA/xwMWkvinFIMeDIaot4+WepAonkaXT+rkuJUeCoRoLHuHjqRIMO9GYnPD5/CLzwTRV8jQjb5IIYMA3g1I4ADBIugfIgp29uNshw2v8YwzqdCxFDxOB5COsiSAd3z86CcdhRyNIGjc03iNyR73gBg9EAAoSw/XQLfIidz0Po149ZR73eAjkY+t0wcwh1uFpD9p1qAx7qC4MYldBYfgfmLerb9FByfQEUj02FB764CCPSVRCG2b+dl/tINErQDlzo8LX3WT80dfc/B/vu0MGyjQrYtNtM08h+aIN/04PfhQHkPLBROGDj5fBE3OVyqWBpIQ7dxSOjUbXLpy6hN0/z9kYkyeAgevpIyIQclHWhAAUOY87eZHMPJmAY2NH0gSRTuGZsMhUbJibIyoYeBJLonL8afYMwFJzcf20+DjcGDAnjgwgdPMzu4vsUdNu8xGhyUI98fhHEYaEQgb+D2UJM53JhxtBoOIYGuP9c+6COgIfTvd+LfYcGE6cSwzQaO8CQcuf5TrAjWwzzA9BlcCCRRAmJCC8309nAk11wqlatN9tdH2I6+ku/zdHeidzGf1O///CzvwsDyFqzKdfs5/5VGCKecTV68UVI5NBbPdg11GAugIOjFLNrRMTBSaK2j8pQSVDIEQZeBIqMFhembT2D6V56NNPTOk4HEIlTdQBDAHr6xzAS+nD2aEZsYPWkFHBhx42KFoMScwtONA6apEHXCz5Z3Qv7arSkAHUDqSohFSvhDvITaeKIHmcaZjAAXISOmfgbuG5hUokF4aFCzC4y4WiDFtqQ6oYQM+gxj0HTzYyYuOpFAEkqYBE5QtYNmCf4Fo2kq89wnB/wPdH6/pKzf1Mf/dAhv/WD34UBfH/T0mveLmSHyh4PU8rnFQ6JhMIkGdXRbyNOzMVPyAyDSsyfz8qJQAiYBZ8crscGNUE35hU8hAVMLmcQdQtHQsiCcSloHD7Yh1OwyR2gXBg1OJEDMAprBN+JGL8CO0SH8XmKnEf1IF07hM+meNiJ9X0WeGrTOeJk4SYSMTKKJouqeARmFMYBXVl0x6GaQcyfzh8wESIOetxEhuKN8XkxsGhCGjlcq6V6jA5yVW4U5vn7gU5RR0u55BLiBrWt/YgmWr5x2ZzPWT5fgV7j7+P4txtAyj1b82aMyViChA0KEdH9VWs/PBO5uni+OETwaky4LIrm384rikYsYACUmHS5dngcdesbxxGft8PaFSOBws59cXsNcCVCiAjhkIXjU6naFi1099sgQSXGqnBY7AlHbLJSBDPRZ0DxBsFEDtiRWDIjSUqpEWTqtnqhEDH8UOQU1mKkcADZQDQ3AVk/gzxGE6qFshIUwBcLyFdoeGbM8XOQhXrntUPhcpeJfHO4DuaMSqLuv74Int1WRcIRvBqXqcIMZC/pxijCZLQ0OV3u+9Xna05NXDx5el68olDv8ql3XGzY4nh5ofbfaQq/GfHgf7rJMc8fG37T5NSDQzOipDQ9bmaB+cHjuU+f3Xmu7S6jVl+IhJ0HeULesk+PtSuNRjuutSpowmlWjx1gM1tJc30PtXbpSHhv+0XM34vJEEwdb9pThaM0CBvWTICwUCHlwimeFoDQ3v7X57vgs4M1SAzxU4unZqFGI3RQGdTd2Q/vf9GCUzUXbr16KHloQT4lQfgZawjSFHDoxWhg5etHEOwRIKQsp3aebiEyMZssGplAHT7XRquY6SWGdGFW0UzTzdtN5PglNTqKviZfgPqorbzpw8yrhoxZ+Jfrzs4vSswKxcgCAUgYnRi65kvFiTknH/5OQ/A/tdGVfu3fGgZeddM9LyfFhRduOlq/paxZX4sVOzKvHZEQGycTLO93UoyKI23Pp+eo3rc6vG0Br0/W2jMgP1+vZduQoYNTK/xlURE0dBng80O1hGb4tKNxMIQCeG3ZMIRmv1Pa8NAvaNI74ePTHfDG1goQy8UgxJF85mw9uXp0KjqHZnh18zmSlhEFlbU95AwWlOIhquhCgwxBxJF2EtlYNRariMEX5T2ktaOf4OCn7C4PmTI0DsNOEZy81IWqHgqOX+4FtdZqxUojh1xWx2Ptb2+9yxRgNU67ZsTaVdOy3pwzPEFVWttj3HiifXtrn9EzLCMue8Bkllz85sMdV7qj/9H5/60zgM3lC2vX2VwdGuOrZ/8y+cL5Jw7ubNKYP7x9SoYkOVL2ECpiry+rU38joLxb7luQdxcuqrNJMHAj0sQSksPEFB0JrN1YBhRd3SNCARwpUsGGRUJidCiwseO0SPz8ptlIKOT91WINIGGYDG6dmgHbTzZDtZcJHbjmu9CBpNVFSsTyb7t6KPXGnnpyrqYXBIIkgjoSani0ENKRWzABgaUHkRG6/mwX+Ixm0PboqTVvHIaXV42FvU/PQ/9ER7DcnBG5q2/wmKyNL+6s4XEeuvHxyUMiVq2cPiQKCx7AuwcbL358rOUG77tz61KePDglTKk4hPT0mH/UOb/F6/9WA+joM3+F6ttJUhFvZ/Z93w6vfWbaV1vXbG0fsHo+XDAiMe/hhfkxlW1xd+8pa77786MtDqz2EQzhswTo1FGNSO7sxQRRfIyMDM1OxKwgExaky2DZiBhoRTCmrNcO/a4gVgvlUlgpDLodAZiTEw4FESJYi6BOGOYPZChSpTEDqVxMUEEMt91YCJXtAxTi/TAL13Qlgkrn+93QjrDycIwaliNIROMK2+oMEIVFJRoqmmDe499AHrKFUhMUWGmIKeo2e25GNfStKQlKxfSiZE5ujAQaMUW9/1LP3i93lK2AHbehTq18NpsreFdrsNpb1OY36Y4u/vDEkFBxsG/d4omDSbLfovPp3/jNncBbvqhId/vM+o03TB6gLyDkxk/yohCrLxYWV8umt4rWjEixRazZqkBp15Y4uXhiBurjaFkZzQSuwhFfhqPTikzfeJx6R+THE0m4Ely4oC4aoqQSFCI42GKESxj6BbCQg9tkhn6dhXh8FCWLVQFmIOGTg3Xw1oEGGIsj+r2bhgPKz2HpB2cH0773T08m8wrjqHs3loMdfQ4pGkiUKgSkqHRmiejy8gKYnCjFDrXBZ5VabDykg3dqoB49fJOPQFKSiowZEgPJ4VKkk3EA6xHAhQ4zdOhsG493dN8Kry90vYjytgpMGjmMjqE9nT29NS9c0063w6rPy+cLxLz6N+flNtHPf6vjihtAcfFW5knegLy/a4ALWr+rZDEY361TCmLTEpYNSY0cp9abDIb+gc+SC4OXQknmTYTBWIHECHa/2Z3YqbOF2tADD3g9BNUzFM22TY8Uwpi8OIiMUoARxbaxyMTMCxdRNMZ/ustCWlp6obO+gzIOWEEil0LR0ARQqmQwJz8aElFz9+CWSqhp7CNv3zyKCkM4Nw3DxtONWnhyaxUoUem7/pYxcAEzdweq1KDWoI6xzQAW1BIqMNsXmxpDxceHw1QMJ/PwOk5h56rRWRAikVXbZ0JwSo9YgB25f2yKgw4lH51DJbKVUCCrZXOYGgxFO0N5jA9bHLXH9F3KsUKxcGWMTCgob9AcvrR2Cl0rAKCgRIF2xVGOVFr1Yei8XOHNK674EtAO7SIOW7a2uHjcjWIuy/Zli7Y8eaiUt2xq7tQG1NU5fdTzcqVUlKWcTEomko9u+KLS5CacF7GaiGx8hpJq0XCJXaujZo/PgCHJYRCKBMwWI7Lt0dOfEiGADoOTeuV0L1gGLHCurIHSoPKXzccNITOSIRnpXz0GK9b+0cKIOZnw2LbLgIMPpmaFUZEx8kHgJgwxhejIUEgSUuDDTttwuAFWTUmH17bhCEfnLyc/EeqbNNDd1U+1q6sgXNkJfUUZcA5z/tOSQzF/wIYa7CcJhqGTMFfgc7ioBlyedmMUEBcjJckqMXWu2xbBoKgBOY/5wfPXZB9Z83mLxMzVpCGQ5Y4KlS95+NqC+W9wSxe4fX53ipQ1DAEnUXlV23ZepfMvPQCaKzkbXPEooK/+iMfqLTgSniiXzhqbOWXc0IS0UMyVR6M44pO9l7+49PSMe9sPb+os/eyp4FvnWiQvzHiqJmJcTv7IzKg8Ec7Pp882Ui8uGw552bHgQATPhNW900Ixg4fI2pdI+rykdxNLdy/Zv6cMaJHJirlDQYFc/uYeI3R1G8GMM8gHq0dDTYcePj3eTDISw6CqqgMKh8RhAo+JPgIPyus18Mn+WhhTkEAOnu8guZgUKkqUw0cH6kGDGTsmspJuQqNYMDoFEUErVF5qIeFKCbRi3UcsfQND0a9IQfGJGRFDVK0CqpkGHcctZZ1w9UjkCoQKSU1H/1vbVg7b5NhVFf9GcWZ/+/5PL7Yf2LDLlnb1mMWj4xOxjFji1cMTUxOVIlF5rfrN9t6uR/t3PHXF/YErbgCD1qsvDXSUfnGkSTIqK0wZmjknL5xq19oISsF50RMWbdOd+mqw6FKTcKxq2PUT38e6ekssdhd8trsKZg5RQXZOPNRr7SgSQSoYNnQdPv6mfmDQ+ze0dpIDhy/BqmuLAoUZ0Qya/bMSVUUYLcDpGjWSP3PgqpwYWIX0bgeCO0m4X/DJig6IwCxibjKmg9EJXL+3Gg3EQLJTw6mLtb3kcrseHltYCDr0A8qb+qHkuqEwCjv1VFU3LL0qA2LCpf5NOy4w4xUCwpRKoRULFWAdADIiWjqoBahF1JA2kL5eA3xZ3gNFyQoSIuSNuT91TrCzrfdE35ltHrpdZry1T2LxsB8YmSxXTEiTIwXNBM99fvrVSy8veNCNA2ew7a7wf7+NAXx3ExQ35ary+l7rUmx4YUaUmCpvNSqQNzctdvIyedSEpYvkCukrPIFoJB1rn7zUA0mhHFhTPGwQrMnAtdqFHfj5ZR165W5ICxeR2opGsvNoLVw9Ofso1pYUPPvZGUkjrt9J8WHQ2YflYEP58MqKsfDUl+fhGG4KRYtFwrDje9QDWHbFB9MR4uVguPjW4WbidrkHCSQdyCzWYhUThADgUTSCC81akOCo7nUG4P29dXD4QgeZNza1O8hkNh2r6IrOVAlIYlwYGoELypE/mK7g01QwMOK10jSyPadbobRRR1BowpTJJJOCbN6U8InL4uKm3ZCP7LbnUiOk+YtHxlJt/S7y1Oayis6Gjhuh7bDvCvf7D6f/zQygBMvB7X7zATPETurABN3ceSPiWXQhRiR6qBBYnQRszjCkc4t1egulRtq2ih2A11ePgQSUjzORObq3To/MHAt65mwoQtJGbXUH7C7rIgjanJ1emLjxm/LuRVanh4HVOqARp34BcoHfQLZOQ/cAvLzj0mDyyGG1oU/g+K5KCYMLWIMAiaOAAE8vMn08oNGZCWafSQFKwk7W9Q3qERZPSIdtZ9vQUdQBi49GiDyhhl4zY9741DUNBndGbX1vJGb8IDpKjhp/N1Rj/QErkkhzMIRUYSo4K0o8mMXsRL/FgjJwlMdFMnmCsUgXmZoWLo7ByINCcQp5dsfltrMXGq6Gvff10xtdlZY+9ZtwBH4rAyCtcdevCptww10SMd+nM9tjTFaPik6zzimIxopYbBRoENzYQYjwLAPXeDa8tWIERIWHwCmkaB3GfD8Ts29ZKpSAY2Hn5mYN7MesWmhCNBagImuOV/dGR8WET5+Ey0Uyhoc3TkiFW9EXkIl55Fkc/Xwcwa8sK4KbEf4tvdwNPXo7weEIwxMRPMLIohSlW2ZkG9Os4q2PzobpRQlwAXMCtGBkSkEcGZcdBbHIPsIKpJCGPoSbYvH2nWrdyRWwL0TGRy2giaEZ2OGZSCxh4Pn63UFAEAkQk0boOAyGxIRQnVYviQmXDM5K+YgpXF+gIivGxlGoMUQSaoPndE3PhrgoJMrnzbmpXH3CbavZ1/HDML2CD654FPC3a6fQFf/axxdMZ8pVL0mxGtaJNjPV8Gk55MeEYE5dgrIvJnTjyJ+XEjLoONXoXbARa/xbrQ6Kruylx6wfVvUkfhaHosu5rL6mkKDUWh0jlB7uYTrn05m3BVdlUnLE/a3oKLaioliFOVkNNnw76g2mPbkLPr5jPDxcXADXvbAfJMgbxJTAIKMXwR2CJWSp+xcWQQ0CQg9sOAsURgAyDOMMqCOrx8QSVyJCDiAuLVhX6IVv63GtD461euxPJgjCBkbPLpB/sOcyspAQdES6WKhMiEuNCAw6MTQiPD0tU0lemS/C5BAaH655GHgQvd0L60vbB7UKWIKOJ5LJHnHiDOV1e99UG4Onr2Cf/7dTX2kDIJC8hgOtb3t6t91nxF9ekLHmy1kur+A+zLNMaB7wMi416ygWrsMY8sGdKLsSYU3ll/fXQ1VT3yD5Apk0xIVrd3yMElLzEqCm00zmj0imEqNkWCGss3XbQ6NcyffvDqpRVfPGvkbIR0fsmoIouIgybpR+g0ouoi6jStcfZMFXyPa5c04+yscYtEKX0Di/C7M1NMED13ysZSSmHt1wGuwoAEUGAhWHI5auJqpFxDEco4WNSFRtQ4eP3mgCczny7hcXWmLeLFOPTFXJW4engdrqJ0pOAC41aakatYYWlkCHQkftP9sEszBvsAQlZ5cQK/i4tBWvCTsbOQhijHQwpNX73OYdTrX2Pd2Ou6r+Ww9d4SdX1ACil78fqUqI2RUks7BKaMDkRe69MxDgBrwBJQNLocjYDGr2kChYPDYZQhBt23yqBbbuq8SiTT5q0dVFoMPR0mnyuccMTWKMzovnHLrQ0SKXclpjFcLJmOdlo55gMHoIMhiGCFwa7pmWCoUYwvUiwaMTZwA/Wtki5O0ZkU9wqdVA8pBJjPUBKBQbIQeUgTl9Jk0bx7I1bMCiE1QHbiWXHSsj9QMemJwfQ6YWJVLHG/WDnn0WCjzzMduoRdLqQ1tqgSvkmei+oUvU0jUEkMLmURsHzqqiQkfenhXJ+/p0u0vfb+IMyYhhmsw26tlNZbDlsBhWYcGJt1eNRuGKEb7EGeFch4VyeNB3kYrSuZKUp4Upu7BaVcCDZWL4TJ+HuCvrl3aWXjl10BU1AAZfdBWbIxh6FZI7cCANsnVo8aYcWbgRITyqEGNt3M8Pdlf1kY0bj1IdHQi+sNjUPTeMA7ZQQHZ+U6lWygQvxaikL2NJlZ6aLv302UMTdH0W19mUOM4QoZA3WEaORRj1/dgxqBUg9Xon1YoO1xzcEOqV3XVI/lRARmI40RusAyMyIqwPrz+VwMENo/k46vlcJuaRyKBcnC7i+NbXF6hHlo9uONtri0uMUwl2XugeTO8uHp8Ce7Go1eRk6SCzSIO/xQOqAeM4rlzEVYn4XKx6Fjx6PKJn7ugmz/K0yPSPCtLDDcfNjo9P1uvWPjg/e7AE3NfIZH5k3SnITo9EjmEOrC3Ox82q/FDZbZGjkzjOjjOdBesE0RWKaRHKvvOt4I4M30A/pI3tShxXzACSb3pL6WRynpiVpYRbpiZTBrq8Gq65tGuLUC9BRR6hodQzyJY5fQaVODhqeeiY5caH4P49MVCytRYdKvKSA6XUWL3jFRRpHut+YXb7e/j96z+5uGl8DrwUIuKmxJccD2E7nFVul9evMTpZ3fYATt8UVCM1F/cEIB8eaAaP2dxw46SkO5/dXnVfsyWQEIqyb8wvEPRFKB+ygWkpeRvOQPUmP3lqa8XJ4RkRh97fcfEV4PAT5o2MhdZ+rByJ036jzkk6cE23WK1Bttt7PiojKQ6l50p6z6H6XuNmcjfuJ5hVsnl4ZuRfcfYxKTi8F/ttrtFHa3RTlk5Moy7gbiU0tby+rR/e/OocqRqTQY1ChdHwZAU1FLlhtAAFpWrITiIgQJ9GxAyS9TbP6wnXv3Gx48t7rkitKOTbXImjmGlnK94alxWTXDw2kapC4KYXWTe0hFqMN9estlCfX9RStMq37HQtGK0uj1AmoStJkZnICWzqtZAerdEm5nD2NP51wYDWaL8dSRnBrVu3DkYtJ8637erVGpwpEVJleAgvzen197GZlJNm+tLx/5eHGmHtliqy9URzV9BieTBbzhq5rVKb2eGgpiEO8LfRz6bCRGxk7fKRaCpAAqqAikEW8kCAs+zbij7OpAjB8IDD/tI3J1pMf91aQ3aebieNWjtWM0JlCUVp22tra4US1tDESDmnukvfe7K8Y1DSNfHGcfmtuMVMW5/xttKSiW7sx3W1SF2jvf3xOZFYiYQNMiSdGu1u7fGT9eRkk46sK9fQyiGKgaJI5DUAA81NjdL4peMTqXE5saluSdgHEyaUXJHBekUMIOXuBSVpSZGL7p6VTulwSsPCDmQIxso2nAU2lKux/q2JUD4PnCythX6t4RAKKdU0gZNupCxk1xqwxBuqbDSchPAe2jx3rx7+ka3Pcct7nUrl0KcOXqd5f1sHOmb1yVFyBip7Ejuq2j0Y8gUsCODsOtYIHeqBSg7xr9a2dmR5o2Qb+4SKlxKjFW9jEWuWud8IUehA0pqBVKWIonUEQiR3xkVgIQpcq6+fli1ISojYVE2E96vyk55369XZuI/QE/VdA13bz3QRCwJCAuxEKK0LCnnC+DBUKvca3cfGjohhzV5XcbfR4+i1qa2jDt0x6ix97QFgnO83O2y47xAZhksehdqkIGFhyapAtUZv/uLk6WagvG5yCNVHh5qNgLxXoLez6cMBc7nfhfUI0qjs5KirW9NSf1xsiz71r3L86gagXLJuhUAoeeyu6SmgoMMhTOUakOG7o05H9jYPYAyNGTwxE3btryZareGgWCrcgIzOeJ/TcQkxAC29Qwit/fNTRGlp06nouyx69lCh0WlNQq7+oykJqvshS8kxYxlZFJPQBR8ZoWKGBGeB0EPn2lqMBtu1fe+tHWnhMM9Mv3rsY1dnRFXfOTP7lvvmZUFXm5oaQFFpYXYMTEuR4pKEMnI0uhylgMpGLX+fGjN/A1YsV5fNuvmq9IeLFJLqq+ZOWi2Njd7cXV2X29bSfc/+s61qJIUqo5bPFuPew06M+rAYJAhOHSlzJ4VLnkkJj7je4jJljXpmXxJ97VhyRoWaNbRtxDkkfIJ+rybgdjYxeMJxCjHnzR6d8eiBE81Y1Yw7yExed14D68t7cYnEfQzQV/JhvmLtNdmYsFI8mHjHptvoc/6ax68KBCkWvTdXHibfsLY4jz0iLZyqwVDsJOLbjRg7Y+di0hQgAaHYQ0drSXOXTid0G2eh2H9okMGazgl6VgeYnClZCcrQ0Znh1KUei0BtdKSHjCgmEWEhr3G4bAsaBYmJkM1NH5k/Iy1GntupGQhWtBlL0HjyUZ8X6Ky8MD8yJ9u75J6bP7hhdPIrS8eljp+YqRKxcNxtOVxL7S3rgBjkHiybkUfQaRscaY16B0F8h0hQ7HG+tgcLT9ixclwQpmEUMDc/TJoeIRuvELFvTspKju91UR/pmjvexrAhWiETt2EZWW1CmGhFnIKfygxRZgkF3LQBk/NMWqx8so8wbgnmFiPgx3q0MEmZcG1RFNWgtpADFzrbiMf1BJvPX8qgAjvcFvNnRmdgOYpQ+UMzIlCdjPsXII5RhTUJ6JpGBJfNWCS0okKZHK3XT/bHjK111e5t/LWM4FczANbMBtYGWwAADhRJREFUF8YlxEdufWrpCFFsjJw60KAjyNghjICf4DZupLfXROfNid/uILtRXcPAatranQ+dkAydl4zTYXhCyydP9EvylqHSN2Ic6vBRrYvTcmjq8PTIBRFysbK1Rf1SW4v+CG6+NCVGJRmGsKoJRaVPX3xswo64YXM97R/dsL5g1VPj7p6dvf/a0Qm5OICYVW39dhRrVKCO8HCfK5iFxahZYVjoIzc3HvbVG0iYiEVCBGyqAlXI0RhGnkJJWVhCJEE+v+tUvWYn6hS9KACRZmDSfnpuWK6Aw1rW4qZOND8z47XIolnumhZ3K+GSEIwgkNQSMqSjW191sLTm4cR4lfLO2UNX58aGXD0+UxW7aFgkxcdQ88BlLalo0JTdEtX6zCVbyOygz7u359NbLomzpwYsLsbU9GgJMRltxI6la4NeH8IDFOnHZa0NGU6RSHYpSpCxKtoGZtnCis76mw93/RpG8Ks4Fqzxfxk5viBl26r5I6RmDGUOHqgnfUiQQFwf1btWr8Ph1nrcXi1Np+II+UUoqzml/+bbz+gb4HhcR1lYW6W0tNSvjL1hS6vamk+jZGfqtIPOUL/JSR2+1P7+xef2nQZY5/uiumRs9rT85La+AZPrkxWDPkIdFlIWLP0wonhk3EYMGaVPbr6AxcqN61o7zGc8ny3qWLm15iqRRHRTPdbrrS6rwo0ANVhbSEThjIJXgFMzCkQrLndgLQEbGZ3Jg8QIMbehU/fXkmkp1aJ79qQkoaoXdQn3LByblmSxONbXz3qv4OKriwdTtYe2wd1lq756V6WQylsPlVfRO6h80fPxJ1jmfcbIjKjpSHjAWgUUIIOJXMLfD7jtX2FeJBh780frgeOtpttAoNG/4xCKb3p989lwy4CpisNi4z4WzAghjxUWKpfwlYoQaEIaWw7yIR5eMlr82W725vPOkqn2oyX19Pd/yfGLDUA+8YHhMRlJe7H4ofidjcd7WvssaqRotWM028BnUs1cRqBBZO7v7j/yohXZLSSqKeQq3I0XQZTvtjtp23SbDnfY2lryEd6Gy/lZe6fmXqcLa8jxePDeHsTTevtutbn2o4f93dYwdAPXXoTBhvvxjedlpxQlxUeqvjxeV7FtVdF4fI9ecQYPHPjDmGwBEbCoExRfkFPV0Bs6YVI+JUBpmBMXcCn6KV9f7iRsodCC9f2NJC48AVF5ugJ4pf2N2Q0IzTVUzX5/B5fHPZ2dEJaQVpSa17QXjv/t9GBbv6j5x5sKfvjIjMD25ppbtp1pH5OaqHr7jllZ8jbMDbT36CslvZpdNCQ6vSiwYd3q2wezfjTQE6V662bEow3mb+5rxSCAjFjzllindUW0mEyJze3qTAaDlX70BCspIVKakBkTEmlKCt+hIY/M6D/ywiCl7Ptr+b/+/WUGUFzMJAa/wjRgXrnxXG0DdDhRrLfO8v1FDBby/duTQe4Zprnw6eHv3//+b8nCrEGRpH7bHVr/4nWfVnaYHsa0HmYBA3uWz8xqDnjSCz7Ytu3895//n/5iwX2PDmcO9NBJ1l92johUyRb29zofrXp5qvPOnU2z9HrDyY7Ovqck8pA9rUgWmYVgLtbmHoy37SYbVvO0gzIuJmg221YaDANPYZnZheiQbs1+6mBoYpRyeVO74QDWLfLTmT6f3/fjW/u7y+ljOliFyZHph+6f9mWgZP9SDps9s76jDzRq/VuOv6F661av/m8pX/WWu859fyJsKwrevsuKz+l/NEdwMMSk39cqVojLYqWqmOTwbCxuEYcvdeA/ul1/1vHLDGDbtgDOg3t/TdqKqVPzeX1z710ICvH7Biy73rluVstTpaX/1FdpKK85dz465HJhVnJBSJjidH2ruq76lbHuB8c1xnNY5LLZYXoEtwuayZMKBX1aPdXTo4eQzNhBwunp1j5iDeDWNlgF3Ga1BQJ1uimsYVELNlX3C0wan5sVy7x19qik19PiVVB2ue1Ye0XL381AP279kpkpdMcNGnqX1rK/QW2d2a3R6x2Vtb8c0TNssAFWu+2phNYf/+bPffzLDODn/ur/9r2zJQ3WucN6OvQ2t6nfXvo38STmXv73w/ztveZtso9nmW3BlQIBW9jWqV0/5e3TKm2f3f356sI76G+PePZAaACl4mypmNRhbd9CZBrR1cWrm/uAjZtD0YQTlINJP0UABz/+xYqPT4szE3mMxjb1NCk35rYj5xrMp6o7P4b9d/3LbB19XfuWltbYJ5DU2oJJsd+0ANT/3mLfvfv7M4DirUji0GmRFPoYIkDOf+Umvv+Mc8PNmp0b4Gn6+YjnjzyE/bmwl7Jd/f37DDYnBUvMQzpuxdaCdG66mBQ6ddCqsVIqlYq4MOTCwl7y7z+vtvhUbLF4i4rpev3TJTmPfP/6/+nvqUf1rSO3Pop7AfxwHf+n71/hD//qQNAvvd50f2vIQE/Xc83rbj79c8+V/NCuESPzU17EdGwpvX0sfZ5J7xyNC7K4i1CsC0PjQ7HAE/IL7E7Q9pvBjPvxXV0UjRXLGSj84N4aXfzdNu8H75vYGiETteHGFev5S9ZH/9zrOf/Swo+N/X0f0XUQfu45rtT3fnczQOOOR2kn+dAvuWEem1mUjbTtXrVuTOSD+0aHSjhis5P9HFaNiVw8Oo6qbVQjEQR3CrG5QIPhqh4NQIoY7HyM17+t7C+KGy34Rjns5AvtPQNclZCRL5dJeVKlItmFhcp/7nVptty3U4MoJ7yy/Oee4op873dnAHiXP9ujXfzenlBrUDD0Qo2uqwcpXnOK4oejMZyyu/yERtMmpCsoHtJx1mEhCDamcIOYxevDDSGR4AmHz7XAX24aD2lKIXWqzTLdZHdNn52tgmm4x8D2cx1Ok9mpvuObhlRfrKNjXWHhf/Pg/+We+W4r2n/547/FB3+PBvCz71vEpDxmigz0f/jBiV2qkPLHFg8f/pe5mQTJKFg6lkV1Wd3ki92V0GvxUogKAsLLWENAgtu+ceACkj43Hqghy6YNwXI0cgonBIKTBBxqNMHRyz37PZ8uaXFNrVko1Em7fvYF/g6/+IcygHWr59BO4+WwlZ/eFiUTxA6gg9eFPL3OARddxpWcudgG5dW9QRabw2ChxpsmoUroREAAOQS4ZdyO4/UeLc4IRfnJXDmWh5Eiwxi3s0UdYsh45/3f3Lth8ZDXf4d9+Isu6Z/G17/o7P+GL2c9+M0d86/Ke3dmUby4HncKOXShm5RfbIFT51sq2tTG02weN8vndpllAi5vyZSswV3Mdpe1Yg6G6DgiER/Ruudr6rqcWIsgoa3Phizu/9fe+Ye2VUVx/L6+99Iktmuz1LVuS5MYhgUnm2KjDCdl/2wqY7CCuOnmBEHwH8V/RYyDuTEH6j8KQmrd/vBnoYOyNRvMdnXUbdVW28ynXdclzWLaNE1es7wfyfvhuYGC7I9107avee8+CCHkce99n3O4l3fvOd9jo3Y+4XFCQYidsw3bh/ihrnEDHmvZujTVDODfe8L7WKDxGM4TfP/z4WsZXryiikK0VFQGvRttcafDfQ5yA6IgGzT5cItnN4g76XbWjprWuWhuMtnh0PUDkK6+R51K77gcu9XssD8Q7PvZHvQ1ubY9tTWw2d+89kjs0dB5FA0ZLu+2VB5hKgcAUcFXOC4+MjJ64zCaGB9ANzvLMmwhiAH96s1Tp+GEjVWzc69Tde6OLRArCGIOoPYFQSj+dVT0RsrPCvw+ha7qYtevOdnCOvb/fuIgVvAMz/kO2WOxJ5/zbnS/Fwi6n5mIogtLZQCj2zHTEkDVP7K9yIW/+QhNdvyFciPl3cO2UIjp7xx9WZJUmyZlX9Wqa3wuV/1bL+5oAdn56rITyJJMDXLTfkUtHLXl+S9kmvFADb/WQOvu3/7+pUfGbYnXznCi3fNtrXONnBmNlCOCjTYe6f9eCMC797/j6dwHw5EDn/2kX5ia1y7GeW0gkddOc2mt9d0eff2hcHkXETeLHQd/7qWLSr6nfEhXyQ9wP2P3vvTpNs3V2H/8tacZ+9o6fTPkJs6AFiDoEKNLl8epcGTsFiPkH099v7Ql2u9njCt976rbCl5OABLrfLttazMDa7leA4dAkJOJPPC6V4QikruCPpCXdW2AEK43lnMMq61tyzhA065QG1QIbd+yoQZ5IM0LT32DsXmoRCZQIAmrNzbUUkGQfhGK2ju+9g9bVpuhlms8pl/jFsDBOU+ySislTp37ozkQeAjhHPVN9TYUg5TutKhStSURnb8CYtC6whduzy96/LzQbqV/m+kt4K62yI/3ZVybnp3OFen2GjgP8HoepBywDOCS8JAKqp/pHaH+jM+ojJDZn44cuXrXxkz0p2WWAGyzZPev39GK2Nc/FKfoEpwHMFW6087qtzM5kIWZRYwmdc/0Ho6YyL6LPoqlHAAHltoU4ZMkRCuPcQlUCzoFTtgIwnUJBUEosYpwfFFiJrvBYg6AUPVof6+uimPDXIrC5WcZqPyBZWRpRR5I9YQsM/Uv+LHlHOD69bMyWxI6cWQwn4Xy7iAWPQ3l6GlV/BKg/OdYhAWglfZtOQcoG0jiu3iI/wbtQGpiKktJspC0Kdn/H7FbadaH8VrSAVK9x24qJfli33AC9IfTkIGknE1EPsahaJa7LLMPcKdl2WLhh0tjiRdUyEunpbxhhRvvHNdK/7asA9RVqZFcjs9DVeo5ujRXzuVfafikP4MJNOw5+qP7+Q9OGjwMQ7u37AyAqWvCbLeqKAlDLWBw55Z2ALZQ+FqXQROOXIQAIUAIEAKEACFACBAChAAhQAgQAoQAIUAIEAKEACFACBAChAAhQAiYlMA//HxtLOtMTL8AAAAASUVORK5CYII=';
iconImages['ARTIK'] = artikIconImg;

// Preload portrait icons for versus screen (base64 embedded)
// [Extracted to data/assets.js]

// --- GAME STATE ---
let gameState = 'title'; // title, charSelect, practiceTargetSelect, assistSelect, difficultySelect, levelSelect, fight, finishHim, victory
let gameMode = 'cpu'; // cpu, practice
let titleCursor = 0; // 0 = Fight CPU, 1 = Practice
let practiceTargetCursor = 0; // 0 = Bag, 1 = Mannequin
let selectedPlayer = null;
let selectedCPU = null;
let selectedAssist = null;
let cpuAssistIndex = 0;
let charSelectCursor = 0;
let charSelectScroll = 0;
let charSelectMaxScroll = 0;
let charSelectLastCursor = -1;
let charSelectPerRow = 7; // updated by drawCharSelectScreen
let cpuSelectCursor = 1;
let selectingCPU = false;
let showLockedChars = false;
let assistCursor = 0;
let selectingCPUAssist = false;
let cpuAssistCursor = 0;
let difficultyCursor = 1; // default Normal

// Lottery animation state
let lotteryActive = false;
let lotteryTimer = 0;
let lotteryDuration = 90; // frames total
let lotteryCurrent = 0; // currently displayed index
let lotteryFinal = 0; // final chosen index
let lotteryType = ''; // 'char', 'cpu', 'assist', 'cpuAssist'
let lotteryCallback = null; // called when animation finishes
let cpuDifficulty = null;
let paused = false;
let winner = null;
let titlePulse = 0;
let shakeTimer = 0;
let shakeIntensity = 0;
let finishHimTimer = 0;
const FINISH_HIM_DURATION = 360; // 6 seconds at 60fps

const femaleCharacters = new Set(['TORRENA', 'CORVIDA', 'TELATRINE', 'KILLA WATT', 'VORTICE']);

// Rumble (fatality) state
let rumbleActive = false;
let rumbleTimer = 0;
let rumbleType = null;
let rumbleSubType = null; // specific rumble code when character has multiple rumbles
let rumbleCodeBuffer = '';
let rumbleAshes = null;
let rumbleLoserHidden = false;
let rumbleIceShards = [];
let rumbleAcidBlob = null;
let rumbleGoo = null;
let rumbleAcidSplashes = [];
let rumbleVenomMeltPct = 0; // 0-1 melt progress for clipping the loser
let rumbleVenomDrips = []; // drips falling off the body during melt
let rumbleLightBurst = null; // { x, y, timer } explosion of light
let rumbleLightParticles = []; // beautiful light particles
let rumbleZapActive = false; // electricity beam active
let rumbleSinkhole = null; // { x, y, radius, maxRadius, depth } sinkhole state
let rumbleSinkProgress = 0; // 0-1 how far the opponent has sunk
let rumbleDirtParticles = []; // dirt/debris flying out of sinkhole
let rumbleShadePoof = false; // opponent turned to smoke
let rumbleSmokeParticles = []; // smoke puff particles
let rumbleShadeComboHit = 0; // which hit in the combo we're on
let rumbleShadeBrush = false; // Shade brushing shoulder
let rumbleBojdoPhase = 0;
let rumbleBojdoLaunchVy = 0;
let rumbleTetherAngle = 0; // current swing angle for Tetherball
let rumbleTetherSlams = 0; // number of slams done
let rumbleTetherCracked = false; // final smash done
let rumbleTetherGrabX = 0; // where Rubberman's arm reaches to
let rumbleTorrenaPhase = 0; // 0=water, 1=evaporate, 2=cloud, 3=rain, 4=hailstone, 5=done
let rumbleTorrenaCloudX = 0; // cloud position
let rumbleTorrenaCloudY = 0;
let rumbleRaindrops = []; // rain particles
let rumbleHailstone = null; // { x, y, vy, size }
let rumbleHailCracked = false; // hailstone has shattered on impact
let rumbleSnazzDiscoBall = null; // { y, targetY } disco ball descending
let rumbleHaystackRavens = []; // raven positions { x, y, wingPhase }
let rumbleHaystackScythe = false; // scythe has been drawn
let rumbleHaystackStrike = false; // scythe strike connected
let rumbleHaystackDust = []; // dust particles from dissolved opponent
let rumbleHaystackDiveStart = null; // { x, y } stored at start of dive
let rumbleCodemaxLaser = false; // laser is firing
let rumbleCodemaxPixelLevel = 0; // 0=none, 1-4 = progressively worse pixelation
let rumbleCodemaxGlitch = 0; // glitch-out timer
let rumbleCodemaxLaserParticles = []; // pixelated laser trail particles
let rumbleCorvidaPhase = 0; // animation phase
let rumbleCorvidaNestX = 0; // nest position
let rumbleCorvidaEggs = []; // { x, y, hatched }
let rumbleCorvidaGulpChick = -1; // which chick ate the opponent (-1 = none)
let rumbleGolgarEntity2 = null; // { x, y, facing } second entity position
let rumbleGolgarPhase = 0;
let rumbleGolgarLaunchVy = 0; // opponent launch velocity
let rumbleGolgarOpX = 0; // stored opponent X at start
let rumbleTelatrinePhase = 0;
let rumbleTelatrineShrug = 0; // shrug animation timer
let rumbleSnazzConfetti = []; // confetti particles
let rumbleSnazzPunchLanded = false; // final punch connected
let rumbleHailShards = []; // ice shards from hailstone cracking
let rumbleTorrenaEvapParticles = []; // evaporation steam particles
let bojdoUnlocked = false;
let bojdobojdoUnlocked = false;
let bojdoCodeBuffer = '';
let bojdoUnlockFlash = 0;
let rubbermanUnlocked = false;
let rubbermanCodeBuffer = '';
let rubbermanUnlockFlash = 0;
let torrenaUnlocked = false;
let torrenaCodeBuffer = '';
let torrenaUnlockFlash = 0;
let masterCodeBuffer = '';
let masterUnlockFlash = 0;
let rumblePracticeUnlocked = false; // unlocked after first rumble or master passkey
let snazzUnlocked = false;
let snazzCodeBuffer = '';
let snazzUnlockFlash = 0;
let haystackUnlocked = false;
let haystackCodeBuffer = '';
let haystackUnlockFlash = 0;
let codemaxUnlocked = false;
let codemaxCodeBuffer = '';
let codemaxUnlockFlash = 0;
let corvidaUnlocked = false;
let corvidaCodeBuffer = '';
let corvidaUnlockFlash = 0;
let golgarUnlocked = false;
let golgarCodeBuffer = '';
let golgarUnlockFlash = 0;
let telatrineUnlocked = false;
let telatrineCodeBuffer = '';
let telatrineUnlockFlash = 0;
let duplaireUnlocked = false;
let duplaireCodeBuffer = '';
let duplaireUnlockFlash = 0;
let bozollokUnlocked = false;
let bozollokCodeBuffer = '';
let bozollokUnlockFlash = 0;
let gourmandUnlocked = false;
let gourmandCodeBuffer = '';
let gourmandUnlockFlash = 0;
let batschUnlocked = false;
let batschCodeBuffer = '';
let batschUnlockFlash = 0;
let paletapUnlocked = false;
let paletapCodeBuffer = '';
let paletapUnlockFlash = 0;
let matadorUnlocked = false;
let matadorCodeBuffer = '';
let matadorUnlockFlash = 0;
let killawattUnlocked = false;
let killawattCodeBuffer = '';
let killawattUnlockFlash = 0;
let backtrackUnlocked = false;
let backtrackCodeBuffer = '';
let backtrackUnlockFlash = 0;
let exorUnlocked = false;
let exorCodeBuffer = '';
let exorUnlockFlash = 0;
let buckUnlocked = false;
let buckCodeBuffer = '';
let buckUnlockFlash = 0;
let vorticeUnlocked = false;
let vorticeCodeBuffer = '';
let vorticeUnlockFlash = 0;
let xhaustUnlocked = false;
let xhaustCodeBuffer = '';
let xhaustUnlockFlash = 0;
let weedthornUnlocked = false;
let weedthornCodeBuffer = '';
let weedthornUnlockFlash = 0;
let bojAssistUnlocked = false;
let bojAssistCodeBuffer = '';
let bojAssistUnlockFlash = 0;
let jazzAssistUnlocked = false;
let jazzAssistCodeBuffer = '';
let jazzAssistUnlockFlash = 0;
let cyanoAssistUnlocked = false;
let cyanoAssistCodeBuffer = '';
let cyanoAssistUnlockFlash = 0;
let warperAssistUnlocked = false;
let warperAssistCodeBuffer = '';
let warperAssistUnlockFlash = 0;
let aphidAssistUnlocked = false;
let aphidAssistCodeBuffer = '';
let aphidAssistUnlockFlash = 0;
let studAssistUnlocked = false;
let studAssistCodeBuffer = '';
let studAssistUnlockFlash = 0;
let floatAssistUnlocked = false;
let floatAssistCodeBuffer = '';
let floatAssistUnlockFlash = 0;
let stickerAssistUnlocked = false;
let stickerAssistCodeBuffer = '';
let stickerAssistUnlockFlash = 0;
let serpentAssistUnlocked = false;
let serpentAssistCodeBuffer = '';
let serpentAssistUnlockFlash = 0;

// Level select state
let levelSelectCursor = 0;
let selectedLevel = null;

// Secret level unlock state
let snowyCityUnlocked = false;
let snowyCityCodeBuffer = '';
let snowyCityUnlockFlash = 0;
let foggyCityUnlocked = false;
let foggyCityCodeBuffer = '';
let foggyCityUnlockFlash = 0;
let rainyCityUnlocked = false;
let rainyCityCodeBuffer = '';
let rainyCityUnlockFlash = 0;
let glowingCityUnlocked = false;
let glowingCityCodeBuffer = '';
let glowingCityUnlockFlash = 0;
let sunnyCityUnlocked = false;
let sunnyCityCodeBuffer = '';
let sunnyCityUnlockFlash = 0;

// [Extracted to data/difficulties.js]
// [Extracted to data/levels.js]

// [Extracted to data/characters.js]

// [Extracted to data/assists.js]

// [Extracted to data/attacks.js]

// --- COMBOS ---
let frameCount = 0;

// [Extracted to data/rumble-defs.js]

// [Extracted to data/combos.js]

// --- FIGHTER CLASS ---
class Fighter {
  constructor(charData, x, facing, isPlayer, assistData) {
    this.char = charData;
    this.x = x;
    this.y = 380;
    this.groundY = 380;
    this.facing = facing; // 1 = right, -1 = left
    this.isPlayer = isPlayer;
    this.vx = 0;
    this.vy = 0;
    this.health = 150;
    this.maxHealth = 150;
    this.practiceRegenDelay = 0; // frames until regen starts
    this.width = 50;
    this.height = 90;

    // State
    this.state = 'idle'; // idle, walk, attack, hitstun, blockstun, launched, crouching
    this.stateTimer = 0;
    this.currentAttack = null;
    this.attackFrame = 0;
    this.blocking = false;
    this.crouching = false;
    this.grounded = true;
    this.comboCount = 0;
    this.comboTimer = 0;

    // Animation
    this.animFrame = 0;
    this.animTimer = 0;
    this.flashTimer = 0;
    this.hitEffect = null;

    // Assist
    this.assist = assistData;
    this.assistCooldown = 0;
    this.assistActive = null;

    // Combo system
    this.inputBuffer = [];        // simple list of attack type strings
    this.lastInputFrame = 0;     // frame of last input
    this.comboWindowFrames = 180; // frames before buffer resets from inactivity
    this.queuedAttacks = [];     // queued attacks to execute in order
    this.pendingCombo = null;
    this.comboFlash = 0;
    this.comboNameDisplay = null;
    this.comboNameTimer = 0;

    // Status effects
    this.dotEffect = null;       // { ticksRemaining, tickDamage, tickInterval, tickTimer, color }
    this.frozenTimer = 0;
    this.slowTimer = 0;
    this.armorActive = false;
    this.armorTimer = 0;
    this.phaseTimer = 0;
    this.chainHits = null;       // { remaining, damage, timer, interval }
    this.teleportGhost = null;   // { x, y, timer }

    // Rubberman stretch tracking
    this.rubberStretch = 0;
    this.rubberArmReach = 0;
    this.rubberLegReach = 0;

    // Torrena water phase
    this.waterPhase = false;

    // Codemax swap
    this.swapCooldown = 0;
    this.glitchTimer = 0; // visual glitch effect after swap

    // Haystack explosion
    this.exploding = false;
    this.reformTimer = 0;
    this.reformMaxFrames = 60; // 1 second at 60fps
    this.haystackProjectiles = []; // { x, y, vx, vy, type: 'arrow'|'sword', hit: false, timer }
    this.hayParticles = []; // visual hay bits during explosion

    // Snazz McJazz dance
    this.dancing = false;
    this.danceTimer = 0;
    this.danceMaxFrames = 120; // 2 seconds at 60fps

    // Golgar twin entities
    this.golgarEntity = 1; // which entity is active (1 or 2)
    this.golgarOtherX = x + facing * 40; // dormant entity position
    this.golgarOtherY = 380;
    this.golgarOtherFacing = facing;

    // Duplaire clones
    this.duplaireClones = [];
    this.duplaireMaxClones = 6;
    this.duplaireOrigHealth = this.maxHealth; // original body's section health
    this._isCloneDraw = false;
    this._cloneAlpha = 1;

    // Buck firework spray
    this.buckFiring = false;
    this.buckFireTimer = 0;
    this.buckFireCooldown = 0;
    this.buckFireworks = []; // active firework projectiles
    this.buckExplosions = []; // explosion particles

    // Exor soul drain
    this.exorDraining = false;
    this.exorDrainTimer = 0;
    this.exorDrainCooldown = 0;
    this.exorDrainTarget = null;
    this.exorSoulParticles = []; // visual wisps flowing from target to Exor

    // Backtrack rewind
    this.btHistory = new Array(480); // ring buffer of { x, y, health } snapshots
    this.btHistoryIdx = 0; // current write position
    this.btHistoryLen = 0; // how many entries are filled
    this.btRewindCooldown = 0;
    this.btRewindEffect = 0; // visual effect timer
    this.btMaxHistory = 480; // 8 seconds at 60fps

    // Killa Watt zap
    this.kwZapCooldown = 0;
    this.kwZapEffect = null; // { target, timer, bolts }
    this.kwStunTimer = 0; // vibration when stunned by zap

    // Matador dash-slash
    this.matadorDashing = false;
    this.matadorDashTimer = 0;
    this.matadorDashFrames = 0;
    this.matadorDashCooldown = 0;
    this.matadorDashHit = false;
    this.matadorDashStartX = 0;
    this.matadorDashEndX = 0;
    this.matadorRoses = []; // decorative rose particles

    // Paletap shockwave
    this.paletapShockwave = null; // { x, y, vx, timer, maxTimer }
    this.paletapShockCooldown = 0;
    this.paletapSlamming = false;
    this.paletapSlamFrame = 0;

    // Batsch tortoise form
    this.isTortoise = false;
    this.lastCrouchPress = 0; // frame of last crouch press for double-tap detection
    this.batschCrouchPending = false;

    // Gourmand consume
    this.mouthOpen = false;
    this.gourmandEnergy = 0; // absorbed damage stored
    this.gourmandMaxEnergy = 80; // max before full
    this.gourmandFull = false; // can't move when full
    this.gourmandProjectile = null; // { x, y, vx, vy, damage, timer }

    // Bozollok molt
    this.molting = false; // currently in molt leap
    this.moltHover = 0; // hover frames remaining
    this.moltDescending = false; // descending with claw attack
    this.moltCooldown = 0;
    this.moltHusk = null; // { x, y, timer } decomposing husk

    // Corvida blue jay form
    this.isJay = false;
    this.lastJumpPress = 0; // frame of last jump key down for double-tap detection
    this.corvidaJayPending = false;
    this.jayScale = 0.7; // smaller in jay form

    // Bojdo scale system
    this.bojdoScale = 1.0; // 1.0 = normal, grows/shrinks with K/L
    this.bojShrinkTimer = 0; // Boj assist shrink effect
    this.cyanoJayTimer = 0; // Cyano assist jay form effect
    this.studTortoiseTimer = 0; // Stud assist tortoise form effect
    this.stickerSlowTimer = 0; // Sticker assist slow effect

    // X-haust oil & ignite
    this.xhaustOilTank = 0; // current oil amount (fills from combos)
    this.xhaustMaxOil = 100; // tank capacity
    this.xhaustLeaking = false; // currently dripping oil
    this.xhaustOilPuddles = []; // { x, y, width } placed on ground
    this.xhaustFlames = []; // { x, y, timer, width } active fire bursts

    // Vortice tornado
    this.vorticeTornado = false; // is pull tornado active (H held)
    this.vorticePushing = false; // is push tornado active (J pressed)
    this.vorticePushTimer = 0; // how long push lasts
    this.vorticeTornadoParticles = []; // visual wind particles
    this.vorticePushCooldown = 0; // J push cooldown

    // CPU AI
    this.aiTimer = 0;
    this.aiAction = null;
    this.aiReactTime = 20 + Math.random() * 20;
    this.aiComboQueue = [];
  }

  get left() { return this.x - this.width / 2; }
  get right() { return this.x + this.width / 2; }
  get top() { return this.y - this.height; }
  get centerY() { return this.y - this.height / 2; }

  startAttack(type) {
    // Torrena cannot attack while in water phase
    if (this.waterPhase) return;

    // Clear stale buffer if too much time has passed since last input
    if (frameCount - this.lastInputFrame > this.comboWindowFrames) {
      this.inputBuffer = [];
    }

    // Always record the input
    this.inputBuffer.push(type);
    this.lastInputFrame = frameCount;
    // Keep only last 6 inputs to prevent unbounded growth
    if (this.inputBuffer.length > 6) this.inputBuffer.shift();

    // If currently busy, queue the attack (limit to 1 so mashing doesn't keep punching after release)
    if (this.state === 'attack' || this.state === 'hitstun' || this.state === 'blockstun' || this.state === 'launched') {
      if (this.queuedAttacks.length < 1) {
        this.queuedAttacks.push(type);
      }
      return;
    }
    this.executeAttack(type);
  }

  executeAttack(type) {
    // Check for combo match using the input buffer
    this.pendingCombo = null;
    const combos = characterCombos[this.char.name];
    if (combos && this.inputBuffer.length >= 3) {
      const last3 = this.inputBuffer.slice(-3);
      for (const combo of combos) {
        if (last3[0] === combo.sequence[0] && last3[1] === combo.sequence[1] && last3[2] === combo.sequence[2]) {
          this.pendingCombo = combo;
          this.inputBuffer = [];
          this.comboFlash = 20;
          this.comboNameDisplay = combo.name;
          this.comboNameTimer = 60;
          break;
        }
      }
    }

    this.state = 'attack';
    if (this.pendingCombo) {
      const base = attacks[type];
      this.currentAttack = {
        ...base,
        damage: base.damage * this.pendingCombo.damageMult,
        range: base.range + (this.pendingCombo.rangeBonus || 0),
        launch: this.pendingCombo.launch || base.launch,
        isCombo: true
      };
    } else {
      this.currentAttack = attacks[type];
    }
    this.attackFrame = 0;
    this.stateTimer = this.currentAttack.startup + this.currentAttack.active + this.currentAttack.recovery;
  }

  callAssist(opponent) {
    if (this.assistCooldown > 0 || !this.assist) return;
    this.assistCooldown = this.assist.cooldownTime;
    if (this.assist.isWeedthorn) {
      this.assistActive = {
        x: opponent.x, y: opponent.groundY, vx: 0, timer: 45, hit: false,
        isWeedthorn: true, eruptPhase: 0
      };
    } else if (this.assist.isAphid) {
      this.assistActive = {
        x: opponent.x + (Math.random() - 0.5) * 60, y: 0, vx: 0, vy: 6, timer: 120, hit: false,
        isAphid: true, targetX: opponent.x
      };
    } else if (this.assist.isWarper) {
      this.assistActive = {
        x: this.x - this.facing * 30, y: this.centerY, vx: -this.facing * 10, timer: 90, hit: false,
        isWarper: true, warped: false
      };
    } else if (this.assist.isFloat) {
      this.assistActive = {
        x: this.x + this.facing * 30, y: this.centerY, vx: this.facing * 5, vy: -8, timer: 90, hit: false,
        isFloat: true
      };
    } else if (this.assist.isSerpent) {
      this.assistActive = {
        x: this.x + this.facing * 30, y: this.centerY, vx: this.facing * 3, vy: 0, timer: 600,
        isSerpent: true, speed: 3.5, biteCooldown: 0
      };
    } else {
      this.assistActive = {
        x: this.x + this.facing * 30, y: this.centerY, vx: this.facing * 8, timer: 60, hit: false
      };
    }
  }

  drawWeedthorn(a) {
    const phase = a.eruptPhase;
    const fadeIn = Math.min(1, phase / 8);
    const fadeOut = a.timer < 10 ? a.timer / 10 : 1;
    const alpha = fadeIn * fadeOut;
    const thornHeight = Math.min(80, phase * 8);

    ctx.save();
    ctx.translate(a.x, a.y);
    ctx.globalAlpha = alpha;

    // Ground crack
    ctx.strokeStyle = '#2d8a4e';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(-15, 0);
    ctx.lineTo(15, 0);
    ctx.stroke();

    // Main thorn spike
    ctx.fillStyle = '#2d8a4e';
    ctx.beginPath();
    ctx.moveTo(-8, 0);
    ctx.lineTo(0, -thornHeight);
    ctx.lineTo(8, 0);
    ctx.closePath();
    ctx.fill();

    // Thorn tip highlight
    ctx.fillStyle = '#5ee87a';
    ctx.beginPath();
    ctx.moveTo(-4, -thornHeight * 0.3);
    ctx.lineTo(0, -thornHeight);
    ctx.lineTo(4, -thornHeight * 0.3);
    ctx.closePath();
    ctx.fill();

    // Side thorns
    if (thornHeight > 30) {
      ctx.fillStyle = '#2d8a4e';
      // Left barb
      ctx.beginPath();
      ctx.moveTo(-3, -thornHeight * 0.4);
      ctx.lineTo(-18, -thornHeight * 0.55);
      ctx.lineTo(-2, -thornHeight * 0.5);
      ctx.closePath();
      ctx.fill();
      // Right barb
      ctx.beginPath();
      ctx.moveTo(3, -thornHeight * 0.6);
      ctx.lineTo(18, -thornHeight * 0.75);
      ctx.lineTo(2, -thornHeight * 0.7);
      ctx.closePath();
      ctx.fill();
    }

    // Ground debris particles
    if (phase < 20) {
      ctx.fillStyle = '#5a3a1a';
      for (let i = 0; i < 4; i++) {
        const dx = (i - 1.5) * 12 + Math.sin(phase * 0.5 + i) * 5;
        const dy = -Math.abs(Math.sin(phase * 0.3 + i * 1.5)) * 20;
        ctx.fillRect(dx - 2, dy - 2, 4, 4);
      }
    }

    ctx.restore();
  }

  drawAssistProjectile(a) {
    if (a.isWeedthorn) {
      this.drawWeedthorn(a);
    } else if (a.isAphid) {
      ctx.translate(a.x, a.y);
      ctx.fillStyle = '#555';
      ctx.beginPath();
      ctx.ellipse(0, 0, 6, 4, 0, 0, Math.PI * 2);
      ctx.fill();
      const wingFlap = Math.sin(Date.now() * 0.05) * 0.5;
      ctx.fillStyle = 'rgba(200,200,200,0.6)';
      ctx.beginPath();
      ctx.ellipse(-5, -3, 5, 3, wingFlap, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(5, -3, 5, 3, -wingFlap, 0, Math.PI * 2);
      ctx.fill();
    } else if (a.isSerpent) {
      ctx.translate(a.x, a.y);
      ctx.strokeStyle = '#336633';
      ctx.lineWidth = 5;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(0, 0);
      for (let s = 1; s <= 5; s++) {
        const sx = -a.vx * s * 2.5 + Math.sin(Date.now() * 0.01 + s) * 4;
        const sy = -a.vy * s * 2.5 + Math.cos(Date.now() * 0.01 + s) * 4;
        ctx.lineTo(sx, sy);
      }
      ctx.stroke();
      ctx.fillStyle = '#44aa44';
      ctx.beginPath();
      ctx.arc(0, 0, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ff0';
      ctx.beginPath();
      ctx.arc(a.vx > 0 ? 3 : -3, -2, 1.5, 0, Math.PI * 2);
      ctx.fill();
    } else {
      ctx.translate(a.x, a.y);
      const aColor = this.assist.color;
      const pulse = Math.sin(Date.now() * 0.02) * 3;
      ctx.shadowColor = aColor;
      ctx.shadowBlur = 15;
      ctx.fillStyle = aColor;
      ctx.beginPath();
      ctx.arc(0, 0, 12 + pulse, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = this.assist.accent;
      ctx.beginPath();
      ctx.arc(0, 0, 6 + pulse * 0.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  // Check if a point hits this fighter or any of its Duplaire clones
  isHitAt(px, py, radiusX, radiusY) {
    if (Math.abs(px - this.x) < radiusX && Math.abs(py - this.centerY) < radiusY) return true;
    if (this.char.isDuplaire) {
      for (const clone of this.duplaireClones) {
        if (clone.active && Math.abs(px - clone.x) < radiusX && Math.abs(py - (clone.y - 25)) < radiusY) return true;
      }
    }
    return false;
  }

  takeDamage(dmg, attackData, attackerFacing, bypassBlock, hitPos) {
    // Torrena water phase: immune to all damage
    if (this.waterPhase) return false;

    // Clear queued attacks when hit
    this.queuedAttacks = [];

    // Check blocking (shadow step bypasses)
    const isBlocking = this.blocking && this.state !== 'attack' && !bypassBlock;
    if (isBlocking) {
      const blockDmg = Math.max(1, dmg * 0.15);
      if (this.char.isDuplaire && this.duplaireClones.filter(c => c.active).length > 0) {
        // Blocking hits the original, whole bar goes down
        const activeClones = this.duplaireClones.filter(c => c.active);
        const totalBodies = 1 + activeClones.length;
        const share = blockDmg / totalBodies;
        this.duplaireOrigHealth -= share;
        for (const clone of activeClones) clone.cloneHealth -= share;
        for (let i = this.duplaireClones.length - 1; i >= 0; i--) {
          if (this.duplaireClones[i].cloneHealth <= 0) this.duplaireClones.splice(i, 1);
        }
        this.health = this.duplaireOrigHealth;
        for (const c of this.duplaireClones) { if (c.active) this.health += c.cloneHealth; }
      } else {
        this.health -= blockDmg;
        if (this.char.isDuplaire) this.duplaireOrigHealth = this.health;
      }
      if (gameMode === 'practice') this.practiceRegenDelay = 60;
      this.state = 'blockstun';
      this.stateTimer = attackData.blockstun;
      this.vx = attackerFacing * 2;
      return false;
    }

    // Gourmand: absorb attack energy when mouth is open
    if (this.char.isGourmand && this.mouthOpen && !this.gourmandFull) {
      this.gourmandEnergy = Math.min(this.gourmandMaxEnergy, this.gourmandEnergy + dmg);
      this.health -= dmg / this.char.stats.defense;
      this.flashTimer = 4;
      if (this.health <= 0) this.health = 0;
      if (gameMode === 'practice') this.practiceRegenDelay = 60;
      this.hitEffect = { x: this.x, y: this.centerY - 10, timer: 8, type: 'small' };
      this.mouthOpen = false;
      // Become full if maxed out
      if (this.gourmandEnergy >= this.gourmandMaxEnergy) {
        this.gourmandFull = true;
      }
      return true;
    }

    const bojdoDefMult = this.char.isBojdo ? this.bojdoScale : 1;
    const bojShrinkDefMult = (this.bojShrinkTimer > 0 && !this.char.isBojdo) ? 0.3 : 1;
    const tortoiseMult = this.isTortoise ? 0.4 : 1; // 60% reduction in tortoise form
    let finalDmg = dmg * tortoiseMult / (this.char.stats.defense * bojdoDefMult * bojShrinkDefMult);

    // Snazz McJazz: 2x damage if interrupted during dance
    if (this.dancing) {
      finalDmg *= 2;
      this.dancing = false;
      this.danceTimer = 0;
    }

    // Armor: reduce damage, skip hitstun
    if (this.armorActive) {
      finalDmg *= 0.5;
      if (this.char.isDuplaire && this.duplaireClones.filter(c => c.active).length > 0 && hitPos) {
        const activeClones = this.duplaireClones.filter(c => c.active);
        let closestClone = null;
        let closestDist = Math.abs(hitPos.x - this.x);
        for (const clone of activeClones) {
          const d = Math.abs(hitPos.x - clone.x);
          if (d < closestDist) { closestDist = d; closestClone = clone; }
        }
        if (closestClone) {
          closestClone.cloneHealth -= finalDmg;
          if (closestClone.cloneHealth <= 0) {
            closestClone.cloneHealth = 0;
            this.duplaireClones.splice(this.duplaireClones.indexOf(closestClone), 1);
          }
        } else {
          const totalBodies = 1 + activeClones.length;
          const share = finalDmg / totalBodies;
          this.duplaireOrigHealth -= share;
          for (const clone of activeClones) clone.cloneHealth -= share;
          for (let i = this.duplaireClones.length - 1; i >= 0; i--) {
            if (this.duplaireClones[i].cloneHealth <= 0) this.duplaireClones.splice(i, 1);
          }
        }
        this.health = this.duplaireOrigHealth;
        for (const c of this.duplaireClones) { if (c.active) this.health += c.cloneHealth; }
      } else {
        this.health -= finalDmg;
        if (this.char.isDuplaire) this.duplaireOrigHealth = this.health;
      }
      this.flashTimer = 4;
      if (this.health <= 0) this.health = 0;
      if (gameMode === 'practice') this.practiceRegenDelay = 60;
      // No hitstun, just flash
      this.hitEffect = { x: this.x, y: this.centerY - 10, timer: 8, type: 'small' };
      return true;
    }

    // Phase: halve damage
    if (this.phaseTimer > 0) {
      finalDmg *= 0.5;
    }

    // Duplaire: route damage to correct body
    if (this.char.isDuplaire && this.duplaireClones.filter(c => c.active).length > 0 && hitPos) {
      const activeClones = this.duplaireClones.filter(c => c.active);
      let closestClone = null;
      let closestDist = Math.abs(hitPos.x - this.x);
      for (const clone of activeClones) {
        const d = Math.abs(hitPos.x - clone.x);
        if (d < closestDist) { closestDist = d; closestClone = clone; }
      }
      if (closestClone) {
        // Hit a clone: only that clone takes damage
        closestClone.cloneHealth -= finalDmg;
        if (closestClone.cloneHealth <= 0) {
          closestClone.cloneHealth = 0;
          this.duplaireClones.splice(this.duplaireClones.indexOf(closestClone), 1);
        }
      } else {
        // Hit the original: whole healthbar goes down (all bodies take equal share)
        const totalBodies = 1 + activeClones.length;
        const share = finalDmg / totalBodies;
        this.duplaireOrigHealth -= share;
        for (const clone of activeClones) {
          clone.cloneHealth -= share;
          if (clone.cloneHealth <= 0) clone.cloneHealth = 0;
        }
        // Remove dead clones
        for (let i = this.duplaireClones.length - 1; i >= 0; i--) {
          if (this.duplaireClones[i].cloneHealth <= 0) this.duplaireClones.splice(i, 1);
        }
      }
      // Recalculate total health
      this.health = this.duplaireOrigHealth;
      for (const clone of this.duplaireClones) {
        if (clone.active) this.health += clone.cloneHealth;
      }
    } else {
      this.health -= finalDmg;
      if (this.char.isDuplaire) this.duplaireOrigHealth = this.health;
    }

    this.flashTimer = 8;
    shakeTimer = 6;
    shakeIntensity = Math.min(finalDmg * 0.5, 8);

    if (attackData.launch) {
      this.state = 'launched';
      this.vy = -10;
      this.vx = attackerFacing * 4;
      this.grounded = false;
      this.stateTimer = 40;
    } else {
      this.state = 'hitstun';
      this.stateTimer = attackData.hitstun;
      this.vx = attackerFacing * (attackData.knockbackForce != null ? attackData.knockbackForce : 3);
    }

    // Hit effect
    this.hitEffect = {
      x: this.x - attackerFacing * 10,
      y: this.centerY - 10,
      timer: 10,
      type: attackData.launch ? 'big' : 'small'
    };

    if (this.health <= 0) this.health = 0;
    // Infinite health in practice mode for the bag
    if (gameMode === 'practice') this.practiceRegenDelay = 60;
    return true;
  }

  update(opponent, keys) {
    // Practice mode health regen
    if (gameMode === 'practice') {
      if (this.practiceRegenDelay > 0) {
        this.practiceRegenDelay--;
      } else if (this.health < this.maxHealth) {
        this.health = Math.min(this.maxHealth, this.health + 2);
        if (this.char.isDuplaire) {
          const totalBodies = 1 + this.duplaireClones.filter(c => c.active).length;
          const sectionMax = this.maxHealth / totalBodies;
          this.duplaireOrigHealth = Math.min(sectionMax, this.duplaireOrigHealth + 2);
          for (const c of this.duplaireClones) {
            if (c.active) c.cloneHealth = Math.min(c.cloneMaxHealth, c.cloneHealth + 2);
          }
        }
      }
      if (this.health <= 0) this.health = 1; // never die in practice
    }

    // Timers
    if (this.flashTimer > 0) this.flashTimer--;
    if (this.assistCooldown > 0) this.assistCooldown--;
    if (this.comboTimer > 0) { this.comboTimer--; if (this.comboTimer === 0) this.comboCount = 0; }
    if (this.comboFlash > 0) this.comboFlash--;
    if (this.comboNameTimer > 0) this.comboNameTimer--;

    // Status effect timers
    if (this.frozenTimer > 0) {
      this.frozenTimer--;
      // Frozen: can't do anything
      return;
    }
    if (this.slowTimer > 0) this.slowTimer--;
    if (this.armorTimer > 0) { this.armorTimer--; if (this.armorTimer <= 0) this.armorActive = false; }
    if (this.phaseTimer > 0) this.phaseTimer--;
    if (this.bojShrinkTimer > 0) this.bojShrinkTimer--;
    if (this.cyanoJayTimer > 0) {
      this.cyanoJayTimer--;
      if (this.cyanoJayTimer <= 0) this.isJay = false;
    }
    if (this.studTortoiseTimer > 0) {
      this.studTortoiseTimer--;
      if (this.studTortoiseTimer <= 0) this.isTortoise = false;
    }
    if (this.stickerSlowTimer > 0) this.stickerSlowTimer--;

    // Teleport ghost fade
    if (this.teleportGhost) {
      this.teleportGhost.timer--;
      if (this.teleportGhost.timer <= 0) this.teleportGhost = null;
    }

    // DOT processing
    if (this.dotEffect) {
      this.dotEffect.tickTimer++;
      if (this.dotEffect.tickTimer >= this.dotEffect.tickInterval) {
        this.dotEffect.tickTimer = 0;
        const dotDmg = this.dotEffect.tickDamage;
        if (this.char.isDuplaire && this.duplaireClones.filter(c => c.active).length > 0) {
          const activeClones = this.duplaireClones.filter(c => c.active);
          const totalBodies = 1 + activeClones.length;
          const share = dotDmg / totalBodies;
          this.duplaireOrigHealth -= share;
          for (const c of activeClones) c.cloneHealth -= share;
          for (let i = this.duplaireClones.length - 1; i >= 0; i--) {
            if (this.duplaireClones[i].cloneHealth <= 0) this.duplaireClones.splice(i, 1);
          }
          this.health = this.duplaireOrigHealth;
          for (const c of this.duplaireClones) { if (c.active) this.health += c.cloneHealth; }
        } else {
          this.health -= dotDmg;
          if (this.char.isDuplaire) this.duplaireOrigHealth = this.health;
        }
        this.flashTimer = 4;
        this.dotEffect.ticksRemaining--;
        if (this.health <= 0) this.health = 0;
        if (gameMode === 'practice') this.practiceRegenDelay = 60;
        if (this.dotEffect.ticksRemaining <= 0) this.dotEffect = null;
      }
    }

    // Chain hits processing
    if (this.chainHits) {
      this.chainHits.timer++;
      if (this.chainHits.timer >= this.chainHits.interval) {
        this.chainHits.timer = 0;
        const chainDmg = this.chainHits.damage;
        if (this.char.isDuplaire && this.duplaireClones.filter(c => c.active).length > 0) {
          const activeClones = this.duplaireClones.filter(c => c.active);
          const totalBodies = 1 + activeClones.length;
          const share = chainDmg / totalBodies;
          this.duplaireOrigHealth -= share;
          for (const c of activeClones) c.cloneHealth -= share;
          for (let i = this.duplaireClones.length - 1; i >= 0; i--) {
            if (this.duplaireClones[i].cloneHealth <= 0) this.duplaireClones.splice(i, 1);
          }
          this.health = this.duplaireOrigHealth;
          for (const c of this.duplaireClones) { if (c.active) this.health += c.cloneHealth; }
        } else {
          this.health -= chainDmg;
          if (this.char.isDuplaire) this.duplaireOrigHealth = this.health;
        }
        this.flashTimer = 3;
        this.chainHits.remaining--;
        if (this.health <= 0) this.health = 0;
        if (gameMode === 'practice') this.practiceRegenDelay = 60;
        if (this.chainHits.remaining <= 0) this.chainHits = null;
      }
    }

    // Hit effect
    if (this.hitEffect) {
      this.hitEffect.timer--;
      if (this.hitEffect.timer <= 0) this.hitEffect = null;
    }

    // Assist projectile
    if (this.assistActive) {
      const a = this.assistActive;
      a.timer--;
      if (a.isWeedthorn) {
        a.eruptPhase++;
        if (!a.hit && a.eruptPhase > 5 && a.eruptPhase < 30 && Math.abs(a.x - opponent.x) < 45 && opponent.y > a.y - 90) {
          const diffMult = (!this.isPlayer && cpuDifficulty) ? cpuDifficulty.damageMult : 1;
          const dmg = this.assist.damage * this.char.stats.power * diffMult;
          opponent.takeDamage(dmg, { hitstun: 20, blockstun: 10, launch: true }, this.facing, false, { x: a.x, y: a.y });
          a.hit = true;
        }
        if (a.timer <= 0) this.assistActive = null;
      } else if (a.isAphid) {
        // Fly down toward opponent
        const dx = opponent.x - a.x;
        a.vx = dx * 0.05;
        a.x += a.vx;
        a.y += a.vy;
        if (!a.hit && opponent.isHitAt(a.x, a.y, 35, 40)) {
          const diffMult = (!this.isPlayer && cpuDifficulty) ? cpuDifficulty.damageMult : 1;
          const dmg = this.assist.damage * this.char.stats.power * diffMult;
          opponent.takeDamage(dmg, { hitstun: 18, blockstun: 8, launch: false }, this.facing, false, { x: a.x, y: a.y });
          a.hit = true;
        }
        if (a.timer <= 0 || a.y > 500) this.assistActive = null;
      } else if (a.isWarper) {
        a.x += a.vx;
        if (!a.warped && (a.x < 0 || a.x > 960)) {
          // Warp to opposite side and keep moving same direction (Pac-Man style)
          a.x = a.x < 0 ? 960 : 0;
          a.warped = true;
        }
        if (!a.hit && opponent.isHitAt(a.x, a.y, 40, 60)) {
          const diffMult = (!this.isPlayer && cpuDifficulty) ? cpuDifficulty.damageMult : 1;
          const dmg = this.assist.damage * this.char.stats.power * diffMult;
          opponent.takeDamage(dmg, { hitstun: 16, blockstun: 8, launch: false }, this.facing, false, { x: a.x, y: a.y });
          a.hit = true;
        }
        if (a.timer <= 0 || (a.warped && (a.x < 0 || a.x > 960))) this.assistActive = null;
      } else if (a.isFloat) {
        a.x += a.vx;
        a.vy += 0.25; // gravity
        a.y += a.vy;
        if (!a.hit && opponent.isHitAt(a.x, a.y, 40, 60)) {
          const diffMult = (!this.isPlayer && cpuDifficulty) ? cpuDifficulty.damageMult : 1;
          const dmg = this.assist.damage * this.char.stats.power * diffMult;
          opponent.takeDamage(dmg, { hitstun: 16, blockstun: 8, launch: false }, this.facing, false, { x: a.x, y: a.y });
          a.hit = true;
        }
        if (a.timer <= 0 || a.y > 500 || a.x < 0 || a.x > 960) this.assistActive = null;
      } else if (a.isSerpent) {
        // Homing: steer toward opponent
        const dx = opponent.x - a.x;
        const dy = opponent.centerY - a.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        a.vx += (dx / dist) * 0.3;
        a.vy += (dy / dist) * 0.3;
        const spd = Math.sqrt(a.vx * a.vx + a.vy * a.vy);
        if (spd > a.speed) { a.vx *= a.speed / spd; a.vy *= a.speed / spd; }
        a.x += a.vx;
        a.y += a.vy;
        if (a.biteCooldown > 0) a.biteCooldown--;
        if (a.biteCooldown <= 0 && opponent.isHitAt(a.x, a.y, 30, 30)) {
          const diffMult = (!this.isPlayer && cpuDifficulty) ? cpuDifficulty.damageMult : 1;
          const dmg = this.assist.damage * this.char.stats.power * diffMult;
          opponent.takeDamage(dmg, { hitstun: 20, blockstun: 10, launch: false }, this.facing, false, { x: a.x, y: a.y });
          a.biteCooldown = 60; // 1 second between bites
        }
        if (a.timer <= 0) this.assistActive = null;
      } else {
        // Standard projectile (also handles Boj, Jazz, Cyano, Stud, Sticker)
        a.x += a.vx;
        if (!a.hit && opponent.isHitAt(a.x, a.y, 40, 60)) {
          const diffMult = (!this.isPlayer && cpuDifficulty) ? cpuDifficulty.damageMult : 1;
          const dmg = this.assist.damage * this.char.stats.power * diffMult;
          opponent.takeDamage(dmg, { hitstun: 16, blockstun: 8, launch: false }, this.facing, false, { x: a.x, y: a.y });
          a.hit = true;
          // On-hit effects
          if (this.assist.isBoj) {
            opponent.bojShrinkTimer = 360;
          } else if (this.assist.isJazz) {
            this.health = Math.min(this.maxHealth, this.health + 20);
          } else if (this.assist.isCyano) {
            opponent.cyanoJayTimer = 480;
            opponent.isJay = true;
          } else if (this.assist.isStud) {
            opponent.studTortoiseTimer = 480;
            opponent.isTortoise = true;
          } else if (this.assist.isSticker) {
            opponent.stickerSlowTimer = 480;
          }
        }
        if (a.timer <= 0 || a.x < 0 || a.x > 960) this.assistActive = null;
      }
    }

    // Animation
    this.animTimer++;
    if (this.animTimer > 8) { this.animTimer = 0; this.animFrame = (this.animFrame + 1) % 4; }

    // Gravity
    if (!this.grounded) {
      if (this.isJay) {
        // Corvida jay form: no gravity, free flight
        this.vy *= 0.85; // dampen vertical velocity
        this.y += this.vy;
        // Clamp to stage bounds (don't fly off screen, but can touch ground to revert)
        if (this.y >= this.groundY) {
          this.y = this.groundY;
          this.vy = 0;
          this.grounded = true;
          this.isJay = false;
        }
        if (this.y < 40) { this.y = 40; this.vy = 0; }
      } else if (this.molting) {
        // Bozollok molt: reduced gravity during ascent, no gravity during hover
        if (this.moltHover > 0 && this.vy >= -2) {
          // Hovering at apex - just dampen
          this.vy *= 0.7;
        } else if (this.moltHover > 0) {
          // Still ascending - light gravity only
          this.vy += 0.2;
        } else {
          // Descending - normal gravity
          this.vy += 0.5;
        }
        this.y += this.vy;
        // Ceiling clamp
        if (this.y < 60) { this.y = 60; this.vy = 0; }
      } else {
        this.vy += 0.5;
        this.y += this.vy;
        if (this.y >= this.groundY) {
          this.y = this.groundY;
          this.vy = 0;
          this.grounded = true;
          if (this.state === 'launched') {
            this.state = 'idle';
            this.stateTimer = 0;
          }
        }
      }
    }

    // Apply velocity with friction
    this.x += this.vx;
    this.vx *= 0.85;

    // Boundaries
    if (this.char.isTelatrine) {
      if (this.x < 20) { this.x = 940; this.teleportGhost = { x: 20, y: this.y, timer: 12 }; }
      else if (this.x > 940) { this.x = 20; this.teleportGhost = { x: 940, y: this.y, timer: 12 }; }
    } else {
      if (this.x < 40) this.x = 40;
      if (this.x > 920) this.x = 920;
    }

    // Face opponent
    if (this.state !== 'attack' && this.state !== 'hitstun' && this.state !== 'blockstun') {
      this.facing = opponent.x > this.x ? 1 : -1;
    }

    // State timer
    if (this.stateTimer > 0) {
      this.stateTimer--;
      if (this.stateTimer === 0 && (this.state === 'attack' || this.state === 'hitstun' || this.state === 'blockstun')) {
        this.state = 'idle';
        this.currentAttack = null;
        // Execute next queued attack if one was buffered
        if (this.queuedAttacks.length > 0) {
          const queued = this.queuedAttacks.shift();
          this.executeAttack(queued);
        }
      }
    }

    // Gourmand: full state prevents movement, projectile update
    if (this.gourmandFull) {
      this.vx = 0;
      this.state = 'idle';
    }
    if (this.gourmandProjectile) {
      const gp = this.gourmandProjectile;
      gp.x += gp.vx;
      gp.y += gp.vy;
      gp.timer--;
      // Hit detection
      if (!gp.hit && opponent.isHitAt(gp.x, gp.y, 40, 50)) {
        gp.hit = true;
        const diffMult = (!this.isPlayer && cpuDifficulty) ? cpuDifficulty.damageMult : 1;
        opponent.takeDamage(gp.damage * diffMult, { hitstun: 20, blockstun: 12, launch: gp.damage > 40, knockbackForce: 6 }, gp.vx > 0 ? 1 : -1, false, { x: gp.x, y: gp.y });
      }
      if (gp.timer <= 0 || gp.x < -20 || gp.x > 980 || gp.hit) {
        this.gourmandProjectile = null;
      }
    }

    // Matador dash-slash update
    if (this.matadorDashCooldown > 0) this.matadorDashCooldown--;
    if (this.matadorDashing) {
      this.matadorDashTimer++;
      // Lerp position from start to end
      const t = Math.min(1, this.matadorDashTimer / this.matadorDashFrames);
      this.x = this.matadorDashStartX + (this.matadorDashEndX - this.matadorDashStartX) * t;
      this.vx = 0;
      this.state = 'idle';
      // Slash opponent when crossing their position
      if (!this.matadorDashHit) {
        const crossedX = this.facing === 1
          ? (this.matadorDashStartX <= opponent.x && this.x >= opponent.x - 30)
          : (this.matadorDashStartX >= opponent.x && this.x <= opponent.x + 30);
        if (crossedX && Math.abs(this.centerY - opponent.centerY) < 70) {
          const diffMult = (!this.isPlayer && cpuDifficulty) ? cpuDifficulty.damageMult : 1;
          const dmg = 18 * this.char.stats.power * diffMult;
          opponent.takeDamage(dmg, { hitstun: 18, blockstun: 10, launch: false, knockbackForce: 0 }, this.facing, false, { x: opponent.x, y: this.centerY });
          this.matadorDashHit = true;
        }
      }
      // End dash when lerp completes
      if (t >= 1) {
        this.matadorDashing = false;
        this.matadorDashCooldown = 90;
        this.vx = 0;
        this.facing = opponent.x > this.x ? 1 : -1;
      }
    }
    // Buck firework spray update
    if (this.char.isBuck) {
      if (this.buckFireCooldown > 0) this.buckFireCooldown--;
      if (this.buckFiring) {
        this.buckFireTimer--;
        // Aim drifts between straight up (PI/2) and straight forward (0)
        // Use a sine wave so it sweeps smoothly
        const progress = 1 - (this.buckFireTimer / 360);
        const aimAngle = (Math.sin(progress * Math.PI * 4) * 0.5 + 0.5) * (Math.PI / 2); // 0 to PI/2
        // Spawn fireworks rapidly (every 3 frames)
        if (this.buckFireTimer % 3 === 0) {
          const colors = ['#ff0000', '#ffffff', '#0044cc'];
          const spd = 8 + Math.random() * 3;
          const spread = (Math.random() - 0.5) * 0.3;
          const angle = aimAngle + spread;
          this.buckFireworks.push({
            x: this.x + this.facing * 15,
            y: this.centerY - 15,
            vx: this.facing * Math.cos(angle) * spd,
            vy: -Math.sin(angle) * spd,
            color: colors[Math.floor(Math.random() * 3)],
            timer: 30 + Math.floor(Math.random() * 15),
            trail: []
          });
        }
        if (this.buckFireTimer <= 0) {
          this.buckFiring = false;
          this.buckFireCooldown = 480; // 8 second cooldown
        }
      }
      // Update firework projectiles
      for (let i = this.buckFireworks.length - 1; i >= 0; i--) {
        const fw = this.buckFireworks[i];
        fw.trail.push({ x: fw.x, y: fw.y, timer: 8 });
        fw.x += fw.vx;
        fw.vy += 0.15; // gravity
        fw.y += fw.vy;
        fw.timer--;
        // Remove old trail points
        for (let t = fw.trail.length - 1; t >= 0; t--) {
          fw.trail[t].timer--;
          if (fw.trail[t].timer <= 0) fw.trail.splice(t, 1);
        }
        // Check hit on opponent
        if (opponent) {
          const dx = fw.x - opponent.x;
          const dy = fw.y - (opponent.y - 30);
          if (Math.abs(dx) < 25 && Math.abs(dy) < 35) {
            // Explode on hit
            this.buckFireTimer = Math.max(this.buckFireTimer, 1); // keep firing
            const colors = ['#ff0000', '#ffffff', '#0044cc', '#ff4444', '#ffaa00'];
            const phrases = ['LIBERTY!', 'FREEDOM!', "'MERICA!", 'USA! USA!', 'JUSTICE!', 'GLORY!', 'BOOM!', 'YEEHAW!'];
            for (let e = 0; e < 12; e++) {
              const ea = Math.random() * Math.PI * 2;
              const es = 2 + Math.random() * 4;
              this.buckExplosions.push({
                x: fw.x, y: fw.y,
                vx: Math.cos(ea) * es, vy: Math.sin(ea) * es,
                color: colors[Math.floor(Math.random() * colors.length)],
                timer: 15 + Math.floor(Math.random() * 10)
              });
            }
            // Add text explosion
            this.buckExplosions.push({
              x: fw.x, y: fw.y, vx: 0, vy: -1.5,
              color: colors[Math.floor(Math.random() * colors.length)],
              timer: 30,
              text: phrases[Math.floor(Math.random() * phrases.length)]
            });
            const diffMult = (!this.isPlayer && cpuDifficulty) ? cpuDifficulty.damageMult : 1;
            opponent.takeDamage(2 * diffMult, { hitstun: 4, blockstun: 2, height: 'mid', launch: false, name: 'Firework' }, this.facing, false, { x: fw.x, y: fw.y });
            this.buckFireworks.splice(i, 1);
            continue;
          }
        }
        // Explode when timer runs out or goes off screen
        if (fw.timer <= 0 || fw.x < 0 || fw.x > 960 || fw.y > 540) {
          // Air explosion
          const colors = ['#ff0000', '#ffffff', '#0044cc', '#ff4444', '#ffaa00'];
          const phrases = ['LIBERTY!', 'FREEDOM!', "'MERICA!", 'USA! USA!', 'JUSTICE!', 'GLORY!', 'BOOM!', 'YEEHAW!'];
          for (let e = 0; e < 8; e++) {
            const ea = Math.random() * Math.PI * 2;
            const es = 1 + Math.random() * 3;
            this.buckExplosions.push({
              x: fw.x, y: fw.y,
              vx: Math.cos(ea) * es, vy: Math.sin(ea) * es,
              color: colors[Math.floor(Math.random() * colors.length)],
              timer: 12 + Math.floor(Math.random() * 8)
            });
          }
          // Add text explosion
          this.buckExplosions.push({
            x: fw.x, y: fw.y, vx: 0, vy: -1,
            color: colors[Math.floor(Math.random() * colors.length)],
            timer: 25,
            text: phrases[Math.floor(Math.random() * phrases.length)]
          });
          this.buckFireworks.splice(i, 1);
        }
      }
      // Update explosion particles
      for (let i = this.buckExplosions.length - 1; i >= 0; i--) {
        const e = this.buckExplosions[i];
        e.x += e.vx;
        e.y += e.vy;
        e.vy += 0.1;
        e.vx *= 0.97;
        e.timer--;
        if (e.timer <= 0) this.buckExplosions.splice(i, 1);
      }
    }

    // Vortice tornado update
    if (this.char.isVortice) {
      if (this.vorticePushCooldown > 0) this.vorticePushCooldown--;
      // Push tornado timer
      if (this.vorticePushing) {
        this.vorticePushTimer--;
        if (this.vorticePushTimer <= 0) this.vorticePushing = false;
      }
      const tornadoActive = this.vorticeTornado || this.vorticePushing;
      if (tornadoActive && opponent) {
        const dx = this.x - opponent.x;
        const dist = Math.abs(dx);
        if (this.vorticePushing) {
          // Push opponent away — stronger the farther they get (inverse of pull)
          if (dist < 250) {
            const pushStrength = 1.5 * (dist / 250);
            opponent.vx += (dx > 0 ? -pushStrength : pushStrength);
          }
        } else {
          // Pull opponent closer (not Duplaire clones)
          if (dist > 30 && dist < 250) {
            const pullStrength = 1.5 * (1 - dist / 250);
            opponent.vx += (dx > 0 ? pullStrength : -pullStrength);
          }
        }
        // Spawn wind particles spiraling around player
        if (frameCount % 2 === 0) {
          const angle = Math.random() * Math.PI * 2;
          const startR = this.vorticePushing ? 10 + Math.random() * 20 : 40 + Math.random() * 60;
          this.vorticeTornadoParticles.push({
            x: this.x + Math.cos(angle) * startR,
            y: this.y - 20 - Math.random() * 70,
            angle: angle,
            r: startR,
            speed: 0.08 + Math.random() * 0.04,
            timer: 30 + Math.floor(Math.random() * 20),
            size: 2 + Math.random() * 3,
            pushing: this.vorticePushing
          });
        }
      }
      // Update tornado particles
      for (let i = this.vorticeTornadoParticles.length - 1; i >= 0; i--) {
        const p = this.vorticeTornadoParticles[i];
        p.angle += p.speed;
        if (p.pushing) {
          p.r += 1.2; // spiral outward
        } else {
          p.r -= 0.5; // spiral inward
        }
        p.y -= 0.5; // drift upward
        p.x = this.x + Math.cos(p.angle) * p.r;
        p.timer--;
        if (p.pushing) {
          if (p.timer <= 0 || p.r > 150) this.vorticeTornadoParticles.splice(i, 1);
        } else {
          if (p.timer <= 0 || p.r <= 5) this.vorticeTornadoParticles.splice(i, 1);
        }
      }
    }

    // X-haust oil & fire update
    if (this.char.isXhaust) {
      // Leak oil trail while L held and moving
      if (this.xhaustLeaking && this.xhaustOilTank > 0) {
        // Drop oil every 4 frames
        if (frameCount % 4 === 0) {
          const drainAmount = 2;
          this.xhaustOilTank = Math.max(0, this.xhaustOilTank - drainAmount);
          // Check if there's already a puddle nearby to extend
          let merged = false;
          for (const p of this.xhaustOilPuddles) {
            if (Math.abs(p.x - this.x) < p.width / 2 + 15) {
              // Extend existing puddle
              const left = Math.min(p.x - p.width / 2, this.x - 10);
              const right = Math.max(p.x + p.width / 2, this.x + 10);
              p.x = (left + right) / 2;
              p.width = right - left;
              merged = true;
              break;
            }
          }
          if (!merged) {
            this.xhaustOilPuddles.push({ x: this.x, y: this.groundY, width: 20 });
          }
        }
      }
      // Update flames & damage opponent
      for (let i = this.xhaustFlames.length - 1; i >= 0; i--) {
        const f = this.xhaustFlames[i];
        f.timer--;
        if (f.timer <= 0) { this.xhaustFlames.splice(i, 1); continue; }
        // Damage opponent if standing on fire
        if (opponent && f.timer % 10 === 0) {
          const oppDist = Math.abs(opponent.x - f.x);
          if (oppDist < f.width / 2 + 15 && opponent.grounded) {
            const diffMult = (!this.isPlayer && cpuDifficulty) ? cpuDifficulty.damageMult : 1;
            opponent.takeDamage(5 * diffMult, { hitstun: 8, blockstun: 4, height: 'low', launch: false, name: 'Oil Fire' }, this.facing, false, { x: opponent.x, y: opponent.y });
          }
        }
      }
    }

    // Exor soul drain update
    if (this.char.isExor) {
      if (this.exorDrainCooldown > 0) this.exorDrainCooldown--;
      if (this.exorDraining && this.exorDrainTarget) {
        this.exorDrainTimer--;
        const target = this.exorDrainTarget;
        const dist = Math.abs(this.x - target.x);
        // Break drain if target gets too far
        if (dist > 200) {
          this.exorDraining = false;
          this.exorDrainTarget = null;
          this.exorDrainCooldown = 180;
        } else {
          // Drain HP: steal from target, give to self
          const drainRate = 0.4;
          target.health -= drainRate;
          if (target.health <= 0) target.health = 0;
          this.health = Math.min(this.maxHealth, this.health + drainRate);
          // Keep target slowed while draining
          target.slowTimer = Math.max(target.slowTimer, 10);
          // Spawn soul particles
          if (Math.random() < 0.3) {
            this.exorSoulParticles.push({
              x: target.x + (Math.random() - 0.5) * 30,
              y: target.centerY - 10 + (Math.random() - 0.5) * 30,
              tx: this.x,
              ty: this.centerY - 10,
              t: 0,
              speed: 0.03 + Math.random() * 0.02,
              life: 1
            });
          }
        }
        if (this.exorDrainTimer <= 0) {
          this.exorDraining = false;
          this.exorDrainTarget = null;
          this.exorDrainCooldown = 240; // 4 second cooldown
        }
      }
      // Update soul particles
      for (let i = this.exorSoulParticles.length - 1; i >= 0; i--) {
        const p = this.exorSoulParticles[i];
        p.t += p.speed;
        if (p.t >= 1) {
          this.exorSoulParticles.splice(i, 1);
        }
      }
    }

    // Backtrack: record history and update cooldown
    if (this.char.isBacktrack) {
      if (this.btRewindCooldown > 0) this.btRewindCooldown--;
      if (this.btRewindEffect > 0) this.btRewindEffect--;
      // Record snapshot every frame using ring buffer (O(1) instead of shift)
      this.btHistory[this.btHistoryIdx] = {
        x: this.x, y: this.y, health: this.health,
        opp: opponent ? { x: opponent.x, y: opponent.y, health: opponent.health } : null
      };
      this.btHistoryIdx = (this.btHistoryIdx + 1) % this.btMaxHistory;
      if (this.btHistoryLen < this.btMaxHistory) this.btHistoryLen++;
    }

    // Killa Watt zap update
    if (this.char.isKillawatt) {
      if (this.kwZapCooldown > 0) this.kwZapCooldown--;
      if (this.kwZapEffect) {
        this.kwZapEffect.timer--;
        // Regenerate bolt paths for crackling effect
        if (this.kwZapEffect.timer % 3 === 0) {
          for (let b = 0; b < this.kwZapEffect.bolts.length; b++) {
            const bolt = this.kwZapEffect.bolts[b];
            const sx = bolt[0].x;
            const sy = bolt[0].y;
            const tx = bolt[bolt.length - 1].x;
            const ty = bolt[bolt.length - 1].y;
            for (let s = 1; s < bolt.length - 1; s++) {
              const t = s / (bolt.length - 1);
              bolt[s].x = sx + (tx - sx) * t + (Math.random() - 0.5) * 30;
              bolt[s].y = sy + (ty - sy) * t + (Math.random() - 0.5) * 20;
            }
          }
        }
        if (this.kwZapEffect.timer <= 0) this.kwZapEffect = null;
      }
    }
    // Stun vibration from Killa Watt zap
    if (this.kwStunTimer > 0) this.kwStunTimer--;

    // Matador roses: spawn when walking
    if (this.char.isMatador && this.state === 'walk' && Math.random() < 0.08) {
      const side = Math.random() < 0.5 ? -1 : 1; // from left or right
      this.matadorRoses.push({
        x: side < 0 ? this.x - 80 - Math.random() * 60 : this.x + 80 + Math.random() * 60,
        y: this.y - 100 - Math.random() * 80,
        vx: side * -(3 + Math.random() * 4),
        vy: 2 + Math.random() * 3,
        rot: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.2,
        timer: 60 + Math.floor(Math.random() * 30),
        landed: false,
        groundY: this.groundY + Math.random() * 5
      });
    }
    // Update rose particles
    for (let i = this.matadorRoses.length - 1; i >= 0; i--) {
      const r = this.matadorRoses[i];
      if (!r.landed) {
        r.x += r.vx;
        r.y += r.vy;
        r.vy += 0.15;
        r.rot += r.rotSpeed;
        if (r.y >= r.groundY) {
          r.y = r.groundY;
          r.landed = true;
          r.vx = 0;
          r.vy = 0;
        }
      }
      r.timer--;
      if (r.timer <= 0) this.matadorRoses.splice(i, 1);
    }

    // Paletap shockwave and slam update
    if (this.paletapShockCooldown > 0) this.paletapShockCooldown--;
    if (this.paletapSlamming) {
      this.paletapSlamFrame++;
      if (this.paletapSlamFrame >= 20) {
        // Slam complete — create shockwave
        this.paletapSlamming = false;
        this.paletapSlamFrame = 0;
        this.paletapShockwave = {
          x: this.x + this.facing * 30, y: this.groundY,
          vx: this.facing * 6, timer: 0, maxTimer: 90, hit: false
        };
        this.paletapShockCooldown = 120;
      }
    }
    if (this.paletapShockwave) {
      const sw = this.paletapShockwave;
      sw.x += sw.vx;
      sw.timer++;
      // Shockwave height: peaks at ~90px (player height) and decays
      const progress = sw.timer / sw.maxTimer;
      const swHeight = 90 * Math.max(0, 1 - progress * 0.5);
      // Hit detection: opponent must be grounded or low enough
      if (!sw.hit && opponent.isHitAt(sw.x, sw.y, 35, 70) && opponent.grounded && !opponent.crouching) {
        // Opponent is standing on ground, gets hit
        sw.hit = true;
        const diffMult = (!this.isPlayer && cpuDifficulty) ? cpuDifficulty.damageMult : 1;
        opponent.takeDamage(20 * this.char.stats.power * diffMult, { hitstun: 15, blockstun: 10, launch: false, knockbackForce: 5 }, sw.vx > 0 ? 1 : -1, false, { x: sw.x, y: sw.y });
      }
      // Also hit airborne opponents if they're low enough (not jumping high enough)
      if (!sw.hit && opponent.isHitAt(sw.x, sw.y, 35, 70) && !opponent.grounded && opponent.y > this.groundY - swHeight) {
        sw.hit = true;
        const diffMult = (!this.isPlayer && cpuDifficulty) ? cpuDifficulty.damageMult : 1;
        opponent.takeDamage(20 * this.char.stats.power * diffMult, { hitstun: 15, blockstun: 10, launch: false, knockbackForce: 5 }, sw.vx > 0 ? 1 : -1, false, { x: sw.x, y: sw.y });
      }
      if (sw.timer >= sw.maxTimer || sw.x < -20 || sw.x > 980) {
        this.paletapShockwave = null;
      }
    }

    // Bozollok molt cooldown and husk decomposition
    if (this.moltCooldown > 0) this.moltCooldown--;
    if (this.moltHusk) {
      this.moltHusk.timer--;
      if (this.moltHusk.timer <= 0) this.moltHusk = null;
    }
    // Bozollok molt hover and descent
    if (this.molting) {
      if (this.moltHover > 0) {
        this.moltHover--;
        if (this.moltHover <= 0) {
          this.moltDescending = true;
          this.vy = 6; // start descending fast
        }
      } else if (this.moltDescending) {
        // Attack opponents near landing point during descent
        if (opponent.isHitAt(this.x, this.y, 60, 45)) {
          const diffMult = (!this.isPlayer && cpuDifficulty) ? cpuDifficulty.damageMult : 1;
          const dmg = 30 * this.char.stats.power * diffMult;
          opponent.takeDamage(dmg, { damage: 30, knockback: 10, hitstun: 20, type: 'mid', startup: 0, active: 1, recovery: 0, range: 50 }, this.facing, false, { x: this.x, y: this.y });
          this.moltDescending = false; // only hit once per descent
        }
      }
      if (this.y >= this.groundY) {
        this.y = this.groundY;
        this.vy = 0;
        this.grounded = true;
        this.molting = false;
        this.moltDescending = false;
        this.moltHover = 0;
      }
    }

    // Codemax swap cooldown and glitch effect
    if (this.swapCooldown > 0) this.swapCooldown--;
    if (this.glitchTimer > 0) this.glitchTimer--;

    // Haystack explosion update
    if (this.exploding) {
      this.reformTimer--;
      if (this.reformTimer <= 0) {
        this.exploding = false;
      }
    }
    // Haystack projectile update
    for (let i = this.haystackProjectiles.length - 1; i >= 0; i--) {
      const p = this.haystackProjectiles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.15; // gravity
      p.timer--;
      if (!p.hit && opponent.isHitAt(p.x, p.y, 30, 40)) {
        const diffMult = (!this.isPlayer && cpuDifficulty) ? cpuDifficulty.damageMult : 1;
        const dmg = (p.type === 'sword' ? 18 : 8) * this.char.stats.power * diffMult;
        opponent.takeDamage(dmg, { hitstun: p.type === 'sword' ? 20 : 10, blockstun: 6, launch: false }, this.facing, false, { x: p.x, y: p.y });
        p.hit = true;
      }
      if (p.timer <= 0 || p.x < 0 || p.x > 960 || p.y > 500) {
        this.haystackProjectiles.splice(i, 1);
      }
    }
    // Hay particles update
    for (let i = this.hayParticles.length - 1; i >= 0; i--) {
      const hp = this.hayParticles[i];
      hp.x += hp.vx;
      hp.y += hp.vy;
      hp.vy += 0.1;
      hp.vx *= 0.98;
      hp.timer--;
      if (hp.timer <= 0) this.hayParticles.splice(i, 1);
    }

    // Duplaire clone update
    if (this.char.isDuplaire) {
      // Remove dead clones (cloneHealth <= 0)
      for (let ci = this.duplaireClones.length - 1; ci >= 0; ci--) {
        if (this.duplaireClones[ci].active && this.duplaireClones[ci].cloneHealth <= 0) {
          this.duplaireClones.splice(ci, 1);
        }
      }
      // Recalculate total health
      this.health = this.duplaireOrigHealth;
      for (const c of this.duplaireClones) {
        if (c.active) this.health += c.cloneHealth;
      }
      for (let ci = this.duplaireClones.length - 1; ci >= 0; ci--) {
        const clone = this.duplaireClones[ci];
        // Activation countdown
        if (!clone.active) {
          clone.activationTimer--;
          if (clone.activationTimer <= 0) clone.active = true;
          continue;
        }
        // Clones stay stationary (no horizontal movement), but mirror jumps
        // Gravity
        if (!clone.grounded) {
          clone.vy += 0.5;
          clone.y += clone.vy;
          if (clone.y >= this.groundY) {
            clone.y = this.groundY;
            clone.vy = 0;
            clone.grounded = true;
          }
        }
        // Jump when main jumps
        if (!this.grounded && clone.grounded && this.vy < -5) {
          clone.vy = this.vy;
          clone.grounded = false;
        }
        if (clone.x < 40) clone.x = 40;
        if (clone.x > 920) clone.x = 920;
        // Mirror facing, crouching, blocking
        clone.facing = this.facing;
        clone.crouching = this.crouching;
        clone.blocking = this.blocking;
        clone.animTimer++;
        if (clone.animTimer > 8) { clone.animTimer = 0; clone.animFrame = (clone.animFrame + 1) % 4; }
        // Mirror attacks
        if (this.state === 'attack' && this.currentAttack && clone.state !== 'attack') {
          clone.state = 'attack';
          clone.currentAttack = this.currentAttack;
          clone.attackFrame = 0;
          clone.stateTimer = this.currentAttack.startup + this.currentAttack.active + this.currentAttack.recovery;
        }
        if (clone.state === 'attack' && clone.currentAttack) {
          clone.attackFrame++;
          clone.stateTimer--;
          const catk = clone.currentAttack;
          if (clone.attackFrame >= catk.startup && clone.attackFrame < catk.startup + catk.active) {
            const hitX = clone.x + clone.facing * catk.range;
            if (opponent.isHitAt(hitX, clone.y - 25, 50, 70)) {
              const diffMult = (!this.isPlayer && cpuDifficulty) ? cpuDifficulty.damageMult : 1;
              const cloneDmg = catk.damage * this.char.stats.power * diffMult / (1 + this.duplaireClones.filter(c => c.active).length);
              opponent.takeDamage(cloneDmg, catk, clone.facing, false, { x: clone.x + clone.facing * catk.range, y: clone.y - 25 });
            }
          }
          if (clone.stateTimer <= 0) {
            clone.state = 'idle';
            clone.currentAttack = null;
          }
        }
      }
    }

    // Snazz McJazz dance timer
    if (this.dancing) {
      this.danceTimer--;
      if (this.danceTimer <= 0) {
        // Dance completed successfully - heal 25 HP
        this.dancing = false;
        this.health = Math.min(this.maxHealth, this.health + 25);
        this.comboFlash = 20;
        this.comboNameDisplay = 'GROOVE HEAL!';
        this.comboNameTimer = 60;
      }
    }

    // Update Rubberman stretch: store actual pixel distance the limb needs to reach
    if (this.char.isRubberman && this.state === 'attack' && this.currentAttack) {
      const dist = Math.abs(this.x - opponent.x);
      this.rubberStretch = Math.min(480, dist);
    } else {
      this.rubberStretch = 0;
    }

    // Attack hit detection
    if (this.state === 'attack' && this.currentAttack) {
      this.attackFrame++;
      const atk = this.currentAttack;
      if (this.attackFrame >= atk.startup && this.attackFrame < atk.startup + atk.active) {
        // Handle teleport effects before hit check
        let bypassBlock = false;
        if (atk.isCombo && this.pendingCombo) {
          if (this.pendingCombo.effect === 'shadow_step' && this.attackFrame === atk.startup) {
            // Teleport behind opponent
            this.teleportGhost = { x: this.x, y: this.y, timer: 12 };
            this.x = opponent.x + opponent.facing * 80;
            this.facing = opponent.x > this.x ? 1 : -1;
            bypassBlock = true;
          }
          if (this.pendingCombo.effect === 'teleport_strike' && this.attackFrame === atk.startup) {
            this.teleportGhost = { x: this.x, y: this.y, timer: 12 };
            this.x += this.facing * (this.pendingCombo.teleportDist || 60);
          }
        }

        const bojdoRange = this.char.isBojdo ? this.bojdoScale : 1;
        // Rubberman: range extends to reach opponent, up to half screen (480px)
        const rubbermanRange = this.char.isRubberman ? Math.max(1, Math.min(480, Math.abs(this.x - opponent.x)) / atk.range) : 1;
        const hitX = this.x + this.facing * atk.range * bojdoRange * rubbermanRange;
        // Check hit against main body or any Duplaire clone
        const hitRadius = 50 * (this.char.isBojdo ? this.bojdoScale : 1);
        let hitBody = (Math.abs(hitX - opponent.x) < hitRadius && Math.abs(this.centerY - opponent.centerY) < 70);
        let hitClonePos = null;
        if (!hitBody && opponent.char.isDuplaire) {
          for (const clone of opponent.duplaireClones) {
            if (clone.active && Math.abs(hitX - clone.x) < hitRadius && Math.abs(this.centerY - (clone.y - 25)) < 70) {
              hitBody = true;
              hitClonePos = { x: hitX, y: this.centerY };
              break;
            }
          }
        }
        if (hitBody) {
          const diffMult = (!this.isPlayer && cpuDifficulty) ? cpuDifficulty.damageMult : 1;
          const bojdoPowerMult = this.char.isBojdo ? this.bojdoScale : 1;
          const bojShrinkPowMult = (this.bojShrinkTimer > 0 && !this.char.isBojdo) ? 0.3 : 1;
          // Rubberman: damage falls off with distance (full at melee range, 25% at max stretch)
          const rubberDmgMult = this.char.isRubberman ? Math.max(0.25, 1 - (Math.abs(this.x - opponent.x) / 480) * 0.75) : 1;
          const jayDmgMult = this.isJay ? 0.3 : 1;
          const duplaireCount = this.char.isDuplaire ? 1 + this.duplaireClones.filter(c => c.active).length : 1;
          const dmg = atk.damage * this.char.stats.power * diffMult * bojdoPowerMult * bojShrinkPowMult * rubberDmgMult * jayDmgMult / duplaireCount;
          const didHit = opponent.takeDamage(dmg, atk, this.facing, bypassBlock, hitClonePos || { x: hitX, y: this.centerY });
          if (didHit) {
            this.comboCount++;
            this.comboTimer = 60;

            // X-haust: fill oil tank on hit
            if (this.char.isXhaust) {
              this.xhaustOilTank = Math.min(this.xhaustMaxOil, this.xhaustOilTank + 8);
            }

            // Apply combo special effects
            if (atk.isCombo && this.pendingCombo) {
              const combo = this.pendingCombo;
              switch (combo.effect) {
                case 'burn':
                case 'poison':
                  opponent.dotEffect = {
                    ticksRemaining: combo.effectTicks,
                    tickDamage: combo.effectDamage,
                    tickInterval: Math.floor(combo.effectDuration / combo.effectTicks),
                    tickTimer: 0,
                    color: combo.effectColor
                  };
                  break;
                case 'freeze':
                  opponent.frozenTimer = combo.effectDuration;
                  opponent.state = 'hitstun';
                  opponent.stateTimer = combo.effectDuration;
                  break;
                case 'slow':
                  opponent.slowTimer = combo.effectDuration;
                  break;
                case 'armor':
                  this.armorActive = true;
                  this.armorTimer = combo.effectDuration;
                  break;
                case 'earthquake':
                  shakeTimer = combo.shakeDuration;
                  shakeIntensity = combo.shakeIntensity;
                  break;
                case 'chain':
                  opponent.chainHits = {
                    remaining: combo.chainHits,
                    damage: combo.chainDamage,
                    timer: 0,
                    interval: 6
                  };
                  break;
                case 'phase':
                  this.phaseTimer = combo.effectDuration;
                  break;
                case 'knockback':
                  opponent.vx = this.facing * (combo.knockbackForce || 8);
                  break;
              }
              this.pendingCombo = null;
            }
          }
          // Prevent multi-hit
          this.attackFrame = atk.startup + atk.active;
        }
      }
    }

    // Input handling
    if (this.isPlayer) {
      this.handlePlayerInput(keys, opponent);
    } else {
      this.handleAI(opponent);
    }
  }

  handlePlayerInput(keys, opponent) {
    if (this.state === 'hitstun' || this.state === 'blockstun' || this.state === 'launched') return;
    if (this.dancing) return;
    if (this.exploding) return;

    const bojdoMaxScale = bojdobojdoUnlocked ? 3.5 : 2.0;
    const bojdoSpeedMult = this.char.isBojdo ? Math.max(bojdobojdoUnlocked ? 0 : 0.25, (bojdoMaxScale - this.bojdoScale) / (bojdoMaxScale - 1.0)) : 1; // smaller = faster, bigger = slower
    const tortoiseSpeedMult = this.isTortoise ? 0.5 : 1;
    const bojShrinkSpeedMult = (this.bojShrinkTimer > 0 && !this.char.isBojdo) ? 1.5 : 1; // faster when shrunk
    const stickerMult = this.stickerSlowTimer > 0 ? 0.3 : 1;
    const speed = this.char.stats.speed * (this.slowTimer > 0 ? 0.5 : 1) * bojdoSpeedMult * tortoiseSpeedMult * bojShrinkSpeedMult * stickerMult;
    this.blocking = false;
    this.crouching = false;

    // Paletap: can't move while slamming
    if (this.paletapSlamming) {
      this.vx = 0;
      this.state = 'idle';
      return;
    }

    // Matador: locked into dash movement
    if (this.matadorDashing) {
      return;
    }

    if (this.state !== 'attack') {
      // Movement
      const left = keys['ArrowLeft'] || keys['a'] || keys['A'];
      const right = keys['ArrowRight'] || keys['d'] || keys['D'];
      const down = keys['ArrowDown'] || keys['s'] || keys['S'];
      const up = keys['ArrowUp'] || keys['w'] || keys['W'];

      if (this.gourmandFull) {
        this.vx = 0;
        this.state = 'idle';
      } else if (left) {
        this.vx = -speed;
        this.state = 'walk';
        if (this.facing === 1) this.blocking = true;
      } else if (right) {
        this.vx = speed;
        this.state = 'walk';
        if (this.facing === -1) this.blocking = true;
      } else {
        this.state = 'idle';
      }

      if (this.isJay) {
        // Corvida jay form: up/down control vertical flight
        if (up) this.vy = -speed * 0.7;
        else if (down) this.vy = speed * 0.7;
      } else {
        if (down) {
          this.crouching = true;
          this.blocking = true;
        }


        if (up && this.grounded) {
          this.vy = -11;
          this.grounded = false;
          // Batsch: revert from tortoise on jump
          if (this.isTortoise) this.isTortoise = false;
        }
      }
      // Corvida: transform to jay if double-jump was triggered
      if (this.char.isCorvida && this.corvidaJayPending) {
        this.corvidaJayPending = false;
        this.isJay = true;
      }
      // Batsch: transform to tortoise if double-crouch was triggered
      if (this.char.isBatsch && this.batschCrouchPending) {
        this.batschCrouchPending = false;
        if (!this.isTortoise) this.isTortoise = true;
      }
    }

    // Golgar entity swap: press D to switch to dormant entity
    if (this.char.isGolgar && (keys['g'] || keys['G']) && this.state !== 'attack') {
      const oldX = this.x;
      const oldY = this.y;
      const oldFacing = this.facing;
      this.x = this.golgarOtherX;
      this.y = this.golgarOtherY;
      this.facing = this.golgarOtherFacing;
      this.golgarOtherX = oldX;
      this.golgarOtherY = oldY;
      this.golgarOtherFacing = oldFacing;
      this.golgarEntity = this.golgarEntity === 1 ? 2 : 1;
      this.grounded = this.y >= this.groundY;
      this.state = 'idle';
      this.stateTimer = 0;
      keys['g'] = false; keys['G'] = false;
    }

    // Duplaire: press K to create a clone
    if (this.char.isDuplaire && (keys['k'] || keys['K'])) {
      const activeCount = this.duplaireClones.filter(c => c.active || c.activationTimer > 0).length;
      if (activeCount < this.duplaireMaxClones) {
        const newTotal = 1 + activeCount + 1;
        const sectionHealth = this.maxHealth / newTotal;
        this.duplaireClones.push({
          x: this.x, y: this.y, facing: this.facing,
          grounded: this.grounded, vy: 0, vx: 0,
          activationTimer: 180, // 3 seconds at 60fps
          active: false,
          animTimer: 0, animFrame: 0,
          state: 'idle', attackFrame: 0, currentAttack: null, stateTimer: 0,
          cloneHealth: sectionHealth, cloneMaxHealth: sectionHealth
        });
        // Redistribute original's health to match new section size
        this.duplaireOrigHealth = Math.min(this.duplaireOrigHealth, sectionHealth);
        // Redistribute existing clone health caps
        for (const c of this.duplaireClones) {
          c.cloneMaxHealth = sectionHealth;
          if (c.cloneHealth > sectionHealth) c.cloneHealth = sectionHealth;
        }
      }
      keys['k'] = false; keys['K'] = false;
    }

    // Bozollok: press H to molt (shed skin and leap)
    if (this.char.isBozollok && (keys['h'] || keys['H']) && this.grounded && !this.molting && this.moltCooldown <= 0 && this.state !== 'attack') {
      this.moltHusk = { x: this.x, y: this.y, timer: 90 }; // husk decomposes over 1.5s
      this.molting = true;
      this.vy = -9; // moderate jump, face visible while hovering
      this.grounded = false;
      this.moltHover = 90; // hover for 1.5s at apex
      this.moltDescending = false;
      this.moltCooldown = 240; // 4 second cooldown
      keys['h'] = false; keys['H'] = false;
    }

    // Buck: press L to start firework spray
    if (this.char.isBuck && (keys['l'] || keys['L']) && !this.buckFiring && this.buckFireCooldown <= 0 && this.state !== 'attack') {
      this.buckFiring = true;
      this.buckFireTimer = 360; // 6 seconds at 60fps
      keys['l'] = false; keys['L'] = false;
    }

    // Gourmand: press L to open mouth, press P to shoot energy ball
    if (this.char.isGourmand && (keys['l'] || keys['L']) && !this.gourmandFull && this.state !== 'attack') {
      this.mouthOpen = true;
      keys['l'] = false; keys['L'] = false;
    }
    if (this.char.isGourmand && (keys['p'] || keys['P']) && this.gourmandEnergy > 0 && !this.gourmandProjectile) {
      this.gourmandProjectile = {
        x: this.x + this.facing * 30,
        y: this.centerY,
        vx: this.facing * 8,
        vy: 0,
        damage: this.gourmandEnergy,
        timer: 120,
        hit: false
      };
      this.gourmandEnergy = 0;
      this.gourmandFull = false;
      this.mouthOpen = false;
      keys['p'] = false; keys['P'] = false;
    }

    // Torrena water phase toggle
    if (this.char.isTorrena && (keys['h'] || keys['H'])) {
      this.waterPhase = !this.waterPhase;
      keys['h'] = false; keys['H'] = false;
    }

    // Haystack explosion: press F to explode
    if (this.char.isHaystack && (keys['f'] || keys['F']) && !this.exploding && this.state !== 'attack') {
      this.exploding = true;
      this.reformTimer = this.reformMaxFrames;
      // Spawn arrow projectiles in all directions
      for (let i = 0; i < 6; i++) {
        const angle = (i / 6) * Math.PI * 2 + (Math.random() - 0.5) * 0.3;
        this.haystackProjectiles.push({
          x: this.x, y: this.centerY,
          vx: Math.cos(angle) * 7, vy: Math.sin(angle) * 7,
          type: 'arrow', hit: false, timer: 45
        });
      }
      // Spawn sword in a random direction
      const sAngle = Math.random() * Math.PI * 2;
      this.haystackProjectiles.push({
        x: this.x, y: this.centerY,
        vx: Math.cos(sAngle) * 6, vy: Math.sin(sAngle) * 6,
        type: 'sword', hit: false, timer: 50
      });
      // Spawn hay particles
      for (let i = 0; i < 12; i++) {
        const a = Math.random() * Math.PI * 2;
        this.hayParticles.push({
          x: this.x, y: this.centerY - Math.random() * 30,
          vx: Math.cos(a) * (3 + Math.random() * 4),
          vy: Math.sin(a) * (3 + Math.random() * 4) - 2,
          timer: 30 + Math.random() * 20
        });
      }
      keys['f'] = false; keys['F'] = false;
    }

    // Backtrack: press J to rewind time 8 seconds
    if (this.char.isBacktrack && (keys['j'] || keys['J']) && this.btRewindCooldown <= 0 && this.btHistoryLen > 0) {
      // Get the oldest entry in the ring buffer
      const oldestIdx = this.btHistoryLen < this.btMaxHistory ? 0 : this.btHistoryIdx;
      const snap = this.btHistory[oldestIdx];
      const oppSnap = snap.opp;
      // Restore self
      this.x = snap.x;
      this.y = snap.y;
      this.health = snap.health;
      this.state = 'idle';
      this.stateTimer = 0;
      this.vx = 0;
      this.vy = 0;
      // Restore opponent
      if (opponent && oppSnap) {
        opponent.x = oppSnap.x;
        opponent.y = oppSnap.y;
        opponent.health = oppSnap.health;
        opponent.state = 'idle';
        opponent.stateTimer = 0;
        opponent.vx = 0;
        opponent.vy = 0;
      }
      this.btHistoryLen = 0;
      this.btHistoryIdx = 0;
      this.btRewindCooldown = 600; // 10 second cooldown
      this.btRewindEffect = 40;
      keys['j'] = false; keys['J'] = false;
    }

    // Snazz McJazz dance: press J to start dancing (can't if already dancing or attacking)
    if (this.char.isSnazz && (keys['j'] || keys['J']) && !this.dancing && this.state !== 'attack') {
      this.dancing = true;
      this.danceTimer = this.danceMaxFrames;
      this.state = 'idle';
      keys['j'] = false; keys['J'] = false;
    }

    // Paletap shockwave: press K to slam and create ground shockwave
    if (this.char.isPaletap && (keys['k'] || keys['K']) && this.grounded && !this.paletapSlamming && this.paletapShockCooldown <= 0 && this.state !== 'attack') {
      this.paletapSlamming = true;
      this.paletapSlamFrame = 0;
      keys['k'] = false; keys['K'] = false;
    }

    // Killa Watt: press K to zap opponent when in range
    if (this.char.isKillawatt && (keys['k'] || keys['K']) && this.kwZapCooldown <= 0 && !this.kwZapEffect && this.state !== 'attack') {
      const dist = Math.abs(this.x - opponent.x);
      if (dist < 180) {
        const zapDamage = 10;
        const stunDuration = 45;
        opponent.health -= zapDamage / opponent.char.stats.defense;
        if (opponent.health <= 0) opponent.health = 0;
        opponent.state = 'hitstun';
        opponent.stateTimer = stunDuration;
        opponent.vx = 0;
        opponent.kwStunTimer = stunDuration;
        this.kwZapEffect = { target: opponent, timer: stunDuration, bolts: [] };
        this.kwZapCooldown = 90;
        // Generate lightning bolt paths
        for (let b = 0; b < 3; b++) {
          const bolt = [];
          const sx = this.x + this.facing * 15;
          const sy = this.centerY - 10;
          const tx = opponent.x;
          const ty = opponent.centerY - 10;
          const segs = 6;
          for (let s = 0; s <= segs; s++) {
            const t = s / segs;
            bolt.push({
              x: sx + (tx - sx) * t + (s > 0 && s < segs ? (Math.random() - 0.5) * 30 : 0),
              y: sy + (ty - sy) * t + (s > 0 && s < segs ? (Math.random() - 0.5) * 20 : 0)
            });
          }
          this.kwZapEffect.bolts.push(bolt);
        }
      }
      keys['k'] = false; keys['K'] = false;
    }

    // Matador: press O to dash through opponent and slash
    if (this.char.isMatador && (keys['o'] || keys['O']) && !this.matadorDashing && this.matadorDashCooldown <= 0 && this.state !== 'attack') {
      this.matadorDashing = true;
      this.matadorDashStartX = this.x;
      this.matadorDashEndX = Math.max(40, Math.min(920, opponent.x + this.facing * 80));
      this.matadorDashFrames = 12;
      this.matadorDashTimer = 0;
      this.matadorDashHit = false;
      this.vx = 0;
      keys['o'] = false; keys['O'] = false;
    }

    // X-haust: hold L to leak oil, press K to ignite
    if (this.char.isXhaust) {
      this.xhaustLeaking = (keys['l'] || keys['L']) && this.xhaustOilTank > 0 && this.state !== 'attack';
      if ((keys['k'] || keys['K']) && this.xhaustOilPuddles.length > 0 && this.state !== 'attack') {
        // Ignite all oil puddles
        for (const puddle of this.xhaustOilPuddles) {
          this.xhaustFlames.push({
            x: puddle.x, y: puddle.y,
            width: puddle.width,
            timer: 90 // 1.5 seconds of fire
          });
        }
        this.xhaustOilPuddles = [];
        keys['k'] = false; keys['K'] = false;
      }
    }

    // Vortice: hold H to summon pull tornado, press J to activate push tornado
    if (this.char.isVortice) {
      this.vorticeTornado = (keys['h'] || keys['H']) && this.state !== 'attack' && !this.vorticePushing;
      if ((keys['j'] || keys['J']) && this.vorticePushCooldown <= 0 && !this.vorticePushing && this.state !== 'attack') {
        this.vorticePushing = true;
        this.vorticePushTimer = 90; // 1.5 seconds of push tornado
        this.vorticePushCooldown = 180; // 3 second cooldown
        keys['j'] = false; keys['J'] = false;
      }
    }

    // Attacks - always check, even during attack state (startAttack handles queuing)
    // Block attacks and assists during finishHim phase (keys are used for rumble combo)
    if (!this.waterPhase && gameState !== 'finishHim') {
      if (keys['z'] || keys['Z']) { this.startAttack('jab'); keys['z'] = false; keys['Z'] = false; }
      if (keys['c'] || keys['C']) { this.startAttack('lowKick'); keys['c'] = false; keys['C'] = false; }
      if (keys['x'] || keys['X']) { this.startAttack('uppercut'); keys['x'] = false; keys['X'] = false; }
      if (keys['v'] || keys['V']) { this.startAttack('highKick'); keys['v'] = false; keys['V'] = false; }
      if (keys['b'] || keys['B']) { this.callAssist(opponent); keys['b'] = false; keys['B'] = false; }
    }
    // Bojdo size shifting: hold K to grow, hold L to shrink
    if (this.char.isBojdo) {
      const maxScale = bojdobojdoUnlocked ? 3.5 : 2.0;
      const minScale = bojdobojdoUnlocked ? 0.2 : 0.5;
      if (keys['k'] || keys['K']) {
        this.bojdoScale = Math.min(this.bojdoScale + 0.02, maxScale);
      } else if (keys['l'] || keys['L']) {
        this.bojdoScale = Math.max(this.bojdoScale - 0.02, minScale);
      }
    }

    // Exor soul drain: press N at close range to drain HP
    if (this.char.isExor && (keys['n'] || keys['N']) && !this.exorDraining && this.exorDrainCooldown <= 0 && this.state !== 'attack') {
      const dist = Math.abs(this.x - opponent.x);
      if (dist < 120) {
        this.exorDraining = true;
        this.exorDrainTimer = 90; // 1.5 seconds of draining
        this.exorDrainTarget = opponent;
        opponent.slowTimer = Math.max(opponent.slowTimer, 90); // slow them while draining
      }
      keys['n'] = false; keys['N'] = false;
    }

    // Codemax swap: press N to switch positions with opponent
    if (this.char.isCodemax && (keys['n'] || keys['N']) && this.swapCooldown <= 0 && this.state !== 'attack') {
      const myX = this.x, myY = this.y;
      const oppX = opponent.x, oppY = opponent.y;
      this.teleportGhost = { x: myX, y: myY, timer: 15 };
      opponent.teleportGhost = { x: oppX, y: oppY, timer: 15 };
      // Swap both X and Y positions
      this.x = oppX; this.y = oppY;
      opponent.x = myX; opponent.y = myY;
      // Codemax inherits opponent's air state
      this.grounded = opponent.grounded;
      if (!this.grounded) this.vy = 0; // fall naturally
      // Opponent lands at Codemax's old position
      opponent.grounded = myY >= opponent.groundY;
      if (opponent.grounded) {
        opponent.y = opponent.groundY;
        opponent.vy = 0;
        // Corvida reverts from jay form when landing on the ground
        if (opponent.isJay) {
          opponent.isJay = false;
        }
      }
      this.facing = opponent.x > this.x ? 1 : -1;
      opponent.facing = this.x > opponent.x ? 1 : -1;
      this.swapCooldown = 180; // 3 second cooldown
      this.glitchTimer = 20;
      opponent.glitchTimer = 20;
      keys['n'] = false; keys['N'] = false;
    } else if ((keys['m'] || keys['M']) && gameMode === 'practice') {
      opponent.x = 710;
      opponent.y = opponent.groundY;
      opponent.vx = 0;
      opponent.vy = 0;
      keys['m'] = false;
      keys['M'] = false;
    }
  }

  handleAI(opponent) {
    // Practice mode targets
    if (gameMode === 'practice') {
      if (this.char.isMannequin) {
        // Mannequin punches every 2 seconds (120 frames)
        if (!this.mannequinPunchTimer) this.mannequinPunchTimer = 0;
        this.mannequinPunchTimer++;
        this.facing = opponent.x > this.x ? 1 : -1;
        if (this.state !== 'attack' && this.state !== 'hitstun' && this.state !== 'launched') {
          if (this.mannequinPunchTimer >= 120) {
            this.mannequinPunchTimer = 0;
            this.startAttack('jab');
          } else {
            this.state = 'idle';
          }
        }
        this.blocking = false;
        return;
      }
      if (this.char.isDrone) {
        // Drone moves like a CPU but never attacks
        this.facing = opponent.x > this.x ? 1 : -1;
        if (this.state === 'hitstun' || this.state === 'launched' || this.state === 'blockstun') return;
        const dist = Math.abs(this.x - opponent.x);
        if (dist > 200) {
          this.vx = this.facing * this.char.stats.speed;
          this.state = 'walk';
        } else if (dist < 80) {
          this.vx = -this.facing * this.char.stats.speed;
          this.state = 'walk';
        } else {
          // Wander randomly
          if (Math.random() < 0.02) {
            this.vx = (Math.random() - 0.5) * this.char.stats.speed * 2;
            this.state = 'walk';
          } else if (Math.random() < 0.03) {
            this.vx = 0;
            this.state = 'idle';
          }
          // Occasionally jump
          if (Math.random() < 0.01 && this.grounded) {
            this.vy = -11;
            this.grounded = false;
          }
        }
        this.blocking = false;
        return;
      }
      // Bag just stands there
      this.state = 'idle';
      this.blocking = false;
      return;
    }

    if (this.state === 'hitstun' || this.state === 'blockstun' || this.state === 'launched') {
      this.blocking = true;
      this.aiComboQueue = [];
      return;
    }

    // Matador: locked into dash
    if (this.matadorDashing) return;

    // Continue combo queue
    if (this.aiComboQueue.length > 0 && this.state !== 'attack') {
      this.startAttack(this.aiComboQueue.shift());
      return;
    }

    this.aiTimer++;
    const dist = Math.abs(this.x - opponent.x);

    // React periodically
    const diff = cpuDifficulty || difficulties[1];
    if (this.aiTimer >= this.aiReactTime) {
      this.aiTimer = 0;
      this.aiReactTime = diff.reactMin + Math.random() * diff.reactRange;

      if (dist > 120) {
        this.aiAction = 'approach';
      } else if (dist < 50) {
        this.aiAction = Math.random() > 0.5 ? 'retreat' : 'attack';
      } else {
        const r = Math.random();
        if (r < diff.attackChance) this.aiAction = 'attack';
        else if (r < diff.attackChance + diff.blockChance) this.aiAction = 'block';
        else if (r < diff.attackChance + diff.blockChance + 0.15) this.aiAction = 'approach';
        else if (r < diff.attackChance + diff.blockChance + 0.15 + diff.assistChance) this.aiAction = 'assist';
        else this.aiAction = 'retreat';
      }
    }

    this.blocking = false;
    this.crouching = false;

    // Bojdo AI size shifting: shrink when far away for speed, grow when close for power
    if (this.char.isBojdo) {
      const maxScale = bojdobojdoUnlocked ? 3.5 : 2.0;
      const minScale = bojdobojdoUnlocked ? 0.2 : 0.5;
      if (dist > 120 || this.aiAction === 'approach' || this.aiAction === 'retreat') {
        // Shrink for speed when moving around
        const targetScale = Math.max(minScale, 0.6);
        if (this.bojdoScale > targetScale) this.bojdoScale = Math.max(targetScale, this.bojdoScale - 0.03);
      } else if (dist < 80 && (this.aiAction === 'attack' || this.state === 'attack')) {
        // Grow for power and range when attacking up close
        const targetScale = Math.min(maxScale, bojdobojdoUnlocked ? 2.5 : 1.8);
        if (this.bojdoScale < targetScale) this.bojdoScale = Math.min(targetScale, this.bojdoScale + 0.04);
      } else if (this.aiAction === 'block') {
        // Grow big when blocking for more defense
        const targetScale = Math.min(maxScale, bojdobojdoUnlocked ? 3.0 : 2.0);
        if (this.bojdoScale < targetScale) this.bojdoScale = Math.min(targetScale, this.bojdoScale + 0.03);
      }
    }

    // Torrena AI water phase: phase through when retreating or blocking, turn off to attack
    if (this.char.isTorrena) {
      if (this.aiAction === 'attack' && dist < 80) {
        this.waterPhase = false;
      } else if (this.aiAction === 'retreat' || this.aiAction === 'block' || (this.state === 'hitstun' && !this.waterPhase)) {
        this.waterPhase = true;
      }
    }

    // Snazz AI: dance when far away and health is low
    if (this.char.isSnazz && !this.dancing && dist > 200 && this.health < this.maxHealth * 0.6 && Math.random() < 0.02) {
      this.dancing = true;
      this.danceTimer = this.danceMaxFrames;
    }
    if (this.dancing) return;

    // Haystack AI: explode when opponent is close
    if (this.char.isHaystack && !this.exploding && dist < 100 && Math.random() < 0.04) {
      this.exploding = true;
      this.reformTimer = this.reformMaxFrames;
      for (let i = 0; i < 6; i++) {
        const angle = (i / 6) * Math.PI * 2 + (Math.random() - 0.5) * 0.3;
        this.haystackProjectiles.push({
          x: this.x, y: this.centerY,
          vx: Math.cos(angle) * 7, vy: Math.sin(angle) * 7,
          type: 'arrow', hit: false, timer: 45
        });
      }
      const sAngle = Math.atan2(opponent.centerY - this.centerY, opponent.x - this.x) + (Math.random() - 0.5) * 0.5;
      this.haystackProjectiles.push({
        x: this.x, y: this.centerY,
        vx: Math.cos(sAngle) * 6, vy: Math.sin(sAngle) * 6,
        type: 'sword', hit: false, timer: 50
      });
      for (let i = 0; i < 12; i++) {
        const a = Math.random() * Math.PI * 2;
        this.hayParticles.push({
          x: this.x, y: this.centerY - Math.random() * 30,
          vx: Math.cos(a) * (3 + Math.random() * 4),
          vy: Math.sin(a) * (3 + Math.random() * 4) - 2,
          timer: 30 + Math.random() * 20
        });
      }
    }
    if (this.exploding) return;

    // Golgar AI: swap entities strategically
    if (this.char.isGolgar && this.state !== 'attack') {
      const otherDist = Math.abs(this.golgarOtherX - opponent.x);
      // Swap if the other entity is closer to the opponent, or to surprise from behind
      if ((otherDist < dist - 60 && Math.random() < 0.03) || (dist > 200 && otherDist < 100 && Math.random() < 0.05)) {
        const oldX = this.x;
        const oldY = this.y;
        const oldFacing = this.facing;
        this.x = this.golgarOtherX;
        this.y = this.golgarOtherY;
        this.facing = this.golgarOtherFacing;
        this.golgarOtherX = oldX;
        this.golgarOtherY = oldY;
        this.golgarOtherFacing = oldFacing;
        this.golgarEntity = this.golgarEntity === 1 ? 2 : 1;
        this.grounded = this.y >= this.groundY;
        this.state = 'idle';
        this.stateTimer = 0;
      }
    }

    // Corvida AI: transform to jay when far away, swoop to attack, land to revert
    if (this.char.isCorvida && this.grounded && !this.isJay && dist > 150 && Math.random() < 0.03) {
      this.isJay = true;
      this.vy = -11;
      this.grounded = false;
    }
    if (this.isJay && !this.grounded) {
      // Fly toward opponent horizontally
      if (dist > 50) {
        this.vx = this.facing * this.char.stats.speed * 0.7;
      }
      // Swoop down to attack when close, then land to revert
      if (dist < 90) {
        // Dive toward opponent to get in attack range
        this.vy = this.char.stats.speed * 0.6;
        if (Math.random() < 0.12) {
          const atkTypes = ['jab', 'lowKick', 'uppercut', 'highKick'];
          this.startAttack(atkTypes[Math.floor(Math.random() * atkTypes.length)]);
        }
      } else {
        // Cruise at moderate height while approaching
        const cruiseY = this.groundY - 80;
        if (this.y > cruiseY) this.vy = -this.char.stats.speed * 0.4;
        else if (this.y < cruiseY - 30) this.vy = this.char.stats.speed * 0.3;
      }
      // Randomly decide to land and fight normally
      if (Math.random() < 0.008) {
        this.vy = this.char.stats.speed;
      }
      return;
    }

    // Codemax AI: swap positions when opponent is cornered or to gain advantage
    if (this.char.isCodemax && this.swapCooldown <= 0 && this.state !== 'attack') {
      const oppCornered = opponent.x < 80 || opponent.x > 880;
      const selfCornered = this.x < 80 || this.x > 880;
      if ((selfCornered || (dist < 100 && Math.random() < 0.03) || (oppCornered && Math.random() < 0.01)) && dist > 50) {
        const myX = this.x, myY = this.y;
        const oppX = opponent.x, oppY = opponent.y;
        this.teleportGhost = { x: myX, y: myY, timer: 15 };
        opponent.teleportGhost = { x: oppX, y: oppY, timer: 15 };
        this.x = oppX; this.y = oppY;
        opponent.x = myX; opponent.y = myY;
        this.grounded = opponent.grounded;
        if (!this.grounded) this.vy = 0;
        opponent.grounded = myY >= opponent.groundY;
        if (opponent.grounded) {
          opponent.y = opponent.groundY;
          opponent.vy = 0;
          if (opponent.isJay) opponent.isJay = false;
        }
        this.facing = opponent.x > this.x ? 1 : -1;
        opponent.facing = this.x > opponent.x ? 1 : -1;
        this.swapCooldown = 180;
        this.glitchTimer = 20;
        opponent.glitchTimer = 20;
      }
    }

    // Duplaire AI: create clones periodically
    if (this.char.isDuplaire && this.state !== 'attack') {
      const activeCount = this.duplaireClones.filter(c => c.active || c.activationTimer > 0).length;
      if (activeCount < 3 && Math.random() < 0.015) {
        const newTotal = 1 + activeCount + 1;
        const sectionHealth = this.maxHealth / newTotal;
        this.duplaireClones.push({
          x: this.x, y: this.y, facing: this.facing,
          grounded: this.grounded, vy: 0, vx: 0,
          activationTimer: 180, active: false,
          animTimer: 0, animFrame: 0,
          state: 'idle', attackFrame: 0, currentAttack: null, stateTimer: 0,
          cloneHealth: sectionHealth, cloneMaxHealth: sectionHealth
        });
        this.duplaireOrigHealth = Math.min(this.duplaireOrigHealth, sectionHealth);
        for (const c of this.duplaireClones) {
          c.cloneMaxHealth = sectionHealth;
          if (c.cloneHealth > sectionHealth) c.cloneHealth = sectionHealth;
        }
      }
    }

    // Bozollok AI: molt leap when medium distance or to escape pressure
    if (this.char.isBozollok && this.grounded && !this.molting && this.moltCooldown <= 0 && this.state !== 'attack') {
      if ((dist < 100 && Math.random() < 0.04) || (dist > 150 && dist < 300 && Math.random() < 0.02)) {
        this.moltHusk = { x: this.x, y: this.y, timer: 90 };
        this.molting = true;
        this.vy = -9;
        this.grounded = false;
        this.moltHover = 90;
        this.moltDescending = false;
        this.moltCooldown = 240;
      }
    }

    // Gourmand AI: open mouth to absorb, shoot energy ball when full or close range
    if (this.char.isGourmand && this.state !== 'attack') {
      // Open mouth when opponent is attacking nearby
      if (!this.mouthOpen && !this.gourmandFull && this.gourmandEnergy < this.gourmandMaxEnergy) {
        if (opponent.state === 'attack' && dist < 100 && Math.random() < 0.15) {
          this.mouthOpen = true;
        }
      }
      // Close mouth after a short time if not hit
      if (this.mouthOpen && Math.random() < 0.05) {
        this.mouthOpen = false;
      }
      // Shoot energy ball when has energy and opponent is at range
      if (this.gourmandEnergy > 20 && !this.gourmandProjectile && dist > 80) {
        if (this.gourmandFull || (this.gourmandEnergy > 40 && Math.random() < 0.04) || Math.random() < 0.02) {
          this.gourmandProjectile = {
            x: this.x + this.facing * 30, y: this.y - 30,
            vx: this.facing * 8, vy: 0,
            damage: this.gourmandEnergy, timer: 120, hit: false
          };
          this.gourmandEnergy = 0;
          this.gourmandFull = false;
          this.mouthOpen = false;
        }
      }
    }

    // Batsch AI: toggle tortoise form based on health and distance
    if (this.char.isBatsch) {
      if (!this.isTortoise && (this.health < this.maxHealth * 0.4 || (dist < 80 && Math.random() < 0.03))) {
        this.isTortoise = true;
      } else if (this.isTortoise && this.health > this.maxHealth * 0.7 && dist > 150 && Math.random() < 0.02) {
        this.isTortoise = false;
      }
    }

    // Matador AI: dash-slash at medium range
    if (this.char.isMatador && !this.matadorDashing && this.matadorDashCooldown <= 0 && this.state !== 'attack') {
      if (dist > 80 && dist < 300 && Math.random() < 0.04) {
        this.matadorDashing = true;
        this.matadorDashStartX = this.x;
        this.matadorDashEndX = Math.max(40, Math.min(920, opponent.x + this.facing * 80));
        this.matadorDashFrames = 12;
        this.matadorDashTimer = 0;
        this.matadorDashHit = false;
        this.vx = 0;
      }
    }

    // Paletap AI: slam shockwave at medium range
    if (this.char.isPaletap && this.grounded && !this.paletapSlamming && this.paletapShockCooldown <= 0 && this.state !== 'attack') {
      if (dist > 100 && dist < 400 && Math.random() < 0.04) {
        this.paletapSlamming = true;
        this.paletapSlamFrame = 0;
      }
    }

    // Killa Watt AI: zap when in range
    if (this.char.isKillawatt && this.kwZapCooldown <= 0 && !this.kwZapEffect && this.state !== 'attack') {
      if (dist < 180 && Math.random() < 0.05) {
        const zapDamage = 10;
        const stunDuration = 45;
        opponent.health -= zapDamage / opponent.char.stats.defense;
        if (opponent.health <= 0) opponent.health = 0;
        opponent.state = 'hitstun';
        opponent.stateTimer = stunDuration;
        opponent.vx = 0;
        opponent.kwStunTimer = stunDuration;
        this.kwZapEffect = { target: opponent, timer: stunDuration, bolts: [] };
        this.kwZapCooldown = 90;
        for (let b = 0; b < 3; b++) {
          const bolt = [];
          const sx = this.x + this.facing * 15;
          const sy = this.centerY - 10;
          const tx = opponent.x;
          const ty = opponent.centerY - 10;
          const segs = 6;
          for (let s = 0; s <= segs; s++) {
            const t = s / segs;
            bolt.push({
              x: sx + (tx - sx) * t + (s > 0 && s < segs ? (Math.random() - 0.5) * 30 : 0),
              y: sy + (ty - sy) * t + (s > 0 && s < segs ? (Math.random() - 0.5) * 20 : 0)
            });
          }
          this.kwZapEffect.bolts.push(bolt);
        }
      }
    }

    // Exor AI: drain when close to opponent
    if (this.char.isExor && !this.exorDraining && this.exorDrainCooldown <= 0 && this.state !== 'attack') {
      if (dist < 120 && Math.random() < 0.04) {
        this.exorDraining = true;
        this.exorDrainTimer = 90;
        this.exorDrainTarget = opponent;
        opponent.slowTimer = Math.max(opponent.slowTimer, 90);
      }
    }

    // Buck AI: fire fireworks when opponent is in range
    if (this.char.isBuck && !this.buckFiring && this.buckFireCooldown <= 0 && this.state !== 'attack') {
      if (dist < 300 && Math.random() < 0.02) {
        this.buckFiring = true;
        this.buckFireTimer = 360;
      }
    }

    // Backtrack AI: rewind when health is low and history has enough data
    if (this.char.isBacktrack && this.btRewindCooldown <= 0 && this.btHistoryLen > 240) {
      // Get the oldest entry in the ring buffer
      const oldestIdx = this.btHistoryLen < this.btMaxHistory ? 0 : this.btHistoryIdx;
      const oldSnap = this.btHistory[oldestIdx];
      if (this.health < this.maxHealth * 0.4 && oldSnap.health > this.health + 20 && Math.random() < 0.03) {
        const snap = this.btHistory[oldestIdx];
        const oppSnap = snap.opp;
        this.x = snap.x;
        this.y = snap.y;
        this.health = snap.health;
        this.state = 'idle';
        this.stateTimer = 0;
        this.vx = 0;
        this.vy = 0;
        if (opponent && oppSnap) {
          opponent.x = oppSnap.x;
          opponent.y = oppSnap.y;
          opponent.health = oppSnap.health;
          opponent.state = 'idle';
          opponent.stateTimer = 0;
          opponent.vx = 0;
          opponent.vy = 0;
        }
        this.btHistoryLen = 0;
        this.btHistoryIdx = 0;
        this.btRewindCooldown = 600;
        this.btRewindEffect = 40;
      }
    }

    if (this.state === 'attack') return;

    switch (this.aiAction) {
      case 'approach':
        this.vx = this.facing * this.char.stats.speed * (this.slowTimer > 0 ? 0.4 : 0.8);
        this.state = 'walk';
        if (dist < 80) this.aiAction = 'attack';
        break;
      case 'retreat':
        this.vx = -this.facing * this.char.stats.speed * (this.slowTimer > 0 ? 0.3 : 0.6);
        this.state = 'walk';
        break;
      case 'attack':
        if (dist < 80) {
          // Check if AI should execute a combo sequence
          if (this.aiComboQueue.length > 0) {
            this.startAttack(this.aiComboQueue.shift());
            break;
          }

          // On Hard/Brutal, chance to start a combo
          const combos = characterCombos[this.char.name];
          const comboChance = diff === difficulties[2] ? 0.08 : diff === difficulties[3] ? 0.18 : 0;
          if (combos && Math.random() < comboChance) {
            const combo = combos[Math.floor(Math.random() * combos.length)];
            this.startAttack(combo.sequence[0]);
            this.aiComboQueue = combo.sequence.slice(1);
            break;
          }

          const r = Math.random();
          if (!diff.uppercut) {
            if (r < 0.45) this.startAttack('jab');
            else if (r < 0.75) this.startAttack('lowKick');
            else this.startAttack('highKick');
          } else {
            if (r < 0.35) this.startAttack('jab');
            else if (r < 0.55) this.startAttack('lowKick');
            else if (r < 0.75) this.startAttack('highKick');
            else this.startAttack('uppercut');
          }
        } else {
          this.aiAction = 'approach';
        }
        break;
      case 'block':
        this.blocking = true;
        this.crouching = Math.random() > 0.5;
        break;
      case 'assist':
        this.callAssist(opponent);
        this.aiAction = 'approach';
        break;
      default:
        this.state = 'idle';
    }
  }

  drawBag(ctx) {
    const flash = this.flashTimer > 0 && this.flashTimer % 2 === 0;
    const color = flash ? '#fff' : this.char.color;
    const accent = flash ? '#fff' : this.char.accent;
    const outline = flash ? '#ccc' : this.char.outline;

    ctx.save();
    ctx.translate(this.x, this.y);

    // Shadow
    ctx.fillStyle = 'rgba(0,0,0,0.3)';
    ctx.beginPath();
    ctx.ellipse(0, 2, 25, 6, 0, 0, Math.PI * 2);
    ctx.fill();

    // Sway on hit
    const sway = (this.state === 'hitstun' || this.state === 'launched') ? Math.sin(this.stateTimer * 0.5) * 5 : 0;

    // Chain
    ctx.strokeStyle = '#888';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(sway * 0.3, -120);
    ctx.lineTo(sway * 0.1, -200);
    ctx.stroke();

    // Ceiling mount
    ctx.fillStyle = '#555';
    ctx.fillRect(-15, -205, 30, 10);

    // Bag body
    ctx.fillStyle = color;
    ctx.strokeStyle = outline;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(-22 + sway, -110);
    ctx.quadraticCurveTo(-26 + sway, -60, -22 + sway * 0.8, -10);
    ctx.quadraticCurveTo(0 + sway * 0.6, 5, 22 + sway * 0.8, -10);
    ctx.quadraticCurveTo(26 + sway, -60, 22 + sway, -110);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Bag top cap
    ctx.fillStyle = accent;
    ctx.beginPath();
    ctx.ellipse(sway, -110, 22, 8, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = outline;
    ctx.stroke();

    // Bag stripe
    ctx.strokeStyle = accent;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(sway, -105);
    ctx.lineTo(sway * 0.7, -15);
    ctx.stroke();

    ctx.restore();

    // Hit effect
    if (this.hitEffect) {
      const he = this.hitEffect;
      const size = he.type === 'big' ? 25 : 15;
      const alpha = he.timer / 10;
      ctx.save();
      ctx.translate(he.x, he.y);
      ctx.globalAlpha = alpha;
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2 + he.timer * 0.3;
        const r = size * (1 - he.timer / 10) + 5;
        ctx.strokeStyle = i % 2 === 0 ? '#fff' : '#ff0';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(Math.cos(angle) * r * 0.3, Math.sin(angle) * r * 0.3);
        ctx.lineTo(Math.cos(angle) * r, Math.sin(angle) * r);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
      ctx.restore();
    }
  }

  drawMannequin(ctx) {
    const flash = this.flashTimer > 0 && this.flashTimer % 2 === 0;
    const wood = flash ? '#fff' : '#c4a36e';
    const woodDark = flash ? '#ccc' : '#a08050';
    const joint = flash ? '#ddd' : '#8a7040';
    const f = this.facing;

    ctx.save();
    ctx.translate(this.x, this.y);

    // Shadow
    ctx.fillStyle = 'rgba(0,0,0,0.3)';
    ctx.beginPath();
    ctx.ellipse(0, 2, 22, 5, 0, 0, Math.PI * 2);
    ctx.fill();

    // Legs (wooden pegs with joint gaps)
    ctx.fillStyle = wood;
    ctx.fillRect(-12, -30, 8, 28); // left leg
    ctx.fillRect(4, -30, 8, 28);   // right leg
    ctx.fillStyle = joint;
    ctx.beginPath(); ctx.arc(-8, -30, 3, 0, Math.PI * 2); ctx.fill(); // left knee
    ctx.beginPath(); ctx.arc(8, -30, 3, 0, Math.PI * 2); ctx.fill();  // right knee

    // Torso (wooden block)
    ctx.fillStyle = wood;
    ctx.beginPath();
    ctx.roundRect(-14, -70, 28, 40, 4);
    ctx.fill();
    ctx.strokeStyle = woodDark;
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Torso wood grain
    ctx.strokeStyle = woodDark;
    ctx.lineWidth = 0.5;
    ctx.globalAlpha = 0.4;
    ctx.beginPath(); ctx.moveTo(-8, -65); ctx.lineTo(-6, -35); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(2, -68); ctx.lineTo(4, -33); ctx.stroke();
    ctx.globalAlpha = 1;

    // Arms
    const attacking = this.state === 'attack';
    const punchExtend = attacking ? Math.min(1, this.attackFrame / 3) : 0;
    const shoulderY = -62;
    const armLen = 20;

    // Back arm (hangs at side)
    ctx.fillStyle = wood;
    const backShX = -f * 14;
    ctx.save();
    ctx.translate(backShX, shoulderY);
    ctx.rotate(-f * 0.2);
    ctx.fillRect(-3, 0, 6, armLen);
    ctx.fillStyle = joint;
    ctx.beginPath(); ctx.arc(0, 0, 3, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(0, armLen, 2.5, 0, Math.PI * 2); ctx.fill();
    ctx.restore();

    // Front arm (punches horizontally toward opponent)
    const frontShX = f * 14;
    ctx.fillStyle = wood;
    ctx.save();
    ctx.translate(frontShX, shoulderY);
    if (attacking) {
      // Upper arm rotates forward (toward horizontal)
      const upperAngle = f * (Math.PI / 2) * punchExtend;
      ctx.rotate(upperAngle);
      ctx.fillRect(-3, 0, 6, armLen);
      ctx.fillStyle = joint;
      ctx.beginPath(); ctx.arc(0, 0, 3, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(0, armLen, 2.5, 0, Math.PI * 2); ctx.fill();
      // Forearm continues straight
      ctx.translate(0, armLen);
      ctx.fillStyle = wood;
      ctx.fillRect(-3, 0, 6, 16);
      // Fist
      ctx.fillStyle = woodDark;
      ctx.beginPath(); ctx.arc(0, 18, 4, 0, Math.PI * 2); ctx.fill();
    } else {
      // Resting: arm hangs down
      ctx.rotate(f * 0.2);
      ctx.fillRect(-3, 0, 6, armLen);
      ctx.fillStyle = joint;
      ctx.beginPath(); ctx.arc(0, 0, 3, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(0, armLen, 2.5, 0, Math.PI * 2); ctx.fill();
    }
    ctx.restore();

    // Head (wooden sphere with cross-joint)
    ctx.fillStyle = wood;
    ctx.beginPath();
    ctx.arc(0, -80, 12, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = woodDark;
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Face - simple painted eyes and mouth
    ctx.fillStyle = '#333';
    ctx.beginPath(); ctx.arc(-4 * f, -82, 2, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(4 * f, -82, 2, 0, Math.PI * 2); ctx.fill();
    // Painted smile
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(0, -78, 5, 0.1, Math.PI - 0.1);
    ctx.stroke();

    // Neck joint
    ctx.fillStyle = joint;
    ctx.beginPath(); ctx.arc(0, -68, 3, 0, Math.PI * 2); ctx.fill();

    // Stand base (wooden platform)
    ctx.fillStyle = woodDark;
    ctx.beginPath();
    ctx.roundRect(-20, -2, 40, 5, 2);
    ctx.fill();

    ctx.restore();

    // Hit effect
    if (this.hitEffect) {
      const he = this.hitEffect;
      const size = he.type === 'big' ? 25 : 15;
      const alpha = he.timer / 10;
      ctx.save();
      ctx.translate(he.x, he.y);
      ctx.globalAlpha = alpha;
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2 + he.timer * 0.3;
        const r = size * (1 - he.timer / 10) + 5;
        ctx.strokeStyle = i % 2 === 0 ? '#fff' : '#ff0';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(Math.cos(angle) * r * 0.3, Math.sin(angle) * r * 0.3);
        ctx.lineTo(Math.cos(angle) * r, Math.sin(angle) * r);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
      ctx.restore();
    }
  }

  draw(ctx) {
    // Draw as punching bag or mannequin in practice mode (drone draws as normal fighter)
    if (gameMode === 'practice' && !this.isPlayer && !this.char.isDrone) {
      if (this.char.isMannequin) {
        this.drawMannequin(ctx);
        return;
      }
      this.drawBag(ctx);
      return;
    }

    // Buck: draw fireworks and explosions (world space)
    if (this.char.isBuck) {
      ctx.save();
      // Firework projectiles with trails
      for (const fw of this.buckFireworks) {
        // Trail
        for (const t of fw.trail) {
          ctx.globalAlpha = t.timer / 8 * 0.5;
          ctx.fillStyle = fw.color;
          ctx.beginPath();
          ctx.arc(t.x, t.y, 2, 0, Math.PI * 2);
          ctx.fill();
        }
        // Firework head
        ctx.globalAlpha = 1;
        ctx.fillStyle = fw.color;
        ctx.beginPath();
        ctx.arc(fw.x, fw.y, 4, 0, Math.PI * 2);
        ctx.fill();
        // Bright core
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(fw.x, fw.y, 1.5, 0, Math.PI * 2);
        ctx.fill();
      }
      // Explosion particles
      for (const e of this.buckExplosions) {
        if (e.text) {
          ctx.globalAlpha = Math.min(1, e.timer / 15);
          const scale = 1 + (1 - e.timer / 30) * 0.5;
          ctx.save();
          ctx.translate(e.x, e.y);
          ctx.scale(scale, scale);
          ctx.font = 'bold 14px Arial';
          ctx.textAlign = 'center';
          ctx.strokeStyle = '#000';
          ctx.lineWidth = 3;
          ctx.strokeText(e.text, 0, 0);
          ctx.fillStyle = e.color;
          ctx.fillText(e.text, 0, 0);
          ctx.restore();
        } else {
          ctx.globalAlpha = e.timer / 20;
          ctx.fillStyle = e.color;
          ctx.beginPath();
          ctx.arc(e.x, e.y, 3 + (1 - e.timer / 20) * 2, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
      ctx.restore();
    }

    // X-haust: draw oil puddles and flames
    if (this.char.isXhaust) {
      ctx.save();
      // Oil puddles
      for (const p of this.xhaustOilPuddles) {
        ctx.fillStyle = 'rgba(30, 20, 10, 0.7)';
        ctx.beginPath();
        ctx.ellipse(p.x, p.y, p.width / 2, 4, 0, 0, Math.PI * 2);
        ctx.fill();
        // Sheen
        ctx.fillStyle = 'rgba(80, 60, 40, 0.4)';
        ctx.beginPath();
        ctx.ellipse(p.x - p.width * 0.15, p.y - 1, p.width * 0.2, 2, 0, 0, Math.PI * 2);
        ctx.fill();
      }
      // Flames
      for (const f of this.xhaustFlames) {
        const intensity = f.timer / 90;
        const hw = f.width / 2 + 10;
        // Fire glow on ground
        ctx.fillStyle = `rgba(255, 100, 0, ${intensity * 0.3})`;
        ctx.beginPath();
        ctx.ellipse(f.x, f.y, hw + 5, 6, 0, 0, Math.PI * 2);
        ctx.fill();
        // Flame tongues
        const t = Date.now() * 0.01;
        for (let fi = 0; fi < 8; fi++) {
          const fx = f.x - hw + (fi / 7) * hw * 2;
          const fh = (15 + Math.sin(t + fi * 2.3) * 8) * intensity;
          const fw = 6 + Math.sin(t * 1.3 + fi) * 2;
          ctx.fillStyle = fi % 2 === 0 ? `rgba(255, 140, 0, ${intensity * 0.8})` : `rgba(255, 60, 0, ${intensity * 0.9})`;
          ctx.beginPath();
          ctx.moveTo(fx - fw, f.y);
          ctx.quadraticCurveTo(fx - fw * 0.3, f.y - fh * 0.6, fx, f.y - fh);
          ctx.quadraticCurveTo(fx + fw * 0.3, f.y - fh * 0.6, fx + fw, f.y);
          ctx.closePath();
          ctx.fill();
        }
        // Bright core
        ctx.fillStyle = `rgba(255, 220, 100, ${intensity * 0.5})`;
        ctx.beginPath();
        ctx.ellipse(f.x, f.y - 2, hw * 0.6, 4, 0, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }

    // Vortice: draw tornado particles
    if (this.char.isVortice && this.vorticeTornadoParticles.length > 0) {
      ctx.save();
      for (const p of this.vorticeTornadoParticles) {
        ctx.globalAlpha = (p.timer / 50) * 0.6;
        ctx.fillStyle = p.pushing
          ? (p.timer % 4 < 2 ? '#ee8866' : '#ffbb99')
          : (p.timer % 4 < 2 ? '#88eebb' : '#bbffdd');
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      // Draw tornado funnel outline when active
      if (this.vorticeTornado || this.vorticePushing) {
        const isPush = this.vorticePushing;
        ctx.globalAlpha = 0.15;
        ctx.fillStyle = isPush ? '#ee8866' : '#88eebb';
        ctx.beginPath();
        if (isPush) {
          // Inverted funnel — narrow at center, wide at edges
          ctx.moveTo(this.x - 10, this.y - 85);
          ctx.lineTo(this.x + 10, this.y - 85);
          ctx.lineTo(this.x + 60, this.y - 5);
          ctx.lineTo(this.x - 60, this.y - 5);
        } else {
          // Normal funnel — wide at top, narrow at bottom
          ctx.moveTo(this.x - 15, this.y - 85);
          ctx.lineTo(this.x + 15, this.y - 85);
          ctx.lineTo(this.x + 50, this.y - 5);
          ctx.lineTo(this.x - 50, this.y - 5);
        }
        ctx.closePath();
        ctx.fill();
        // Swirling lines
        ctx.globalAlpha = 0.3;
        ctx.strokeStyle = isPush ? '#ee8866' : '#88eebb';
        ctx.lineWidth = 1.5;
        const t = Date.now() * 0.005;
        for (let row = 0; row < 4; row++) {
          const rowY = this.y - 15 - row * 18;
          const rowW = isPush ? 50 - row * 10 : 15 + (3 - row) * 12;
          ctx.beginPath();
          ctx.arc(this.x + Math.sin(t + row * 1.5) * 5, rowY, rowW, 0, Math.PI, isPush ? false : true);
          ctx.stroke();
        }
      }
      ctx.globalAlpha = 1;
      ctx.restore();
    }

    // Exor: draw soul particles (world space wisps flowing from target to self)
    if (this.char.isExor && this.exorSoulParticles.length > 0) {
      ctx.save();
      for (const p of this.exorSoulParticles) {
        const t = p.t;
        // Bezier interpolation with a curve
        const midX = (p.x + p.tx) / 2 + (Math.random() - 0.5) * 10;
        const midY = (p.y + p.ty) / 2 - 30;
        const cx = (1 - t) * (1 - t) * p.x + 2 * (1 - t) * t * midX + t * t * p.tx;
        const cy = (1 - t) * (1 - t) * p.y + 2 * (1 - t) * t * midY + t * t * p.ty;
        ctx.globalAlpha = (1 - t) * 0.8;
        ctx.fillStyle = '#39ff14';
        ctx.beginPath();
        ctx.arc(cx, cy, 3 + (1 - t) * 2, 0, Math.PI * 2);
        ctx.fill();
        // Inner glow
        ctx.fillStyle = '#aaffaa';
        ctx.globalAlpha = (1 - t) * 0.5;
        ctx.beginPath();
        ctx.arc(cx, cy, 1.5, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }

    // Killa Watt: draw lightning bolts to target
    if (this.char.isKillawatt && this.kwZapEffect) {
      ctx.save();
      for (const bolt of this.kwZapEffect.bolts) {
        ctx.beginPath();
        ctx.moveTo(bolt[0].x, bolt[0].y);
        for (let i = 1; i < bolt.length; i++) {
          ctx.lineTo(bolt[i].x, bolt[i].y);
        }
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 3;
        ctx.globalAlpha = 0.9;
        ctx.stroke();
        ctx.strokeStyle = '#00e5ff';
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }
      ctx.restore();
    }

    // Matador: draw rose particles (world space)
    if (this.char.isMatador && this.matadorRoses.length > 0) {
      for (const r of this.matadorRoses) {
        ctx.save();
        ctx.translate(r.x, r.y);
        ctx.rotate(r.rot);
        const alpha = r.landed ? Math.min(1, r.timer / 20) : 1;
        ctx.globalAlpha = alpha;
        // Stem
        ctx.strokeStyle = '#2a6a2a';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, 10);
        ctx.stroke();
        // Petals
        ctx.fillStyle = '#cc0033';
        ctx.beginPath();
        ctx.arc(-2, -2, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#ff1144';
        ctx.beginPath();
        ctx.arc(1, -3, 3.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#aa0022';
        ctx.beginPath();
        ctx.arc(0, 0, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    // Bozollok: draw decomposing husk
    if (this.char.isBozollok && this.moltHusk) {
      ctx.save();
      ctx.translate(this.moltHusk.x, this.moltHusk.y);
      const huskAlpha = this.moltHusk.timer / 90;
      ctx.globalAlpha = huskAlpha * 0.6;
      const h = this.height;
      // Crumbling shell shape
      ctx.fillStyle = '#5a4a2a';
      ctx.beginPath();
      ctx.moveTo(-14, 0);
      ctx.lineTo(-12, -h + 15);
      ctx.quadraticCurveTo(0, -h + 5, 12, -h + 15);
      ctx.lineTo(14, 0);
      ctx.closePath();
      ctx.fill();
      // Crack lines
      ctx.strokeStyle = '#3a2a0a';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(-2, -h + 15);
      ctx.lineTo(-5, -h * 0.5);
      ctx.lineTo(3, -h * 0.3);
      ctx.lineTo(-1, 0);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(6, -h + 18);
      ctx.lineTo(8, -h * 0.6);
      ctx.lineTo(4, -h * 0.2);
      ctx.stroke();
      // Decomposition particles
      if (this.moltHusk.timer < 60) {
        const particleCount = Math.floor((60 - this.moltHusk.timer) / 10);
        for (let p = 0; p < particleCount; p++) {
          const px = (Math.sin(this.moltHusk.timer * 0.1 + p * 3) * 15);
          const py = -h * 0.5 + Math.cos(this.moltHusk.timer * 0.08 + p * 2) * 20 - (60 - this.moltHusk.timer) * 0.3;
          ctx.globalAlpha = huskAlpha * 0.4;
          ctx.fillStyle = '#8a7a4a';
          ctx.beginPath();
          ctx.arc(px, py, 2, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.restore();
    }

    // Golgar: draw dormant entity as stone statue
    if (this.char.isGolgar && !(rumbleActive && rumbleType === 'GOLGAR')) {
      ctx.save();
      ctx.translate(this.golgarOtherX, this.golgarOtherY);
      ctx.globalAlpha = 0.6;
      const df = this.golgarOtherFacing;
      const stoneColor = '#777788';
      const stoneDark = '#555566';
      const stoneLight = '#999aaa';
      // Shadow
      ctx.fillStyle = 'rgba(0,0,0,0.2)';
      ctx.beginPath();
      ctx.ellipse(0, 2, 30, 6, 0, 0, Math.PI * 2);
      ctx.fill();
      // Legs
      ctx.strokeStyle = stoneDark;
      ctx.lineWidth = 6;
      ctx.lineCap = 'round';
      ctx.beginPath(); ctx.moveTo(-df * 6, -8); ctx.lineTo(-df * 10, 0); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(df * 6, -8); ctx.lineTo(df * 10, 0); ctx.stroke();
      ctx.strokeStyle = stoneColor;
      ctx.lineWidth = 4;
      ctx.beginPath(); ctx.moveTo(-df * 6, -8); ctx.lineTo(-df * 10, 0); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(df * 6, -8); ctx.lineTo(df * 10, 0); ctx.stroke();
      // Feet
      ctx.fillStyle = stoneDark;
      ctx.beginPath(); ctx.arc(-df * 10, 0, 5, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(df * 10, 0, 5, 0, Math.PI * 2); ctx.fill();
      // Body
      ctx.fillStyle = stoneColor;
      ctx.strokeStyle = stoneDark;
      ctx.lineWidth = 2;
      ctx.beginPath(); ctx.roundRect(-16, -48, 32, 40, 6); ctx.fill(); ctx.stroke();
      // Chest
      ctx.fillStyle = stoneLight;
      ctx.beginPath(); ctx.roundRect(-10, -40, 20, 20, 3); ctx.fill();
      // Arms (at rest)
      const armY = -36;
      ctx.strokeStyle = stoneDark; ctx.lineWidth = 6;
      ctx.beginPath(); ctx.moveTo(-df * 14, armY); ctx.lineTo(-df * 28, armY + 15); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(df * 14, armY); ctx.lineTo(df * 28, armY + 15); ctx.stroke();
      ctx.strokeStyle = stoneColor; ctx.lineWidth = 4;
      ctx.beginPath(); ctx.moveTo(-df * 14, armY); ctx.lineTo(-df * 28, armY + 15); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(df * 14, armY); ctx.lineTo(df * 28, armY + 15); ctx.stroke();
      // Fists
      ctx.fillStyle = stoneLight;
      ctx.beginPath(); ctx.arc(-df * 28, armY + 15, 4, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(df * 28, armY + 15, 4, 0, Math.PI * 2); ctx.fill();
      // Head
      ctx.fillStyle = stoneLight;
      ctx.strokeStyle = stoneDark;
      ctx.lineWidth = 2;
      ctx.beginPath(); ctx.arc(0, -64, 16, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
      // Closed eyes (dormant)
      ctx.strokeStyle = stoneDark;
      ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(-7, -65); ctx.lineTo(-1, -65); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(2, -65); ctx.lineTo(8, -65); ctx.stroke();
      ctx.restore();
    }

    const flash = this.flashTimer > 0 && this.flashTimer % 2 === 0;
    const frozen = this.frozenTimer > 0;
    const inWater = this.waterPhase;
    const color = flash ? '#fff' : frozen ? '#88ccff' : inWater ? '#44bbee' : this.char.color;
    const accent = flash ? '#fff' : frozen ? '#bbddff' : inWater ? '#88eeff' : this.char.accent;
    const outline = flash ? '#ccc' : frozen ? '#4488aa' : inWater ? '#2299bb' : this.char.outline;

    ctx.save();
    // Duplaire clone alpha
    if (this._isCloneDraw) {
      ctx.globalAlpha = this._cloneAlpha;
    }
    if (this.phaseTimer > 0) ctx.globalAlpha = 0.4;
    if (this.waterPhase) ctx.globalAlpha = 0.35;
    // Rumble alpha override (used by Torrena evaporation/reappear)
    if (this._rumbleAlpha !== undefined) {
      ctx.globalAlpha = Math.min(ctx.globalAlpha, this._rumbleAlpha);
      if (this._rumbleAlpha <= 0) { ctx.restore(); return; }
    }
    // Rumble scale override (used by Corvida drop)
    if (this._rumbleScale !== undefined && this._rumbleScale !== 1) {
      ctx.translate(this.x, this.y);
      ctx.scale(this._rumbleScale, this._rumbleScale);
      ctx.translate(-this.x, -this.y);
    }
    // Codemax: holographic flicker
    if (this.char.isCodemax) {
      ctx.globalAlpha = 0.75 + Math.sin(Date.now() * 0.02) * 0.1;
    }
    // Haystack: hide body while exploding, show reforming shimmer
    if (this.char.isHaystack && this.exploding) {
      // Draw reform shimmer at character position
      ctx.save();
      ctx.translate(this.x, this.y);
      if (this.reformTimer < 30) {
        ctx.globalAlpha = (30 - this.reformTimer) / 30 * 0.5;
        ctx.fillStyle = '#c4a35a';
        ctx.beginPath();
        ctx.ellipse(0, -25, 16, 25, 0, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
      // Draw projectiles and hay particles (outside body)
      this.drawHaystackProjectiles(ctx);
      ctx.restore();
      return;
    }
    const kwVibX = this.kwStunTimer > 0 ? (Math.random() - 0.5) * 6 : 0;
    const kwVibY = this.kwStunTimer > 0 ? (Math.random() - 0.5) * 4 : 0;
    ctx.translate(this.x + kwVibX, this.y + kwVibY);
    if (this._rumbleRotation) ctx.rotate(this._rumbleRotation);
    if (this.char.isBojdo) ctx.scale(this.bojdoScale, this.bojdoScale);
    if (this.isJay) ctx.scale(this.jayScale, this.jayScale);
    if (this.bojShrinkTimer > 0 && !this.char.isBojdo) ctx.scale(0.3, 0.3);

    const f = this.facing;
    const crouch = this.crouching ? 15 : 0;
    const bob = Math.sin(this.animTimer * 0.3 + this.animFrame) * 2;

    // Shadow
    ctx.fillStyle = 'rgba(0,0,0,0.3)';
    ctx.beginPath();
    ctx.ellipse(0, 2, 30, 6, 0, 0, Math.PI * 2);
    ctx.fill();

    // Codemax: holographic base glow
    if (this.char.isCodemax) {
      ctx.save();
      ctx.globalAlpha = 0.2 + Math.sin(Date.now() * 0.005) * 0.1;
      ctx.fillStyle = '#00ff88';
      ctx.beginPath();
      ctx.ellipse(0, 1, 25, 5, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    // Snazz McJazz: neon dance floor glow under feet
    if (this.char.isSnazz) {
      const t = Date.now() * 0.003;
      const neonColors = ['#ff00ff', '#00ffff', '#ff4400', '#44ff00', '#ffff00'];
      const ci = Math.floor(t * 2) % neonColors.length;
      const glowAlpha = this.dancing ? 0.5 + Math.sin(t * 4) * 0.2 : 0.15 + Math.sin(t) * 0.05;
      ctx.save();
      ctx.globalAlpha = glowAlpha;
      // Dance floor tiles (third panel only shows while dancing)
      for (let dx = -1; dx <= 1; dx++) {
        if (dx === -1 && !this.dancing) continue;
        const tileColor = neonColors[(ci + dx + neonColors.length) % neonColors.length];
        ctx.fillStyle = tileColor;
        ctx.fillRect(-20 + dx * 20, -2, 18, 6);
      }
      // Upward glow onto character (wider when dancing to cover all 3 tiles)
      const glowLeft = this.dancing ? -40 : -20;
      const glowWidth = this.dancing ? 60 : 40;
      const grad = ctx.createLinearGradient(0, 0, 0, -70);
      grad.addColorStop(0, neonColors[ci]);
      grad.addColorStop(1, 'transparent');
      ctx.fillStyle = grad;
      ctx.globalAlpha = this.dancing ? 0.3 : 0.1;
      ctx.fillRect(glowLeft, -70, glowWidth, 70);
      ctx.restore();
    }

    // Corvida: draw blue jay form instead of normal body
    if (this.isJay) {
      const isCyanoJay = this.cyanoJayTimer > 0;
      const jayMain = isCyanoJay ? this.char.accent : '#4a90d9';
      const jayDark = isCyanoJay ? this.char.outline : '#2a5fa8';
      const jayWing = isCyanoJay ? this.char.color : '#3a7bc8';
      const wingFlap = Math.sin(Date.now() * 0.015) * 0.6;
      ctx.save();
      ctx.translate(0, -25);
      // Body (oval)
      ctx.fillStyle = jayMain;
      ctx.strokeStyle = '#1a1a2e';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.ellipse(0, 0, 14, 10, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      // White chest
      ctx.fillStyle = '#ddeeff';
      ctx.beginPath();
      ctx.ellipse(0, 3, 8, 6, 0, 0, Math.PI);
      ctx.fill();
      // Head
      ctx.fillStyle = jayMain;
      ctx.beginPath();
      ctx.arc(f * 10, -6, 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#1a1a2e';
      ctx.stroke();
      // Blue crest
      ctx.fillStyle = jayDark;
      ctx.beginPath();
      ctx.moveTo(f * 10, -14);
      ctx.lineTo(f * 6, -18);
      ctx.lineTo(f * 14, -12);
      ctx.closePath();
      ctx.fill();
      // Eye
      ctx.fillStyle = '#111';
      ctx.beginPath();
      ctx.arc(f * 13, -7, 2, 0, Math.PI * 2);
      ctx.fill();
      // Beak
      ctx.fillStyle = '#333';
      ctx.beginPath();
      ctx.moveTo(f * 18, -6);
      ctx.lineTo(f * 25, -5);
      ctx.lineTo(f * 18, -3);
      ctx.closePath();
      ctx.fill();
      // Black necklace
      ctx.strokeStyle = '#111';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(f * 10, -2, 8, 0.3, Math.PI - 0.3);
      ctx.stroke();
      // Wings (back wing drawn first, then front wing)
      // Back wing (opposite side from facing)
      ctx.save();
      ctx.rotate(-wingFlap * f);
      ctx.fillStyle = jayWing;
      ctx.beginPath();
      ctx.moveTo(-f * 8, -3);
      ctx.lineTo(-f * 24, -15);
      ctx.lineTo(-f * 16, 2);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.moveTo(-f * 14, -5);
      ctx.lineTo(-f * 22, -12);
      ctx.lineTo(-f * 16, -2);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
      // Front wing (same side as facing)
      ctx.save();
      ctx.rotate(wingFlap * f);
      ctx.fillStyle = jayWing;
      ctx.beginPath();
      ctx.moveTo(-f * 8, -3);
      ctx.lineTo(-f * 24, -15);
      ctx.lineTo(-f * 16, 2);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.moveTo(-f * 14, -5);
      ctx.lineTo(-f * 22, -12);
      ctx.lineTo(-f * 16, -2);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
      // Tail feathers
      ctx.fillStyle = jayDark;
      ctx.beginPath();
      ctx.moveTo(-f * 14, 0);
      ctx.lineTo(-f * 28, 5);
      ctx.lineTo(-f * 26, -2);
      ctx.lineTo(-f * 22, 7);
      ctx.lineTo(-f * 14, 4);
      ctx.closePath();
      ctx.fill();
      // White tail tips
      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.moveTo(-f * 26, 4);
      ctx.lineTo(-f * 28, 5);
      ctx.lineTo(-f * 26, -1);
      ctx.closePath();
      ctx.fill();
      ctx.restore();

      // Skip normal body rendering
      ctx.restore();

      // Hit effect (duplicated for jay form)
      if (this.hitEffect) {
        const he = this.hitEffect;
        const size = he.type === 'big' ? 25 : 15;
        const alpha = he.timer / 10;
        ctx.save();
        ctx.translate(he.x, he.y);
        ctx.globalAlpha = alpha;
        for (let i = 0; i < 8; i++) {
          const angle = (i / 8) * Math.PI * 2 + he.timer * 0.3;
          const r = size * (1 - he.timer / 10) + 5;
          ctx.strokeStyle = i % 2 === 0 ? '#fff' : '#ff0';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(Math.cos(angle) * r * 0.3, Math.sin(angle) * r * 0.3);
          ctx.lineTo(Math.cos(angle) * r, Math.sin(angle) * r);
          ctx.stroke();
        }
        ctx.globalAlpha = 1;
        ctx.restore();
      }

      // Teleport ghost
      if (this.teleportGhost && this.teleportGhost.timer > 0) {
        ctx.save();
        ctx.globalAlpha = this.teleportGhost.timer / 15 * 0.5;
        ctx.translate(this.teleportGhost.x, this.teleportGhost.y);
        ctx.fillStyle = this.char.accent;
        ctx.beginPath();
        ctx.ellipse(0, -25, 14, 10, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // Draw assist projectile
      if (this.assistActive) {
        ctx.save();
        this.drawAssistProjectile(this.assistActive);
        ctx.restore();
      }
      return;
    }

    // Batsch: draw tortoise form instead of normal body
    if (this.isTortoise) {
      const flash = this.flashTimer > 0 && this.flashTimer % 2 === 0;
      const isStudTortoise = this.studTortoiseTimer > 0;
      const shellColor = flash ? '#fff' : (isStudTortoise ? this.char.accent : '#5a7a3a');
      const shellDark = flash ? '#ccc' : (isStudTortoise ? this.char.outline : '#3a5a1a');
      const skinColor = flash ? '#eee' : (isStudTortoise ? this.char.color : '#7a9a5a');

      ctx.save();
      ctx.translate(0, -8);

      // Shell (dome)
      ctx.fillStyle = shellColor;
      ctx.strokeStyle = shellDark;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.ellipse(0, 0, 22, 14, 0, Math.PI, 0);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Shell bottom
      ctx.fillStyle = shellDark;
      ctx.fillRect(-22, -2, 44, 5);

      // Shell pattern (hexagonal segments)
      ctx.strokeStyle = shellDark;
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(-8, -12); ctx.lineTo(-8, 0); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(8, -12); ctx.lineTo(8, 0); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(-15, -6); ctx.lineTo(15, -6); ctx.stroke();

      // Head poking out front
      ctx.fillStyle = skinColor;
      ctx.beginPath();
      ctx.ellipse(f * 22, 0, 7, 6, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = shellDark;
      ctx.lineWidth = 1;
      ctx.stroke();
      // Eyes
      ctx.fillStyle = '#111';
      ctx.beginPath(); ctx.arc(f * 25, -3, 1.5, 0, Math.PI * 2); ctx.fill();
      // Mouth (biting when attacking)
      if (this.state === 'attack') {
        ctx.strokeStyle = '#111';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(f * 28, 1);
        ctx.lineTo(f * 32, -1);
        ctx.lineTo(f * 28, 3);
        ctx.stroke();
      }

      // Legs (small, poking out underneath)
      ctx.fillStyle = skinColor;
      ctx.fillRect(-14, 2, 6, 5);  // back left
      ctx.fillRect(8, 2, 6, 5);    // back right
      // Tail (small, poking out back)
      ctx.fillStyle = skinColor;
      ctx.beginPath();
      ctx.moveTo(-f * 20, 0);
      ctx.lineTo(-f * 28, 2);
      ctx.lineTo(-f * 20, 3);
      ctx.closePath();
      ctx.fill();

      ctx.restore();

      // Skip normal body rendering
      ctx.restore();

      // Hit effect (duplicated for tortoise form)
      if (this.hitEffect) {
        const he = this.hitEffect;
        const size = he.type === 'big' ? 25 : 15;
        const alpha = he.timer / 10;
        ctx.save();
        ctx.translate(he.x, he.y);
        ctx.globalAlpha = alpha;
        for (let i = 0; i < 8; i++) {
          const angle = (i / 8) * Math.PI * 2 + he.timer * 0.3;
          const r = size * (1 - he.timer / 10) + 5;
          ctx.strokeStyle = i % 2 === 0 ? '#fff' : '#ff0';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(Math.cos(angle) * r * 0.3, Math.sin(angle) * r * 0.3);
          ctx.lineTo(Math.cos(angle) * r, Math.sin(angle) * r);
          ctx.stroke();
        }
        ctx.globalAlpha = 1;
        ctx.restore();
      }

      // Teleport ghost
      if (this.teleportGhost && this.teleportGhost.timer > 0) {
        ctx.save();
        ctx.globalAlpha = this.teleportGhost.timer / 15 * 0.5;
        ctx.translate(this.teleportGhost.x, this.teleportGhost.y - 8);
        ctx.fillStyle = this.char.accent;
        ctx.beginPath();
        ctx.ellipse(0, 0, 22, 14, 0, Math.PI, 0);
        ctx.fill();
        ctx.restore();
      }

      // Draw assist projectile
      if (this.assistActive) {
        ctx.save();
        this.drawAssistProjectile(this.assistActive);
        ctx.restore();
      }
      return;
    }

    // Paletap: taller body scaling
    const isPaletap = this.char.isPaletap;
    const isBuck = this.char.isBuck;
    const ptScale = isPaletap ? 1.7 : 1; // height multiplier
    const ptLegLen = isPaletap ? 2.0 : 1;
    const ptArmLen = isPaletap ? 1.8 : 1;

    // Body offset for states
    let bodyOffsetX = 0;
    let bodyOffsetY = bob + crouch;
    let armAngle = 0;
    let legSpread = 0;

    // Paletap: offset up to account for taller body
    if (isPaletap) bodyOffsetY -= 55;

    if (this.state === 'walk') {
      legSpread = Math.sin(this.animTimer * 0.5) * 12;
      // Paletap limping walk — staggery, uneven gait
      if (isPaletap) {
        const limpPhase = Math.sin(this.animTimer * 0.25);
        const limpPhase2 = Math.sin(this.animTimer * 0.4 + 1.2);
        // Asymmetric bob: drops hard on one step, lighter on the other
        bodyOffsetY += (limpPhase > 0 ? limpPhase * 10 : Math.abs(limpPhase) * 3);
        // Jerky lateral sway
        bodyOffsetX += limpPhase * 6 + limpPhase2 * 3;
      }
    }

    // Paletap slam animation: bend forward and drum fists on the ground
    let paletapSlamBend = 0;
    if (isPaletap && this.paletapSlamming) {
      // Phases: 0-6 bend forward, 7-10 first hit, 11-14 lift, 15-18 second hit, 19-20 hold
      const fr = this.paletapSlamFrame;
      const bendDown = Math.min(1, fr / 6); // body bends forward over first 6 frames
      paletapSlamBend = bendDown;
      // Body leans forward and drops
      bodyOffsetY += bendDown * 30;
      bodyOffsetX += f * bendDown * 12;
      // Legs bend to support the lean
      legSpread = bendDown * 15;
    }

    // Snazz McJazz dance animation
    if (this.dancing) {
      const dt = Date.now() * 0.008;
      bodyOffsetX = Math.sin(dt * 3) * 12;
      bodyOffsetY += Math.sin(dt * 6) * 4;
      legSpread = Math.sin(dt * 3) * 18;
      armAngle = Math.sin(dt * 4) * 1.5;
    }

    if (this.state === 'attack' && this.currentAttack) {
      const progress = this.attackFrame / (this.currentAttack.startup + this.currentAttack.active + this.currentAttack.recovery);
      const sinP = Math.sin(progress * Math.PI);
      if (this.currentAttack === attacks.jab) {
        armAngle = sinP * 1.2;
        bodyOffsetX = f * sinP * 10;
      } else if (this.currentAttack === attacks.uppercut) {
        armAngle = -sinP * 2.0;
        bodyOffsetY -= sinP * 15;
      } else if (this.currentAttack === attacks.highKick) {
        legSpread = sinP * 30;
        bodyOffsetX = f * sinP * 5;
      } else if (this.currentAttack === attacks.lowKick) {
        legSpread = sinP * 25;
        bodyOffsetY += sinP * 5;
      }
      // Rubberman: override limb extension to reach the opponent
      if (this.char.isRubberman && this.rubberStretch > 0) {
        const reach = sinP * this.rubberStretch;
        if (this.currentAttack === attacks.jab || this.currentAttack === attacks.uppercut) {
          this.rubberArmReach = reach;
        } else {
          this.rubberLegReach = reach;
        }
      }
    } else {
      this.rubberArmReach = 0;
      this.rubberLegReach = 0;
    }

    if (this.state === 'hitstun' || this.state === 'blockstun') {
      bodyOffsetX = -f * 5;
    }

    ctx.translate(bodyOffsetX, bodyOffsetY);

    // Legs
    // Rubberman: front leg stretches to reach opponent during kicks, back leg stays normal
    const legLen = 8 * ptLegLen;
    const backLegX = -f * 10 - legSpread * 0.3 * (-f);
    const frontLegBaseX = f * 10 + legSpread * 0.3 * f;
    const frontLegX = this.rubberLegReach > 0 ? f * this.rubberLegReach : frontLegBaseX;
    // Paletap: legs extend down to the ground from the elevated body
    const legTopY = -legLen;
    let legBotY = isPaletap ? 55 : 0;
    // Paletap limping: one leg shorter
    const limpOffset = isPaletap && this.state === 'walk' ? Math.sin(this.animTimer * 0.3) * 4 : 0;
    // Bojdo stomp: raise front leg during Death from Above
    let stompFrontLegRaise = 0;
    if (this.char.isBojdo && rumbleBojdoPhase === 1) {
      stompFrontLegRaise = -legLen * 1.2; // raise foot high
    }
    ctx.strokeStyle = outline;
    ctx.lineWidth = isPaletap ? 7 : isBuck ? 9 : 6;
    ctx.lineCap = 'round';
    // Back leg
    ctx.beginPath();
    ctx.moveTo(-f * 6, legTopY);
    if (isPaletap) {
      const kneeX = -f * 8 + (backLegX + f * 6) * 0.5;
      const kneeY = (legTopY + legBotY) * 0.5 + 3;
      ctx.lineTo(kneeX, kneeY);
      ctx.lineTo(backLegX, legBotY + limpOffset);
    } else {
      ctx.lineTo(backLegX, legBotY);
    }
    ctx.stroke();
    // Front leg
    const frontFootY = legBotY + stompFrontLegRaise;
    ctx.beginPath();
    ctx.moveTo(f * 6, legTopY);
    if (isPaletap) {
      const kneeX = f * 8 + (frontLegX - f * 6) * 0.5;
      const kneeY = (legTopY + frontFootY) * 0.5 + 3;
      ctx.lineTo(kneeX, kneeY);
      ctx.lineTo(frontLegX, frontFootY - limpOffset);
    } else {
      if (stompFrontLegRaise !== 0) {
        // Bent knee for raised leg
        const kneeX = f * 12;
        const kneeY = (legTopY + frontFootY) * 0.5;
        ctx.lineTo(kneeX, kneeY);
        ctx.lineTo(frontLegX + f * 4, frontFootY);
      } else {
        ctx.lineTo(frontLegX, frontFootY);
      }
    }
    ctx.stroke();

    // Leg colors
    ctx.strokeStyle = color;
    ctx.lineWidth = isPaletap ? 5 : isBuck ? 7 : 4;
    ctx.beginPath();
    ctx.moveTo(-f * 6, legTopY);
    if (isPaletap) {
      const kneeX = -f * 8 + (backLegX + f * 6) * 0.5;
      const kneeY = (legTopY + legBotY) * 0.5 + 3;
      ctx.lineTo(kneeX, kneeY);
      ctx.lineTo(backLegX, legBotY + limpOffset);
    } else {
      ctx.lineTo(backLegX, legBotY);
    }
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(f * 6, legTopY);
    if (isPaletap) {
      const kneeX = f * 8 + (frontLegX - f * 6) * 0.5;
      const kneeY = (legTopY + frontFootY) * 0.5 + 3;
      ctx.lineTo(kneeX, kneeY);
      ctx.lineTo(frontLegX, frontFootY - limpOffset);
    } else {
      if (stompFrontLegRaise !== 0) {
        const kneeX = f * 12;
        const kneeY = (legTopY + frontFootY) * 0.5;
        ctx.lineTo(kneeX, kneeY);
        ctx.lineTo(frontLegX + f * 4, frontFootY);
      } else {
        ctx.lineTo(frontLegX, frontFootY);
      }
    }
    ctx.stroke();

    // Feet
    ctx.fillStyle = outline;
    ctx.beginPath();
    ctx.arc(backLegX, legBotY + (isPaletap ? limpOffset : 0), isPaletap ? 6 : 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(stompFrontLegRaise !== 0 ? frontLegX + f * 4 : frontLegX, frontFootY - (isPaletap ? limpOffset : 0), isPaletap ? 6 : 5, 0, Math.PI * 2);
    ctx.fill();

    // Paletap: lean upper body forward
    if (isPaletap) {
      ctx.save();
      ctx.translate(0, -legLen);
      ctx.rotate(f * 0.15);
      ctx.translate(0, legLen);
    }

    // Body
    ctx.fillStyle = color;
    ctx.strokeStyle = outline;
    ctx.lineWidth = 2;
    const bodyH = (40 - crouch) * ptScale;
    const bodyW = isPaletap ? 18 : 16;
    const gourmandBulge = this.char.isGourmand ? (this.gourmandEnergy / this.gourmandMaxEnergy) * 12 : 0;
    ctx.beginPath();
    ctx.roundRect(-bodyW - gourmandBulge, -legLen - bodyH, bodyW * 2 + gourmandBulge * 2, bodyH, 6);
    ctx.fill();
    ctx.stroke();

    // Chest detail
    ctx.fillStyle = accent;
    ctx.beginPath();
    ctx.roundRect(-10 - gourmandBulge * 0.6, -legLen - bodyH + 8, 20 + gourmandBulge * 1.2, bodyH - 20, 3);
    ctx.fill();

    // Arms
    const armY = -legLen - bodyH + 12;
    const backArmLen = 15 * ptArmLen;
    const frontArmBase = 28 * ptArmLen;

    let armEndX = 0, armEndY = armY;

    // Paletap slam: drumming motion — bend forward, alternate fists hitting the ground
    if (isPaletap && paletapSlamBend > 0) {
      const groundY = legBotY;
      const fr = this.paletapSlamFrame;
      // Arm positions in front of him, like drumsticks
      // Each arm cycles: raised -> swing down -> hit ground -> lift back up
      // Arm 1 (front arm): hits at frame 8, lifts by 12
      // Arm 2 (back arm): hits at frame 14, lifts by 18
      const drawArm = (side, hitFrame) => {
        const shoulderX = side * 16;
        const shoulderYPos = armY;
        // Target: in front, on the ground
        const targetX = f * 35 + side * 5;
        const targetY = groundY;
        // Arm swing: raised -> down -> bounce back up slightly
        let swing;
        if (fr < hitFrame - 4) {
          // Raised position: arm is up, cocked back ready to strike
          swing = 0;
        } else if (fr < hitFrame) {
          // Swinging down (4 frames)
          swing = (fr - (hitFrame - 4)) / 4;
        } else if (fr < hitFrame + 3) {
          // On ground (impact)
          swing = 1;
        } else {
          // Slight bounce back
          swing = Math.max(0.6, 1 - (fr - hitFrame - 3) * 0.1);
        }
        // Fist position: interpolate from raised to ground
        const raisedX = f * 20 + side * 10;
        const raisedY = shoulderYPos - 15;
        const fistX = raisedX + (targetX - raisedX) * swing;
        const fistY = raisedY + (targetY - raisedY) * swing;
        // Elbow: arcs up when raised, comes down with the strike
        const elbowX = (shoulderX + fistX) * 0.5 + side * 5;
        const elbowY = Math.min(shoulderYPos, fistY) - 15 * (1 - swing * 0.5);
        // Draw upper arm (shoulder to elbow)
        ctx.strokeStyle = outline;
        ctx.lineWidth = 7;
        ctx.lineCap = 'round';
        ctx.beginPath(); ctx.moveTo(shoulderX, shoulderYPos); ctx.lineTo(elbowX, elbowY); ctx.stroke();
        ctx.strokeStyle = color;
        ctx.lineWidth = 5;
        ctx.beginPath(); ctx.moveTo(shoulderX, shoulderYPos); ctx.lineTo(elbowX, elbowY); ctx.stroke();
        // Draw forearm (elbow to fist)
        ctx.strokeStyle = outline;
        ctx.lineWidth = 7;
        ctx.beginPath(); ctx.moveTo(elbowX, elbowY); ctx.lineTo(fistX, fistY); ctx.stroke();
        ctx.strokeStyle = color;
        ctx.lineWidth = 5;
        ctx.beginPath(); ctx.moveTo(elbowX, elbowY); ctx.lineTo(fistX, fistY); ctx.stroke();
        // Fist
        ctx.fillStyle = accent;
        ctx.beginPath(); ctx.arc(fistX, fistY, 6, 0, Math.PI * 2); ctx.fill();
      };
      // Draw back arm first (behind), then front arm (in front)
      drawArm(-f, 14); // back arm hits second
      drawArm(f, 8);   // front arm hits first
    } else {
      // Back arm
      let backArmEndX = -f * (28 * ptArmLen);
      let backArmEndY = armY + backArmLen + Math.sin(bob * 0.5) * 3;

      // Brush override: back arm crosses over to far shoulder
      if (this._brushArmT !== undefined && this._brushArmT >= 0) {
        const bt = this._brushArmT;
        // Far shoulder position (front shoulder, on the f side)
        const farShX = f * 8;
        const farShY = armY + 2;
        // Rest position
        const defX = backArmEndX;
        const defY = backArmEndY;
        // Sweep end (past the far shoulder outward)
        const sweepEndX = f * 28;
        const sweepEndY = armY + 2;

        if (bt < 0.25) {
          // Raise to far shoulder
          const t = bt / 0.25;
          const ease = t * t;
          backArmEndX = defX + (farShX - defX) * ease;
          backArmEndY = defY + (farShY - defY) * ease;
        } else if (bt < 0.55) {
          // Sweep across shoulder
          const t = (bt - 0.25) / 0.3;
          backArmEndX = farShX + (sweepEndX - farShX) * t;
          backArmEndY = farShY - Math.sin(t * Math.PI) * 3;
        } else {
          // Lower back to rest
          const t = Math.min(1, (bt - 0.55) / 0.45);
          backArmEndX = sweepEndX + (defX - sweepEndX) * t;
          backArmEndY = sweepEndY + (defY - sweepEndY) * t;
        }
      }

      if (!this._hideBackArm) {
        ctx.strokeStyle = outline;
        ctx.lineWidth = isPaletap ? 7 : isBuck ? 9 : 6;
        ctx.beginPath();
        ctx.moveTo(-f * 14, armY);
        ctx.lineTo(backArmEndX, backArmEndY);
        ctx.stroke();
        ctx.strokeStyle = color;
        ctx.lineWidth = isPaletap ? 5 : isBuck ? 7 : 4;
        ctx.beginPath();
        ctx.moveTo(-f * 14, armY);
        ctx.lineTo(backArmEndX, backArmEndY);
        ctx.stroke();
      }

      // Front arm (attacking arm) — hidden during Tetherball rumble (custom arm draws instead)
      if (!this._hideFrontArm) {
        const punchExtend = armAngle * 30;
        armEndX = this.rubberArmReach > 0 ? f * this.rubberArmReach : f * (frontArmBase + punchExtend);
        armEndY = this.rubberArmReach > 0 ? armY - armAngle * 5 : armY - armAngle * (isPaletap ? 25 : 10);
        ctx.strokeStyle = outline;
        ctx.lineWidth = isPaletap ? 7 : isBuck ? 9 : 6;
        ctx.beginPath();
        ctx.moveTo(f * 14, armY);
        ctx.lineTo(armEndX, armEndY);
        ctx.stroke();
        ctx.strokeStyle = color;
        ctx.lineWidth = isPaletap ? 5 : isBuck ? 7 : 4;
        ctx.beginPath();
        ctx.moveTo(f * 14, armY);
        ctx.lineTo(armEndX, armEndY);
        ctx.stroke();
      }

      // Fists
      ctx.fillStyle = accent;
      if (!this._hideFrontArm) {
        ctx.beginPath();
        ctx.arc(armEndX, armEndY, isPaletap ? 6 : isBuck ? 7 : 5, 0, Math.PI * 2);
        ctx.fill();
      }
      if (!this._hideBackArm) {
        ctx.fillStyle = accent;
        ctx.beginPath();
        ctx.arc(backArmEndX, backArmEndY, isPaletap ? 5 : isBuck ? 6 : 4, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Head
    const headY = -legLen - bodyH - 16;
    const headSize = isPaletap ? 18 : 16;
    if (isPaletap) {
      ctx.save();
      ctx.translate(0, headY);
      ctx.rotate(f * 0.35); // tilted head
    }
    ctx.fillStyle = accent;
    ctx.strokeStyle = outline;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(isPaletap ? 0 : 0, isPaletap ? 0 : headY, headSize, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Eyes
    const eyeBaseY = isPaletap ? 0 : headY;
    ctx.fillStyle = outline;
    ctx.beginPath();
    ctx.arc(f * 5, eyeBaseY - 2, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(f * 12, eyeBaseY - 2, 3, 0, Math.PI * 2);
    ctx.fill();

    // Eye highlights (skip for Paletap)
    if (!isPaletap) {
      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.arc(f * 6, eyeBaseY - 3, 1.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(f * 13, eyeBaseY - 3, 1.5, 0, Math.PI * 2);
      ctx.fill();
    }

    if (isPaletap) ctx.restore(); // end tilted head transform
    if (isPaletap) ctx.restore(); // end forward lean

    // Gourmand: fork in front hand, spoon in back hand, open mouth
    if (this.char.isGourmand) {
      // Fork (front hand)
      const forkX = armEndX;
      const forkY = armEndY;
      ctx.strokeStyle = '#ccc';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(forkX, forkY);
      ctx.lineTo(forkX + f * 12, forkY - 16);
      ctx.stroke();
      // Fork prongs
      for (let p = -1; p <= 1; p++) {
        ctx.beginPath();
        ctx.moveTo(forkX + f * 12 + p * 2, forkY - 16);
        ctx.lineTo(forkX + f * 14 + p * 2, forkY - 22);
        ctx.stroke();
      }
      // Spoon (back hand)
      const spoonX = -f * 28;
      const spoonY = armY + 15 + Math.sin(bob * 0.5) * 3;
      ctx.strokeStyle = '#ccc';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(spoonX, spoonY);
      ctx.lineTo(spoonX - f * 10, spoonY - 14);
      ctx.stroke();
      ctx.fillStyle = '#ccc';
      ctx.beginPath();
      ctx.ellipse(spoonX - f * 10, spoonY - 18, 4, 3, 0, 0, Math.PI * 2);
      ctx.fill();

      // Open mouth
      if (this.mouthOpen) {
        ctx.fillStyle = '#2a0a0a';
        ctx.beginPath();
        ctx.moveTo(f * 4, headY + 6);
        ctx.lineTo(f * 18, headY + 4);
        ctx.lineTo(f * 18, headY + 22);
        ctx.lineTo(f * 4, headY + 16);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = '#e8a852';
        ctx.lineWidth = 2;
        ctx.stroke();
        // Teeth
        ctx.fillStyle = '#fff';
        for (let t = 0; t < 3; t++) {
          ctx.fillRect(f * (6 + t * 4), headY + 5, 2, 3);
          ctx.fillRect(f * (6 + t * 4), headY + 17, 2, -3);
        }
      }

      // Full indicator (bloated glow)
      if (this.gourmandFull) {
        ctx.save();
        ctx.globalAlpha = 0.3 + Math.sin(Date.now() * 0.01) * 0.15;
        ctx.fillStyle = '#ff6600';
        ctx.beginPath();
        ctx.ellipse(0, -8 - bodyH / 2, 22 + gourmandBulge, bodyH / 2 + 5, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    // Matador: estoque in back hand (non-punching hand)
    if (this.char.isMatador) {
      const backHandX = -f * 28;
      const backHandY = armY + 15 + Math.sin(bob * 0.5) * 3;
      // Blade
      ctx.strokeStyle = '#ddd';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(backHandX, backHandY);
      ctx.lineTo(backHandX - f * 30, backHandY - 22);
      ctx.stroke();
      // Blade highlight
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.moveTo(backHandX - f * 2, backHandY - 2);
      ctx.lineTo(backHandX - f * 28, backHandY - 21);
      ctx.stroke();
      // Guard (crosspiece)
      ctx.strokeStyle = '#ffd700';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(backHandX - f * 3, backHandY + 3);
      ctx.lineTo(backHandX + f * 3, backHandY - 5);
      ctx.stroke();
      // Handle
      ctx.strokeStyle = '#8b4513';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(backHandX, backHandY);
      ctx.lineTo(backHandX + f * 6, backHandY + 5);
      ctx.stroke();
      // Dash afterimage effect
      if (this.matadorDashing) {
        ctx.save();
        ctx.globalAlpha = 0.3;
        ctx.fillStyle = this.char.accent;
        ctx.beginPath();
        ctx.ellipse(0, -bodyH / 2 - legLen, 20, bodyH / 2, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    // Exor: ghostly wisp aura
    if (this.char.isExor) {
      ctx.save();
      const t = Date.now() * 0.004;
      ctx.globalAlpha = 0.3;
      ctx.strokeStyle = '#39ff14';
      ctx.lineWidth = 1;
      // Floating soul wisps around body
      for (let i = 0; i < 4; i++) {
        const angle = t + i * 1.57;
        const r = 22 + Math.sin(t * 0.7 + i) * 5;
        const wx = Math.cos(angle) * r;
        const wy = -bodyH / 2 - legLen + Math.sin(angle * 0.8 + i) * (bodyH * 0.4);
        ctx.beginPath();
        ctx.arc(wx, wy, 3 + Math.sin(t + i) * 1.5, 0, Math.PI * 2);
        ctx.stroke();
      }
      // Draining tether effect
      if (this.exorDraining && this.exorDrainTarget) {
        ctx.globalAlpha = 0.6;
        ctx.strokeStyle = '#2ecc71';
        ctx.lineWidth = 2;
        const target = this.exorDrainTarget;
        // Draw in local coords, need to un-translate
        const dx = (target.x - this.x) * f;
        const dy = (target.centerY - 10) - (this.centerY - 10);
        ctx.beginPath();
        ctx.moveTo(0, -bodyH / 2 - legLen);
        ctx.quadraticCurveTo(dx * 0.5, -bodyH / 2 - legLen + dy * 0.5 - 20, dx, dy - bodyH / 2 - legLen);
        ctx.stroke();
        // Glow on self
        ctx.globalAlpha = 0.2 + Math.sin(Date.now() * 0.01) * 0.1;
        ctx.fillStyle = '#39ff14';
        ctx.beginPath();
        ctx.ellipse(0, -bodyH / 2 - legLen, 18, bodyH / 2, 0, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }

    // Backtrack: clock/rewind symbol on chest
    if (this.char.isBacktrack) {
      ctx.save();
      ctx.strokeStyle = '#b44dff';
      ctx.lineWidth = 1.5;
      ctx.globalAlpha = 0.7;
      const clockY = -bodyH / 2 - legLen;
      // Clock circle
      ctx.beginPath();
      ctx.arc(0, clockY, 6, 0, Math.PI * 2);
      ctx.stroke();
      // Clock hands
      const t = Date.now() * 0.003;
      ctx.beginPath();
      ctx.moveTo(0, clockY);
      ctx.lineTo(Math.cos(-t) * 4, clockY + Math.sin(-t) * 4);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, clockY);
      ctx.lineTo(Math.cos(-t * 0.3) * 3, clockY + Math.sin(-t * 0.3) * 3);
      ctx.stroke();
      ctx.restore();

      // Rewind visual effect
      if (this.btRewindEffect > 0) {
        ctx.save();
        ctx.globalAlpha = this.btRewindEffect / 40 * 0.4;
        ctx.strokeStyle = '#b44dff';
        ctx.lineWidth = 2;
        // Concentric rings expanding outward
        for (let r = 0; r < 3; r++) {
          const radius = (40 - this.btRewindEffect + r * 15) * 2;
          ctx.beginPath();
          ctx.arc(0, -bodyH / 2 - legLen, radius, 0, Math.PI * 2);
          ctx.stroke();
        }
        ctx.restore();
      }
    }

    // Killa Watt: electric sparks around body
    if (this.char.isKillawatt) {
      ctx.save();
      ctx.strokeStyle = '#00e5ff';
      ctx.lineWidth = 1.5;
      const t = Date.now() * 0.01;
      for (let i = 0; i < 3; i++) {
        const angle = t + i * 2.1;
        const sx = Math.cos(angle) * 18;
        const sy = -bodyH / 2 - legLen + Math.sin(angle * 1.3) * (bodyH / 2);
        const ex = sx + (Math.random() - 0.5) * 12;
        const ey = sy + (Math.random() - 0.5) * 10;
        ctx.globalAlpha = 0.5 + Math.random() * 0.5;
        ctx.beginPath();
        ctx.moveTo(sx, sy);
        ctx.lineTo((sx + ex) / 2 + (Math.random() - 0.5) * 6, (sy + ey) / 2);
        ctx.lineTo(ex, ey);
        ctx.stroke();
      }
      ctx.restore();
    }

    // Snazz McJazz: white fedora
    if (this.char.isSnazz) {
      ctx.fillStyle = '#ffffff';
      ctx.strokeStyle = '#cccccc';
      ctx.lineWidth = 1;
      // Hat brim
      ctx.beginPath();
      ctx.ellipse(0, headY - 12, 22, 5, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      // Hat crown
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.moveTo(-10, headY - 12);
      ctx.lineTo(-8, headY - 28);
      ctx.lineTo(8, headY - 28);
      ctx.lineTo(10, headY - 12);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = '#cccccc';
      ctx.stroke();
      // Hat band
      ctx.fillStyle = '#222222';
      ctx.fillRect(-9, headY - 17, 18, 3);
    }

    // Haystack: sword through body and arrows in head
    if (this.char.isHaystack) {
      // Sword through body (diagonal)
      ctx.strokeStyle = '#888';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(-12, -8 - bodyH + 5);
      ctx.lineTo(14, -8 - bodyH + 30);
      ctx.stroke();
      // Sword handle
      ctx.strokeStyle = '#553300';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(-14, -8 - bodyH + 2);
      ctx.lineTo(-12, -8 - bodyH + 5);
      ctx.stroke();
      // Sword guard
      ctx.strokeStyle = '#aa8800';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(-16, -8 - bodyH + 7);
      ctx.lineTo(-8, -8 - bodyH + 3);
      ctx.stroke();
      // Arrows sticking out of head (sides)
      ctx.strokeStyle = '#886644';
      ctx.lineWidth = 2;
      // Arrow left
      ctx.beginPath();
      ctx.moveTo(-22, headY - 3);
      ctx.lineTo(-6, headY + 1);
      ctx.stroke();
      // Arrow fletching left
      ctx.fillStyle = '#cc4444';
      ctx.beginPath();
      ctx.moveTo(-22, headY - 3);
      ctx.lineTo(-20, headY - 7);
      ctx.lineTo(-18, headY - 3);
      ctx.closePath();
      ctx.fill();
      // Arrow right
      ctx.strokeStyle = '#886644';
      ctx.beginPath();
      ctx.moveTo(22, headY + 2);
      ctx.lineTo(6, headY - 1);
      ctx.stroke();
      // Arrow fletching right
      ctx.fillStyle = '#cc4444';
      ctx.beginPath();
      ctx.moveTo(22, headY + 2);
      ctx.lineTo(20, headY + 6);
      ctx.lineTo(18, headY + 2);
      ctx.closePath();
      ctx.fill();
      // Burlap stitch marks on body
      ctx.strokeStyle = '#5a4020';
      ctx.lineWidth = 1;
      for (let sy = 0; sy < 3; sy++) {
        const stitchY = -8 - bodyH + 10 + sy * 10;
        ctx.beginPath();
        ctx.moveTo(-6, stitchY);
        ctx.lineTo(0, stitchY + 4);
        ctx.lineTo(6, stitchY);
        ctx.stroke();
      }
    }

    // Mouth - frown when taking damage
    if (this.state === 'hitstun' || this.state === 'launched') {
      ctx.strokeStyle = outline;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(f * 8, headY + 10, 4, Math.PI, Math.PI * 2);
      ctx.stroke();
    }

    // Blocking indicator
    if (this.blocking && this.state !== 'attack') {
      ctx.strokeStyle = '#0ff';
      ctx.lineWidth = 2;
      ctx.globalAlpha = 0.5 + Math.sin(Date.now() * 0.01) * 0.3;
      ctx.beginPath();
      ctx.arc(0, headY + 20, 30, 0, Math.PI * 2);
      ctx.stroke();
      ctx.globalAlpha = 1;
    }

    // Bozollok: insect features (antennae, mandibles, abdomen segments)
    if (this.char.isBozollok) {
      const f = this.facing;
      // Antennae
      ctx.strokeStyle = '#c8a030';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(f * 4, headY - 10);
      ctx.quadraticCurveTo(f * 15, headY - 28, f * 20, headY - 25);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(-f * 2, headY - 10);
      ctx.quadraticCurveTo(-f * 10, headY - 30, -f * 5, headY - 28);
      ctx.stroke();
      // Antenna tips
      ctx.fillStyle = '#c8a030';
      ctx.beginPath(); ctx.arc(f * 20, headY - 25, 2, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(-f * 5, headY - 28, 2, 0, Math.PI * 2); ctx.fill();
      // Mandibles
      ctx.strokeStyle = '#8a6a10';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(f * 6, headY + 4);
      ctx.lineTo(f * 14, headY + 10);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(f * 4, headY + 6);
      ctx.lineTo(f * 12, headY + 14);
      ctx.stroke();
      // Abdomen segment lines
      ctx.strokeStyle = 'rgba(200,160,48,0.3)';
      ctx.lineWidth = 1;
      for (let s = 0; s < 3; s++) {
        const sy = -this.height * 0.35 + s * 10;
        ctx.beginPath();
        ctx.moveTo(-10, sy);
        ctx.lineTo(10, sy);
        ctx.stroke();
      }
      // Fluttering wings while hovering
      if (this.molting && this.moltHover > 0) {
        const wingFlutter = Math.sin(Date.now() * 0.03) * 0.6;
        const wingSpread = 0.8 + Math.sin(Date.now() * 0.025) * 0.2;
        ctx.save();
        ctx.globalAlpha = 0.5 + Math.sin(Date.now() * 0.02) * 0.15;
        // Left wing
        ctx.fillStyle = 'rgba(200,160,48,0.4)';
        ctx.strokeStyle = '#c8a030';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(-f * 8, -this.height * 0.55);
        ctx.quadraticCurveTo(-f * (30 * wingSpread), -this.height * 0.7 + wingFlutter * 10, -f * (35 * wingSpread), -this.height * 0.45 + wingFlutter * 5);
        ctx.quadraticCurveTo(-f * (25 * wingSpread), -this.height * 0.35, -f * 8, -this.height * 0.4);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        // Right wing
        ctx.beginPath();
        ctx.moveTo(f * 8, -this.height * 0.55);
        ctx.quadraticCurveTo(f * (30 * wingSpread), -this.height * 0.7 - wingFlutter * 10, f * (35 * wingSpread), -this.height * 0.45 - wingFlutter * 5);
        ctx.quadraticCurveTo(f * (25 * wingSpread), -this.height * 0.35, f * 8, -this.height * 0.4);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      }
      // Descent claw slash effect
      if (this.moltDescending) {
        ctx.save();
        ctx.globalAlpha = 0.6;
        ctx.strokeStyle = '#c8a030';
        ctx.lineWidth = 3;
        for (let c = 0; c < 3; c++) {
          const cx = f * (8 + c * 8);
          ctx.beginPath();
          ctx.moveTo(cx, -5);
          ctx.lineTo(cx + f * 5, 15);
          ctx.stroke();
        }
        ctx.restore();
      }
    }

    // Codemax scanlines and glitch displacement
    if (this.char.isCodemax) {
      ctx.globalCompositeOperation = 'screen';
      ctx.globalAlpha = 0.08;
      for (let sy = -this.height; sy < 10; sy += 4) {
        ctx.fillStyle = '#00ff88';
        ctx.fillRect(-20, sy, 40, 1);
      }
      ctx.globalCompositeOperation = 'source-over';
      ctx.globalAlpha = 1;
      if (this.glitchTimer > 0) {
        ctx.save();
        const glitchOff = (Math.random() - 0.5) * 12;
        ctx.translate(glitchOff, 0);
        ctx.globalAlpha = 0.4;
        ctx.fillStyle = '#00ff88';
        ctx.fillRect(-15, -this.height * 0.3, 30, this.height * 0.2);
        ctx.restore();
      }
    }

    ctx.restore();

    // If this is a clone draw, stop here (no hit effects, assists, combos, etc.)
    if (this._isCloneDraw) return;

    // Duplaire clone drawing - reuse full draw method recursively
    if (this.char.isDuplaire && this.duplaireClones.length > 0 && !this._isCloneDraw) {
      for (const clone of this.duplaireClones) {
        // Save main fighter state
        const savedX = this.x, savedY = this.y, savedFacing = this.facing;
        const savedState = this.state, savedAttackFrame = this.attackFrame;
        const savedCurrentAttack = this.currentAttack, savedStateTimer = this.stateTimer;
        const savedGrounded = this.grounded, savedAnimTimer = this.animTimer, savedAnimFrame = this.animFrame;
        const savedCrouching = this.crouching, savedBlocking = this.blocking;

        // Apply clone state
        this.x = clone.x;
        this.y = clone.y;
        this.facing = clone.facing;
        this.grounded = clone.grounded;
        this.animTimer = clone.animTimer;
        this.animFrame = clone.animFrame;
        this.crouching = clone.crouching || false;
        this.blocking = clone.blocking || false;
        if (clone.active) {
          this.state = clone.state;
          this.attackFrame = clone.attackFrame;
          this.currentAttack = clone.currentAttack;
          this.stateTimer = clone.stateTimer;
        } else {
          this.state = 'idle';
          this.currentAttack = null;
        }

        this._isCloneDraw = true;
        this._cloneAlpha = clone.active ? 1.0 : 0.3 + 0.15 * Math.sin(clone.activationTimer * 0.05);
        this.draw(ctx);
        this._isCloneDraw = false;

        // Restore main fighter state
        this.x = savedX; this.y = savedY; this.facing = savedFacing;
        this.state = savedState; this.attackFrame = savedAttackFrame;
        this.currentAttack = savedCurrentAttack; this.stateTimer = savedStateTimer;
        this.grounded = savedGrounded; this.animTimer = savedAnimTimer; this.animFrame = savedAnimFrame;
        this.crouching = savedCrouching; this.blocking = savedBlocking;
      }
    }

    // Hit effect
    if (this.hitEffect) {
      const he = this.hitEffect;
      const size = he.type === 'big' ? 25 : 15;
      const alpha = he.timer / 10;
      ctx.save();
      ctx.translate(he.x, he.y);
      ctx.globalAlpha = alpha;
      // Star burst
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2 + he.timer * 0.3;
        const r = size * (1 - he.timer / 10) + 5;
        ctx.strokeStyle = i % 2 === 0 ? '#fff' : '#ff0';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(Math.cos(angle) * r * 0.3, Math.sin(angle) * r * 0.3);
        ctx.lineTo(Math.cos(angle) * r, Math.sin(angle) * r);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
      ctx.restore();
    }

    // Gourmand energy ball projectile
    if (this.gourmandProjectile) {
      const gp = this.gourmandProjectile;
      const gpSize = 8 + (gp.damage / 80) * 12;
      ctx.save();
      ctx.translate(gp.x, gp.y);
      ctx.shadowColor = '#ff6600';
      ctx.shadowBlur = 15;
      // Outer glow
      ctx.globalAlpha = 0.4;
      ctx.fillStyle = '#ff8800';
      ctx.beginPath();
      ctx.arc(0, 0, gpSize + 4, 0, Math.PI * 2);
      ctx.fill();
      // Main ball
      ctx.globalAlpha = 0.9;
      ctx.fillStyle = '#ffaa22';
      ctx.beginPath();
      ctx.arc(0, 0, gpSize, 0, Math.PI * 2);
      ctx.fill();
      // Inner core
      ctx.fillStyle = '#ffe080';
      ctx.beginPath();
      ctx.arc(0, 0, gpSize * 0.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1;
      ctx.restore();
    }

    // Paletap shockwave
    if (this.paletapShockwave) {
      const sw = this.paletapShockwave;
      const progress = sw.timer / sw.maxTimer;
      const swHeight = 90 * Math.max(0, 1 - progress * 0.5);
      const swAlpha = Math.max(0, 1 - progress);
      ctx.save();
      ctx.translate(sw.x, sw.y);
      ctx.globalAlpha = swAlpha * 0.7;
      // Ground crack
      ctx.strokeStyle = this.char.accent;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(-20, 0);
      ctx.lineTo(20, 0);
      ctx.stroke();
      // Shockwave wave shape
      ctx.fillStyle = this.char.accent;
      ctx.globalAlpha = swAlpha * 0.4;
      ctx.beginPath();
      ctx.moveTo(-25, 0);
      ctx.quadraticCurveTo(-15, -swHeight * 0.6, 0, -swHeight);
      ctx.quadraticCurveTo(15, -swHeight * 0.6, 25, 0);
      ctx.closePath();
      ctx.fill();
      // Shockwave outline
      ctx.globalAlpha = swAlpha * 0.8;
      ctx.strokeStyle = this.char.accent;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(-25, 0);
      ctx.quadraticCurveTo(-15, -swHeight * 0.6, 0, -swHeight);
      ctx.quadraticCurveTo(15, -swHeight * 0.6, 25, 0);
      ctx.stroke();
      // Debris particles
      for (let i = 0; i < 3; i++) {
        const px = (Math.sin(sw.timer * 0.5 + i * 2) * 15);
        const py = -(Math.abs(Math.sin(sw.timer * 0.3 + i)) * swHeight * 0.5);
        ctx.fillStyle = '#888';
        ctx.globalAlpha = swAlpha * 0.6;
        ctx.fillRect(px - 2, py - 2, 4, 4);
      }
      ctx.globalAlpha = 1;
      ctx.restore();
    }

    // Assist projectile
    if (this.assistActive) {
      ctx.save();
      this.drawAssistProjectile(this.assistActive);
      ctx.restore();
    }

    // Combo counter
    if (this.comboCount > 1 && this.comboTimer > 0) {
      ctx.save();
      ctx.font = 'bold 20px Arial';
      ctx.textAlign = 'center';
      ctx.fillStyle = '#ff0';
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 3;
      const comboX = this.x;
      const comboY = this.top - 30;
      ctx.strokeText(`${this.comboCount} HIT COMBO!`, comboX, comboY);
      ctx.fillText(`${this.comboCount} HIT COMBO!`, comboX, comboY);
      ctx.restore();
    }

    // Combo name display
    if (this.comboNameDisplay && this.comboNameTimer > 0) {
      ctx.save();
      ctx.font = 'bold 22px Arial';
      ctx.textAlign = 'center';
      ctx.globalAlpha = Math.min(1, this.comboNameTimer / 15);
      const ny = this.top - 55 - (60 - this.comboNameTimer) * 0.5;
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 4;
      ctx.strokeText(this.comboNameDisplay, this.x, ny);
      ctx.fillStyle = this.char.accent;
      ctx.fillText(this.comboNameDisplay, this.x, ny);
      ctx.globalAlpha = 1;
      ctx.restore();
    }

    // Combo flash glow
    if (this.comboFlash > 0) {
      ctx.save();
      ctx.globalAlpha = this.comboFlash / 20 * 0.6;
      ctx.fillStyle = this.char.accent;
      ctx.shadowColor = this.char.accent;
      ctx.shadowBlur = 30;
      ctx.beginPath();
      ctx.arc(this.x, this.centerY, 50, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1;
      ctx.restore();
    }

    // DOT effect particles (burn/poison)
    if (this.dotEffect) {
      ctx.save();
      for (let i = 0; i < 5; i++) {
        const px = this.x + (Math.sin(Date.now() * 0.01 + i * 2) * 20);
        const py = this.centerY + (Math.cos(Date.now() * 0.013 + i * 1.5) * 25);
        ctx.globalAlpha = 0.4 + Math.sin(Date.now() * 0.02 + i) * 0.2;
        ctx.fillStyle = this.dotEffect.color;
        ctx.shadowColor = this.dotEffect.color;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(px, py, 3 + Math.sin(Date.now() * 0.015 + i) * 2, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1;
      ctx.restore();
    }

    // Frozen effect
    if (this.frozenTimer > 0) {
      ctx.save();
      ctx.globalAlpha = 0.4;
      ctx.fillStyle = '#aaeeff';
      ctx.fillRect(this.x - 25, this.top, 50, this.height);
      // Ice crystals
      ctx.globalAlpha = 0.7;
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      for (let i = 0; i < 4; i++) {
        const cx = this.x - 15 + i * 10;
        const cy = this.top + 10 + i * 20;
        ctx.beginPath();
        ctx.moveTo(cx, cy - 6);
        ctx.lineTo(cx + 5, cy);
        ctx.lineTo(cx, cy + 6);
        ctx.lineTo(cx - 5, cy);
        ctx.closePath();
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
      ctx.restore();
    }

    // Killa Watt electric stun effect (vibration + sparks)
    if (this.kwStunTimer > 0) {
      ctx.save();
      // Vibration offset
      const vx = (Math.random() - 0.5) * 6;
      const vy = (Math.random() - 0.5) * 4;
      // Electric glow overlay
      ctx.globalAlpha = 0.3 + Math.random() * 0.2;
      ctx.fillStyle = '#00e5ff';
      ctx.fillRect(this.x - 25 + vx, this.top + vy, 50, this.height);
      // Sparks around body
      ctx.globalAlpha = 0.9;
      ctx.strokeStyle = '#ffff00';
      ctx.lineWidth = 2;
      for (let i = 0; i < 5; i++) {
        const sx = this.x + (Math.random() - 0.5) * 40;
        const sy = this.top + Math.random() * this.height;
        const ex = sx + (Math.random() - 0.5) * 16;
        const ey = sy + (Math.random() - 0.5) * 16;
        ctx.beginPath();
        ctx.moveTo(sx, sy);
        ctx.lineTo((sx + ex) / 2 + (Math.random() - 0.5) * 8, (sy + ey) / 2);
        ctx.lineTo(ex, ey);
        ctx.stroke();
      }
      ctx.restore();
    }

    // Slow effect (blue tint afterimages)
    if (this.slowTimer > 0) {
      ctx.save();
      ctx.globalAlpha = 0.15;
      ctx.fillStyle = '#4488ff';
      ctx.beginPath();
      ctx.arc(this.x - this.facing * 8, this.centerY, 30, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
      ctx.restore();
    }

    // Armor effect (golden shield outline)
    if (this.armorActive) {
      ctx.save();
      ctx.globalAlpha = 0.4 + Math.sin(Date.now() * 0.008) * 0.2;
      ctx.strokeStyle = '#ffd700';
      ctx.shadowColor = '#ffd700';
      ctx.shadowBlur = 12;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.roundRect(this.x - 30, this.top - 5, 60, this.height + 10, 10);
      ctx.stroke();
      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1;
      ctx.restore();
    }

    // Phase effect (already handled by globalAlpha in main draw, add shimmer)
    if (this.phaseTimer > 0) {
      ctx.save();
      ctx.globalAlpha = 0.2;
      ctx.fillStyle = '#aa88cc';
      ctx.beginPath();
      ctx.arc(this.x + Math.sin(Date.now() * 0.01) * 15, this.centerY, 25, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
      ctx.restore();
    }

    // Torrena water phase effect
    if (this.waterPhase) {
      ctx.save();
      ctx.globalAlpha = 0.15 + Math.sin(Date.now() * 0.008) * 0.05;
      ctx.fillStyle = '#44ddff';
      ctx.beginPath();
      ctx.arc(this.x + Math.sin(Date.now() * 0.006) * 10, this.centerY, 30, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(this.x - Math.sin(Date.now() * 0.009) * 8, this.centerY - 15, 18, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
      ctx.restore();
    }

    // Chain hits lightning
    if (this.chainHits) {
      ctx.save();
      ctx.strokeStyle = '#ffff00';
      ctx.shadowColor = '#ffff00';
      ctx.shadowBlur = 10;
      ctx.lineWidth = 2;
      ctx.globalAlpha = 0.6 + Math.random() * 0.4;
      for (let i = 0; i < 2; i++) {
        ctx.beginPath();
        ctx.moveTo(this.x + (Math.random() - 0.5) * 30, this.top + Math.random() * 20);
        ctx.lineTo(this.x + (Math.random() - 0.5) * 20, this.centerY);
        ctx.lineTo(this.x + (Math.random() - 0.5) * 30, this.y - 10);
        ctx.stroke();
      }
      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1;
      ctx.restore();
    }

    // Teleport ghost
    if (this.teleportGhost) {
      ctx.save();
      ctx.globalAlpha = this.teleportGhost.timer / 12 * 0.4;
      ctx.fillStyle = this.char.color;
      ctx.beginPath();
      ctx.arc(this.teleportGhost.x, this.teleportGhost.y - 45, 16, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillRect(this.teleportGhost.x - 16, this.teleportGhost.y - 48, 32, 40);
      ctx.globalAlpha = 1;
      ctx.restore();
    }

    // Haystack projectiles (drawn even when not exploding, for lingering projectiles)
    if (this.char.isHaystack) {
      this.drawHaystackProjectiles(ctx);
    }
  }

  drawHaystackProjectiles(ctx) {
    // Hay particles
    for (const hp of this.hayParticles) {
      ctx.save();
      ctx.globalAlpha = hp.timer / 50;
      ctx.fillStyle = '#e8d491';
      ctx.translate(hp.x, hp.y);
      ctx.rotate(hp.vx * 0.3);
      ctx.fillRect(-4, -1, 8, 2);
      ctx.restore();
    }
    // Arrow and sword projectiles
    for (const p of this.haystackProjectiles) {
      ctx.save();
      ctx.translate(p.x, p.y);
      const angle = Math.atan2(p.vy, p.vx);
      ctx.rotate(angle);
      if (p.type === 'sword') {
        // Sword blade
        ctx.strokeStyle = '#cccccc';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(-14, 0);
        ctx.lineTo(14, 0);
        ctx.stroke();
        // Handle
        ctx.strokeStyle = '#553300';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(-14, 0);
        ctx.lineTo(-18, 0);
        ctx.stroke();
        // Guard
        ctx.strokeStyle = '#aa8800';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(-14, -4);
        ctx.lineTo(-14, 4);
        ctx.stroke();
      } else {
        // Arrow shaft
        ctx.strokeStyle = '#886644';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(-10, 0);
        ctx.lineTo(10, 0);
        ctx.stroke();
        // Arrowhead
        ctx.fillStyle = '#aaaaaa';
        ctx.beginPath();
        ctx.moveTo(10, 0);
        ctx.lineTo(7, -3);
        ctx.lineTo(7, 3);
        ctx.closePath();
        ctx.fill();
        // Fletching
        ctx.fillStyle = '#cc4444';
        ctx.beginPath();
        ctx.moveTo(-10, 0);
        ctx.lineTo(-8, -3);
        ctx.lineTo(-6, 0);
        ctx.closePath();
        ctx.fill();
      }
      ctx.restore();
    }
  }
}

// --- INPUT ---
const keys = {};
window.addEventListener('wheel', e => {
  if (gameState === 'charSelect') {
    charSelectScroll = Math.max(0, Math.min(charSelectMaxScroll, charSelectScroll + e.deltaY * 0.5));
    e.preventDefault();
  }
}, { passive: false });

window.addEventListener('keydown', e => {
  keys[e.key] = true;
  handleKeyPress(e.key);
  if (['ArrowUp','ArrowDown','ArrowLeft','ArrowRight',' ','Tab'].includes(e.key)) e.preventDefault();
});
window.addEventListener('keyup', e => { keys[e.key] = false; });
// Start title music on any user interaction (click or key)
window.addEventListener('click', () => {
  const menuState = gameState === 'title' || gameState === 'charSelect' || gameState === 'practiceTargetSelect' || gameState === 'assistSelect' || gameState === 'difficultySelect' || gameState === 'levelSelect';
  if (menuState && titleMusic.paused) playTitleMusic();
});

function handleKeyPress(key) {
  // Keep title music playing during menu screens
  const menuState = gameState === 'title' || gameState === 'charSelect' || gameState === 'practiceTargetSelect' || gameState === 'assistSelect' || gameState === 'difficultySelect' || gameState === 'levelSelect';
  if (menuState && titleMusic.paused) {
    playTitleMusic();
  }
  switch (gameState) {
    case 'title': {
      const titleOptionCount = rumblePracticeUnlocked ? 3 : 2;
      if (key === 'ArrowUp' || key === 'w' || key === 'W') titleCursor = (titleCursor - 1 + titleOptionCount) % titleOptionCount;
      if (key === 'ArrowDown' || key === 's' || key === 'S') titleCursor = (titleCursor + 1) % titleOptionCount;
      if (key === 'Enter' || key === ' ') {
        if (titleCursor === 0) {
          gameMode = 'cpu';
        } else if (titleCursor === 1) {
          gameMode = 'practice';
        } else {
          gameMode = 'rumblePractice';
        }
        gameState = 'charSelect';
        charSelectCursor = 0;
        cpuSelectCursor = 1;
        charSelectScroll = 0;
        selectingCPU = false;
      }
      break;
    }

    case 'charSelect': {
      // Toggle locked character display
      if (key === 'Tab') {
        showLockedChars = !showLockedChars;
        charSelectScroll = 0;
      }
      // Secret code: type b0jd0 to unlock Bojdo, type again for Bojdobojdo
      if (!bojdoUnlocked || !bojdobojdoUnlocked) {
        bojdoCodeBuffer += key;
        if (bojdoCodeBuffer.length > 10) bojdoCodeBuffer = bojdoCodeBuffer.slice(-10);
        if (bojdoCodeBuffer.includes('b0jd0')) {
          bojdoCodeBuffer = '';
          if (!bojdoUnlocked) {
            bojdoUnlocked = true;
            insertCharOrdered(bojdoChar);
            bojdoUnlockFlash = 60;
            charSelectCursor = characters.length - 1;
          } else if (!bojdobojdoUnlocked) {
            bojdobojdoUnlocked = true;
            bojdoChar.name = 'BOJDOBOJDO';
            bojdoChar.desc = 'ULTIMATE SIZE SHIFTER';
            bojdoChar.accent = '#ff4400';
            bojdoUnlockFlash = 60;
            // Jump to Bojdobojdo
            charSelectCursor = characters.indexOf(bojdoChar);
          }
        }
      }
      // Secret code: type rubbr to unlock Rubberman
      if (!rubbermanUnlocked) {
        rubbermanCodeBuffer += key.toLowerCase();
        if (rubbermanCodeBuffer.length > 10) rubbermanCodeBuffer = rubbermanCodeBuffer.slice(-10);
        if (rubbermanCodeBuffer.includes('rubbr')) {
          rubbermanCodeBuffer = '';
          rubbermanUnlocked = true;
          insertCharOrdered(rubbermanChar);
          rubbermanUnlockFlash = 60;
          charSelectCursor = characters.length - 1;
        }
      }
      // Secret code: type fl00d to unlock Torrena
      if (!torrenaUnlocked) {
        torrenaCodeBuffer += key.toLowerCase();
        if (torrenaCodeBuffer.length > 10) torrenaCodeBuffer = torrenaCodeBuffer.slice(-10);
        if (torrenaCodeBuffer.includes('fl00d')) {
          torrenaCodeBuffer = '';
          torrenaUnlocked = true;
          insertCharOrdered(torrenaChar);
          torrenaUnlockFlash = 60;
          charSelectCursor = characters.length - 1;
        }
      }
      // Secret code: type 5na22 to unlock Snazz McJazz
      if (!snazzUnlocked) {
        snazzCodeBuffer += key.toLowerCase();
        if (snazzCodeBuffer.length > 10) snazzCodeBuffer = snazzCodeBuffer.slice(-10);
        if (snazzCodeBuffer.includes('5na22')) {
          snazzCodeBuffer = '';
          snazzUnlocked = true;
          insertCharOrdered(snazzChar);
          snazzUnlockFlash = 60;
          charSelectCursor = characters.length - 1;
        }
      }
      // Secret code: type dumm1 to unlock Haystack
      if (!haystackUnlocked) {
        haystackCodeBuffer += key.toLowerCase();
        if (haystackCodeBuffer.length > 10) haystackCodeBuffer = haystackCodeBuffer.slice(-10);
        if (haystackCodeBuffer.includes('dumm1')) {
          haystackCodeBuffer = '';
          haystackUnlocked = true;
          insertCharOrdered(haystackChar);
          haystackUnlockFlash = 60;
          charSelectCursor = characters.length - 1;
        }
      }
      // Secret code: type 404er to unlock Codemax
      if (!codemaxUnlocked) {
        codemaxCodeBuffer += key.toLowerCase();
        if (codemaxCodeBuffer.length > 10) codemaxCodeBuffer = codemaxCodeBuffer.slice(-10);
        if (codemaxCodeBuffer.includes('404er')) {
          codemaxCodeBuffer = '';
          codemaxUnlocked = true;
          insertCharOrdered(codemaxChar);
          codemaxUnlockFlash = 60;
          charSelectCursor = characters.length - 1;
        }
      }
      // Secret code: type v0id1 to unlock Telatrine
      if (!telatrineUnlocked) {
        telatrineCodeBuffer += key.toLowerCase();
        if (telatrineCodeBuffer.length > 10) telatrineCodeBuffer = telatrineCodeBuffer.slice(-10);
        if (telatrineCodeBuffer.includes('v0id1')) {
          telatrineCodeBuffer = '';
          telatrineUnlocked = true;
          insertCharOrdered(telatrineChar);
          telatrineUnlockFlash = 60;
          charSelectCursor = characters.length - 1;
        }
      }
      // Secret code: type g0yl3 to unlock Golgar
      if (!golgarUnlocked) {
        golgarCodeBuffer += key.toLowerCase();
        if (golgarCodeBuffer.length > 10) golgarCodeBuffer = golgarCodeBuffer.slice(-10);
        if (golgarCodeBuffer.includes('g0yl3')) {
          golgarCodeBuffer = '';
          golgarUnlocked = true;
          insertCharOrdered(golgarChar);
          golgarUnlockFlash = 60;
          charSelectCursor = characters.length - 1;
        }
      }
      // Secret code: type f3thr to unlock Corvida
      if (!corvidaUnlocked) {
        corvidaCodeBuffer += key.toLowerCase();
        if (corvidaCodeBuffer.length > 10) corvidaCodeBuffer = corvidaCodeBuffer.slice(-10);
        if (corvidaCodeBuffer.includes('f3thr')) {
          corvidaCodeBuffer = '';
          corvidaUnlocked = true;
          insertCharOrdered(corvidaChar);
          corvidaUnlockFlash = 60;
          charSelectCursor = characters.length - 1;
        }
      }
      // Secret code: type mult1 to unlock Duplaire
      if (!duplaireUnlocked) {
        duplaireCodeBuffer += key.toLowerCase();
        if (duplaireCodeBuffer.length > 10) duplaireCodeBuffer = duplaireCodeBuffer.slice(-10);
        if (duplaireCodeBuffer.includes('mult1')) {
          duplaireCodeBuffer = '';
          duplaireUnlocked = true;
          insertCharOrdered(duplaireChar);
          duplaireUnlockFlash = 60;
          charSelectCursor = characters.length - 1;
        }
      }
      // Secret code: type m0ltr to unlock Bozollok
      if (!bozollokUnlocked) {
        bozollokCodeBuffer += key.toLowerCase();
        if (bozollokCodeBuffer.length > 10) bozollokCodeBuffer = bozollokCodeBuffer.slice(-10);
        if (bozollokCodeBuffer.includes('m0ltr')) {
          bozollokCodeBuffer = '';
          bozollokUnlocked = true;
          insertCharOrdered(bozollokChar);
          bozollokUnlockFlash = 60;
          charSelectCursor = characters.length - 1;
        }
      }
      // Secret code: type fea5t to unlock Gourmand
      if (!gourmandUnlocked) {
        gourmandCodeBuffer += key.toLowerCase();
        if (gourmandCodeBuffer.length > 10) gourmandCodeBuffer = gourmandCodeBuffer.slice(-10);
        if (gourmandCodeBuffer.includes('fea5t')) {
          gourmandCodeBuffer = '';
          gourmandUnlocked = true;
          insertCharOrdered(gourmandChar);
          gourmandUnlockFlash = 60;
          charSelectCursor = characters.length - 1;
        }
      }
      // Secret code: type sh3ll to unlock Batsch
      if (!batschUnlocked) {
        batschCodeBuffer += key.toLowerCase();
        if (batschCodeBuffer.length > 10) batschCodeBuffer = batschCodeBuffer.slice(-10);
        if (batschCodeBuffer.includes('sh3ll')) {
          batschCodeBuffer = '';
          batschUnlocked = true;
          insertCharOrdered(batschChar);
          batschUnlockFlash = 60;
          charSelectCursor = characters.length - 1;
        }
      }
      // Secret code: type r8ttl to unlock Paletap
      if (!paletapUnlocked) {
        paletapCodeBuffer += key.toLowerCase();
        if (paletapCodeBuffer.length > 10) paletapCodeBuffer = paletapCodeBuffer.slice(-10);
        if (paletapCodeBuffer.includes('r8ttl')) {
          paletapCodeBuffer = '';
          paletapUnlocked = true;
          insertCharOrdered(paletapChar);
          paletapUnlockFlash = 60;
          charSelectCursor = characters.length - 1;
        }
      }
      if (!matadorUnlocked) {
        matadorCodeBuffer += key.toUpperCase();
        if (matadorCodeBuffer.length > 10) matadorCodeBuffer = matadorCodeBuffer.slice(-10);
        if (matadorCodeBuffer.includes('8LFTR')) {
          matadorCodeBuffer = '';
          matadorUnlocked = true;
          insertCharOrdered(matadorChar);
          matadorUnlockFlash = 60;
          charSelectCursor = characters.length - 1;
        }
      }
      // Secret code: type V0LTG to unlock Killa Watt
      if (!killawattUnlocked) {
        killawattCodeBuffer += key.toUpperCase();
        if (killawattCodeBuffer.length > 10) killawattCodeBuffer = killawattCodeBuffer.slice(-10);
        if (killawattCodeBuffer.includes('V0LTG')) {
          killawattCodeBuffer = '';
          killawattUnlocked = true;
          insertCharOrdered(killawattChar);
          killawattUnlockFlash = 60;
          charSelectCursor = characters.length - 1;
        }
      }
      // Secret code: type R3WND to unlock Backtrack
      if (!backtrackUnlocked) {
        backtrackCodeBuffer += key.toUpperCase();
        if (backtrackCodeBuffer.length > 10) backtrackCodeBuffer = backtrackCodeBuffer.slice(-10);
        if (backtrackCodeBuffer.includes('R3WND')) {
          backtrackCodeBuffer = '';
          backtrackUnlocked = true;
          insertCharOrdered(backtrackChar);
          backtrackUnlockFlash = 60;
          charSelectCursor = characters.length - 1;
        }
      }
      // Secret code: type 2R3AP to unlock Exor
      if (!exorUnlocked) {
        exorCodeBuffer += key.toUpperCase();
        if (exorCodeBuffer.length > 10) exorCodeBuffer = exorCodeBuffer.slice(-10);
        if (exorCodeBuffer.includes('2R3AP')) {
          exorCodeBuffer = '';
          exorUnlocked = true;
          insertCharOrdered(exorChar);
          exorUnlockFlash = 60;
          charSelectCursor = characters.length - 1;
        }
      }
      // Secret code: type 07/04 to unlock Buck
      if (!buckUnlocked) {
        buckCodeBuffer += key;
        if (buckCodeBuffer.length > 10) buckCodeBuffer = buckCodeBuffer.slice(-10);
        if (buckCodeBuffer.includes('07/04')) {
          buckCodeBuffer = '';
          buckUnlocked = true;
          insertCharOrdered(buckChar);
          buckUnlockFlash = 60;
          charSelectCursor = characters.length - 1;
        }
      }
      // Secret code: type WH1RL to unlock Vortice
      if (!vorticeUnlocked) {
        vorticeCodeBuffer += key.toUpperCase();
        if (vorticeCodeBuffer.length > 10) vorticeCodeBuffer = vorticeCodeBuffer.slice(-10);
        if (vorticeCodeBuffer.includes('WH1RL')) {
          vorticeCodeBuffer = '';
          vorticeUnlocked = true;
          insertCharOrdered(vorticeChar);
          vorticeUnlockFlash = 60;
          charSelectCursor = characters.length - 1;
        }
      }
      // Secret code: type D1ESL to unlock X-haust
      if (!xhaustUnlocked) {
        xhaustCodeBuffer += key.toUpperCase();
        if (xhaustCodeBuffer.length > 10) xhaustCodeBuffer = xhaustCodeBuffer.slice(-10);
        if (xhaustCodeBuffer.includes('D1ESL')) {
          xhaustCodeBuffer = '';
          xhaustUnlocked = true;
          insertCharOrdered(xhaustChar);
          xhaustUnlockFlash = 60;
          charSelectCursor = characters.length - 1;
        }
      }
      // Master passkey: type imp11 to unlock all secrets
      if (isMasterPasskeyNeeded()) {
        masterCodeBuffer += key.toLowerCase();
        if (masterCodeBuffer.length > 20) masterCodeBuffer = masterCodeBuffer.slice(-20);
        if (masterCodeBuffer.includes('imp11')) {
          masterCodeBuffer = '';
          activateMasterPasskey();
          charSelectCursor = characters.length - 1;
          charSelectScroll = 0;
        }
      }
      const charSlots = characters.length + 1; // +1 for RANDOM
      const csPerRow = charSelectPerRow;
      if (!selectingCPU) {
        if (key === 'ArrowLeft' || key === 'a') charSelectCursor = (charSelectCursor - 1 + charSlots) % charSlots;
        if (key === 'ArrowRight' || key === 'd') charSelectCursor = (charSelectCursor + 1) % charSlots;
        if (key === 'ArrowUp' || key === 'w') {
          const newIdx = charSelectCursor - csPerRow;
          charSelectCursor = newIdx >= 0 ? newIdx : Math.min(charSelectCursor + (Math.ceil(charSlots / csPerRow) - 1) * csPerRow, charSlots - 1);
        }
        if (key === 'ArrowDown' || key === 's') {
          const newIdx = charSelectCursor + csPerRow;
          charSelectCursor = newIdx < charSlots ? newIdx : charSelectCursor % csPerRow;
        }
        if ((key === 'Enter' || key === ' ') && !lotteryActive) {
          if (charSelectCursor >= characters.length) {
            // Random - start lottery
            lotteryFinal = Math.floor(Math.random() * characters.length);
            lotteryCurrent = 0;
            lotteryTimer = 0;
            lotteryDuration = 90;
            lotteryType = 'char';
            lotteryActive = true;
            lotteryCallback = () => {
              selectedPlayer = characters[lotteryFinal];
              charSelectCursor = lotteryFinal;
              if (gameMode === 'rumblePractice') {
                selectedCPU = drone;
                selectedAssist = assists[0];
                cpuAssistIndex = 0;
                gameState = 'levelSelect';
              } else if (gameMode === 'practice') {
                gameState = 'practiceTargetSelect';
                practiceTargetCursor = 0;
              } else {
                selectingCPU = true;
                cpuSelectCursor = (charSelectCursor + 1) % charSlots;
              }
            };
          } else {
            selectedPlayer = characters[charSelectCursor];
            if (gameMode === 'rumblePractice') {
              selectedCPU = drone;
              selectedAssist = assists[0];
              cpuAssistIndex = 0;
              gameState = 'levelSelect';
            } else if (gameMode === 'practice') {
              gameState = 'practiceTargetSelect';
              practiceTargetCursor = 0;
            } else {
              selectingCPU = true;
              cpuSelectCursor = (charSelectCursor + 1) % charSlots;
            }
          }
        }
        if (key === 'Escape' || key === 'Backspace') {
          gameState = 'title';
        }
      } else {
        if (key === 'ArrowLeft' || key === 'a') cpuSelectCursor = (cpuSelectCursor - 1 + charSlots) % charSlots;
        if (key === 'ArrowRight' || key === 'd') cpuSelectCursor = (cpuSelectCursor + 1) % charSlots;
        if (key === 'ArrowUp' || key === 'w') {
          const newIdx = cpuSelectCursor - csPerRow;
          cpuSelectCursor = newIdx >= 0 ? newIdx : Math.min(cpuSelectCursor + (Math.ceil(charSlots / csPerRow) - 1) * csPerRow, charSlots - 1);
        }
        if (key === 'ArrowDown' || key === 's') {
          const newIdx = cpuSelectCursor + csPerRow;
          cpuSelectCursor = newIdx < charSlots ? newIdx : cpuSelectCursor % csPerRow;
        }
        if ((key === 'Enter' || key === ' ') && !lotteryActive) {
          if (cpuSelectCursor >= characters.length) {
            lotteryFinal = Math.floor(Math.random() * characters.length);
            lotteryCurrent = 0;
            lotteryTimer = 0;
            lotteryDuration = 90;
            lotteryType = 'cpu';
            lotteryActive = true;
            lotteryCallback = () => {
              selectedCPU = characters[lotteryFinal];
              gameState = 'assistSelect';
              assistCursor = 0;
              selectingCPUAssist = false;
            };
          } else {
            selectedCPU = characters[cpuSelectCursor];
            gameState = 'assistSelect';
            assistCursor = 0;
            selectingCPUAssist = false;
          }
        }
        if (key === 'Escape' || key === 'Backspace') {
          selectingCPU = false;
        }
      }
      break;
    }

    case 'practiceTargetSelect': {
      const numTargets = 3;
      if (key === 'ArrowLeft' || key === 'a' || key === 'ArrowUp' || key === 'w') practiceTargetCursor = (practiceTargetCursor - 1 + numTargets) % numTargets;
      if (key === 'ArrowRight' || key === 'd' || key === 'ArrowDown' || key === 's') practiceTargetCursor = (practiceTargetCursor + 1) % numTargets;
      if (key === 'Enter' || key === ' ') {
        selectedCPU = [punchingBag, mannequin, drone][practiceTargetCursor];
        gameState = 'assistSelect';
        assistCursor = 0;
        selectingCPUAssist = false;
      }
      if (key === 'Escape' || key === 'Backspace') {
        gameState = 'charSelect';
        charSelectScroll = 0;
      }
      break;
    }

    case 'assistSelect': {
      const assistSlots = assists.length + 1; // +1 for RANDOM
      if (!selectingCPUAssist) {
        if (key === 'ArrowLeft' || key === 'a') assistCursor = (assistCursor - 1 + assistSlots) % assistSlots;
        if (key === 'ArrowRight' || key === 'd') assistCursor = (assistCursor + 1) % assistSlots;
        if ((key === 'Enter' || key === ' ') && !lotteryActive) {
          if (assistCursor >= assists.length) {
            lotteryFinal = Math.floor(Math.random() * assists.length);
            lotteryCurrent = 0;
            lotteryTimer = 0;
            lotteryDuration = 90;
            lotteryType = 'assist';
            lotteryActive = true;
            lotteryCallback = () => {
              selectedAssist = assists[lotteryFinal];
              if (gameMode === 'practice') {
                cpuAssistIndex = Math.floor(Math.random() * assists.length);
                levelSelectCursor = 0;
                gameState = 'levelSelect';
              } else {
                selectingCPUAssist = true;
                cpuAssistCursor = 0;
              }
            };
          } else {
            selectedAssist = assists[assistCursor];
            if (gameMode === 'practice') {
              cpuAssistIndex = Math.floor(Math.random() * assists.length);
              levelSelectCursor = 0;
              gameState = 'levelSelect';
            } else {
              selectingCPUAssist = true;
              cpuAssistCursor = 0;
            }
          }
        }
        if (key === 'Escape' || key === 'Backspace') {
          if (gameMode === 'practice') {
            gameState = 'practiceTargetSelect';
            practiceTargetCursor = 0;
          } else {
            gameState = 'charSelect';
            charSelectScroll = 0;
            selectingCPU = true;
          }
        }
      } else {
        if (key === 'ArrowLeft' || key === 'a') cpuAssistCursor = (cpuAssistCursor - 1 + assistSlots) % assistSlots;
        if (key === 'ArrowRight' || key === 'd') cpuAssistCursor = (cpuAssistCursor + 1) % assistSlots;
        if ((key === 'Enter' || key === ' ') && !lotteryActive) {
          if (cpuAssistCursor >= assists.length) {
            lotteryFinal = Math.floor(Math.random() * assists.length);
            lotteryCurrent = 0;
            lotteryTimer = 0;
            lotteryDuration = 90;
            lotteryType = 'cpuAssist';
            lotteryActive = true;
            lotteryCallback = () => {
              cpuAssistIndex = lotteryFinal;
              gameState = 'difficultySelect';
            };
          } else {
            cpuAssistIndex = cpuAssistCursor;
            gameState = 'difficultySelect';
          }
        }
        if (key === 'Escape' || key === 'Backspace') {
          selectingCPUAssist = false;
        }
      }

      // Weedthorn unlock code: RTH
      if (!weedthornUnlocked && key.length === 1) {
        weedthornCodeBuffer += key.toUpperCase();
        if (weedthornCodeBuffer.length > 3) weedthornCodeBuffer = weedthornCodeBuffer.slice(-3);
        if (weedthornCodeBuffer === 'RTH') {
          weedthornUnlocked = true;
          insertAssistOrdered(weedthornAssist);
          weedthornUnlockFlash = 60;
        }
      }
      // Boj unlock code: B0J
      if (!bojAssistUnlocked && key.length === 1) {
        bojAssistCodeBuffer += key.toUpperCase();
        if (bojAssistCodeBuffer.length > 3) bojAssistCodeBuffer = bojAssistCodeBuffer.slice(-3);
        if (bojAssistCodeBuffer === 'B0J') {
          bojAssistUnlocked = true;
          insertAssistOrdered(bojAssist);
          bojAssistUnlockFlash = 60;
        }
      }
      // The Jazz unlock code: WKA
      if (!jazzAssistUnlocked && key.length === 1) {
        jazzAssistCodeBuffer += key.toUpperCase();
        if (jazzAssistCodeBuffer.length > 3) jazzAssistCodeBuffer = jazzAssistCodeBuffer.slice(-3);
        if (jazzAssistCodeBuffer === 'WKA') {
          jazzAssistUnlocked = true;
          insertAssistOrdered(jazzAssist);
          jazzAssistUnlockFlash = 60;
        }
      }
      // Cyano unlock code: JAY
      if (!cyanoAssistUnlocked && key.length === 1) {
        cyanoAssistCodeBuffer += key.toUpperCase();
        if (cyanoAssistCodeBuffer.length > 3) cyanoAssistCodeBuffer = cyanoAssistCodeBuffer.slice(-3);
        if (cyanoAssistCodeBuffer === 'JAY') {
          cyanoAssistUnlocked = true;
          insertAssistOrdered(cyanoAssist);
          cyanoAssistUnlockFlash = 60;
        }
      }
      // Warper unlock code: PAC
      if (!warperAssistUnlocked && key.length === 1) {
        warperAssistCodeBuffer += key.toUpperCase();
        if (warperAssistCodeBuffer.length > 3) warperAssistCodeBuffer = warperAssistCodeBuffer.slice(-3);
        if (warperAssistCodeBuffer === 'PAC') {
          warperAssistUnlocked = true;
          insertAssistOrdered(warperAssist);
          warperAssistUnlockFlash = 60;
        }
      }
      // Aphid unlock code: FLY
      if (!aphidAssistUnlocked && key.length === 1) {
        aphidAssistCodeBuffer += key.toUpperCase();
        if (aphidAssistCodeBuffer.length > 3) aphidAssistCodeBuffer = aphidAssistCodeBuffer.slice(-3);
        if (aphidAssistCodeBuffer === 'FLY') {
          aphidAssistUnlocked = true;
          insertAssistOrdered(aphidAssist);
          aphidAssistUnlockFlash = 60;
        }
      }
      // Stud unlock code: TOR
      if (!studAssistUnlocked && key.length === 1) {
        studAssistCodeBuffer += key.toUpperCase();
        if (studAssistCodeBuffer.length > 3) studAssistCodeBuffer = studAssistCodeBuffer.slice(-3);
        if (studAssistCodeBuffer === 'TOR') {
          studAssistUnlocked = true;
          insertAssistOrdered(studAssist);
          studAssistUnlockFlash = 60;
        }
      }
      // Float unlock code: SFT
      if (!floatAssistUnlocked && key.length === 1) {
        floatAssistCodeBuffer += key.toUpperCase();
        if (floatAssistCodeBuffer.length > 3) floatAssistCodeBuffer = floatAssistCodeBuffer.slice(-3);
        if (floatAssistCodeBuffer === 'SFT') {
          floatAssistUnlocked = true;
          insertAssistOrdered(floatAssist);
          floatAssistUnlockFlash = 60;
        }
      }
      // Sticker unlock code: GLU
      if (!stickerAssistUnlocked && key.length === 1) {
        stickerAssistCodeBuffer += key.toUpperCase();
        if (stickerAssistCodeBuffer.length > 3) stickerAssistCodeBuffer = stickerAssistCodeBuffer.slice(-3);
        if (stickerAssistCodeBuffer === 'GLU') {
          stickerAssistUnlocked = true;
          insertAssistOrdered(stickerAssist);
          stickerAssistUnlockFlash = 60;
        }
      }
      // Serpent unlock code: SNK
      if (!serpentAssistUnlocked && key.length === 1) {
        serpentAssistCodeBuffer += key.toUpperCase();
        if (serpentAssistCodeBuffer.length > 3) serpentAssistCodeBuffer = serpentAssistCodeBuffer.slice(-3);
        if (serpentAssistCodeBuffer === 'SNK') {
          serpentAssistUnlocked = true;
          insertAssistOrdered(serpentAssist);
          serpentAssistUnlockFlash = 60;
        }
      }
      // Master passkey: type imp11 to unlock all secrets
      if (isMasterPasskeyNeeded()) {
        masterCodeBuffer += key.toLowerCase();
        if (masterCodeBuffer.length > 20) masterCodeBuffer = masterCodeBuffer.slice(-20);
        if (masterCodeBuffer.includes('imp11')) {
          masterCodeBuffer = '';
          activateMasterPasskey();
        }
      }
      break;
    }

    case 'difficultySelect':
      if (key === 'ArrowLeft' || key === 'a') difficultyCursor = (difficultyCursor - 1 + difficulties.length) % difficulties.length;
      if (key === 'ArrowRight' || key === 'd') difficultyCursor = (difficultyCursor + 1) % difficulties.length;
      if (key === 'Enter' || key === ' ') {
        cpuDifficulty = difficulties[difficultyCursor];
        levelSelectCursor = 0;
        gameState = 'levelSelect';
      }
      if (key === 'Escape' || key === 'Backspace') {
        gameState = 'assistSelect';
      }
      break;

    case 'levelSelect': {
      const lvls = getLevels();
      const totalItems = lvls.length + 1; // +1 for RANDOM
      const perRow = Math.min(totalItems, 5);

      if (key === 'ArrowLeft' || key === 'a') levelSelectCursor = (levelSelectCursor - 1 + totalItems) % totalItems;
      if (key === 'ArrowRight' || key === 'd') levelSelectCursor = (levelSelectCursor + 1) % totalItems;
      if (key === 'ArrowUp' || key === 'w') {
        levelSelectCursor -= perRow;
        if (levelSelectCursor < 0) levelSelectCursor += totalItems;
      }
      if (key === 'ArrowDown' || key === 's') {
        levelSelectCursor += perRow;
        if (levelSelectCursor >= totalItems) levelSelectCursor -= totalItems;
      }

      if ((key === 'Enter' || key === ' ') && !lotteryActive) {
        if (levelSelectCursor >= lvls.length) {
          // Random
          lotteryFinal = Math.floor(Math.random() * lvls.length);
          lotteryCurrent = 0;
          lotteryTimer = 0;
          lotteryDuration = 90;
          lotteryType = 'level';
          lotteryActive = true;
          lotteryCallback = () => {
            levelSelectCursor = lotteryFinal;
            selectedLevel = lvls[lotteryFinal];
            startVersusScreen();
          };
        } else {
          selectedLevel = lvls[levelSelectCursor];
          startVersusScreen();
        }
      }
      if (key === 'Escape' || key === 'Backspace') {
        if (gameMode === 'rumblePractice') {
          gameState = 'charSelect';
          selectingCPU = false;
          charSelectScroll = 0;
        } else if (gameMode === 'practice') {
          gameState = 'assistSelect';
        } else {
          gameState = 'difficultySelect';
        }
      }

      // Secret level unlock codes
      if (!snowyCityUnlocked && key.length === 1) {
        snowyCityCodeBuffer += key.toUpperCase();
        if (snowyCityCodeBuffer.length > 10) snowyCityCodeBuffer = snowyCityCodeBuffer.slice(-10);
        if (snowyCityCodeBuffer.includes('NY')) {
          snowyCityUnlocked = true;
          snowyCityUnlockFlash = 60;
        }
      }
      if (!foggyCityUnlocked && key.length === 1) {
        foggyCityCodeBuffer += key.toUpperCase();
        if (foggyCityCodeBuffer.length > 10) foggyCityCodeBuffer = foggyCityCodeBuffer.slice(-10);
        if (foggyCityCodeBuffer.includes('SF')) {
          foggyCityUnlocked = true;
          foggyCityUnlockFlash = 60;
        }
      }
      if (!rainyCityUnlocked && key.length === 1) {
        rainyCityCodeBuffer += key.toUpperCase();
        if (rainyCityCodeBuffer.length > 10) rainyCityCodeBuffer = rainyCityCodeBuffer.slice(-10);
        if (rainyCityCodeBuffer.includes('SE')) {
          rainyCityUnlocked = true;
          rainyCityUnlockFlash = 60;
        }
      }
      if (!glowingCityUnlocked && key.length === 1) {
        glowingCityCodeBuffer += key.toUpperCase();
        if (glowingCityCodeBuffer.length > 10) glowingCityCodeBuffer = glowingCityCodeBuffer.slice(-10);
        if (glowingCityCodeBuffer.includes('LV')) {
          glowingCityUnlocked = true;
          glowingCityUnlockFlash = 60;
        }
      }
      if (!sunnyCityUnlocked && key.length === 1) {
        sunnyCityCodeBuffer += key.toUpperCase();
        if (sunnyCityCodeBuffer.length > 10) sunnyCityCodeBuffer = sunnyCityCodeBuffer.slice(-10);
        if (sunnyCityCodeBuffer.includes('LA')) {
          sunnyCityUnlocked = true;
          sunnyCityUnlockFlash = 60;
        }
      }
      break;
    }

    case 'versus':
      if (key === 'Escape') {
        gameState = 'levelSelect';
      }
      break;

    case 'fight':
      if (key === ' ') paused = !paused;
      if (key === 'Escape') {
        gameState = 'title';
        paused = false;
        stopFightMusic();
        playTitleMusic();
      }
      // Corvida: detect double-tap jump for jay transform
      if ((key === 'ArrowUp' || key === 'w' || key === 'W') && player && player.char.isCorvida && !player.isJay) {
        if (frameCount - player.lastJumpPress < 20) {
          player.corvidaJayPending = true;
          player.lastJumpPress = 0;
        } else {
          player.lastJumpPress = frameCount;
        }
      }
      // Batsch: detect double-tap crouch for tortoise transform
      if ((key === 'ArrowDown' || key === 's' || key === 'S') && player && player.char.isBatsch && !player.isTortoise) {
        if (frameCount - player.lastCrouchPress < 20) {
          player.batschCrouchPending = true;
          player.lastCrouchPress = 0;
        } else {
          player.lastCrouchPress = frameCount;
        }
      }
      break;

    case 'finishHim':
      if (key === ' ') paused = !paused;
      if (key === 'Escape') {
        gameState = 'title';
        paused = false;
        playTitleMusic();
        rumbleActive = false; rumbleTimer = 0; rumbleType = null; rumbleSubType = null;
        rumbleCodeBuffer = ''; rumbleAshes = null; rumbleLoserHidden = false; rumbleIceShards = [];
        rumbleAcidBlob = null; rumbleGoo = null; rumbleAcidSplashes = []; rumbleVenomMeltPct = 0; rumbleVenomDrips = [];
        rumbleLightBurst = null; rumbleLightParticles = []; rumbleZapActive = false;
        rumbleSinkhole = null; rumbleSinkProgress = 0; rumbleDirtParticles = [];
        rumbleShadePoof = false; rumbleSmokeParticles = []; rumbleShadeComboHit = 0; rumbleShadeBrush = false;
        rumbleBojdoPhase = 0; rumbleBojdoLaunchVy = 0;
        rumbleTetherAngle = 0; rumbleTetherSlams = 0; rumbleTetherCracked = false; rumbleTetherGrabX = 0;
        rumbleTorrenaPhase = 0; rumbleTorrenaCloudX = 0; rumbleTorrenaCloudY = 0; rumbleRaindrops = []; rumbleHailstone = null; rumbleHailCracked = false; rumbleHailShards = []; rumbleTorrenaEvapParticles = [];
        rumbleSnazzDiscoBall = null; rumbleSnazzConfetti = []; rumbleSnazzPunchLanded = false;
        rumbleHaystackRavens = []; rumbleHaystackScythe = false; rumbleHaystackStrike = false; rumbleHaystackDust = []; rumbleHaystackDiveStart = null;
        rumbleCodemaxLaser = false; rumbleCodemaxPixelLevel = 0; rumbleCodemaxGlitch = 0; rumbleCodemaxLaserParticles = [];
        rumbleCorvidaPhase = 0; rumbleCorvidaNestX = 0; rumbleCorvidaEggs = []; rumbleCorvidaGulpChick = -1;
        rumbleGolgarEntity2 = null; rumbleGolgarPhase = 0; rumbleGolgarLaunchVy = 0; rumbleGolgarOpX = 0;
        if (player) { player.rubberArmReach = 0; player._hideFrontArm = false; player._hideBackArm = false; player._rumbleRotation = 0; }
        if (cpu) { cpu.rubberArmReach = 0; cpu._hideFrontArm = false; cpu._hideBackArm = false; cpu._rumbleRotation = 0; }
        if (player) { player._brushArmT = undefined; player._rumbleAlpha = undefined; }
        if (cpu) { cpu._brushArmT = undefined; cpu._rumbleAlpha = undefined; }
      }
      // Rumble code input (only when not paused and no rumble active)
      if (!paused && !rumbleActive && winner === 'player') {
        if (key.length === 1) {
          rumbleCodeBuffer += key.toLowerCase();
          if (rumbleCodeBuffer.length > 10) rumbleCodeBuffer = rumbleCodeBuffer.slice(-10);
          const winChar = winner === 'player' ? selectedPlayer : selectedCPU;
          const rumbleEntry = characterRumbles[winChar.name];
          if (rumbleEntry) {
            const rumbleList = Array.isArray(rumbleEntry) ? rumbleEntry : [rumbleEntry];
            for (const rumble of rumbleList) {
              if (rumbleCodeBuffer.includes(rumble.code)) {
                rumbleActive = true;
                rumbleTimer = 0;
                rumbleType = winChar.name;
                rumbleSubType = rumble.code;
                rumblePracticeUnlocked = true;
                rumbleCodeBuffer = '';
                player.assistActive = null;
                cpu.assistActive = null;
                break;
              }
            }
          }
        }
      }
      break;

    case 'victory':
      if (key === 'Enter' || key === ' ') {
        if (gameMode === 'rumblePractice') {
          startRumblePractice();
          break;
        }
        gameState = 'title';
        paused = false;
        playTitleMusic();
        rumbleActive = false; rumbleTimer = 0; rumbleType = null; rumbleSubType = null;
        rumbleCodeBuffer = ''; rumbleAshes = null; rumbleLoserHidden = false; rumbleIceShards = [];
        rumbleAcidBlob = null; rumbleGoo = null; rumbleAcidSplashes = []; rumbleVenomMeltPct = 0; rumbleVenomDrips = [];
        rumbleLightBurst = null; rumbleLightParticles = []; rumbleZapActive = false;
        rumbleSinkhole = null; rumbleSinkProgress = 0; rumbleDirtParticles = [];
        rumbleShadePoof = false; rumbleSmokeParticles = []; rumbleShadeComboHit = 0; rumbleShadeBrush = false;
        rumbleBojdoPhase = 0; rumbleBojdoLaunchVy = 0;
        rumbleTetherAngle = 0; rumbleTetherSlams = 0; rumbleTetherCracked = false; rumbleTetherGrabX = 0;
        rumbleTorrenaPhase = 0; rumbleTorrenaCloudX = 0; rumbleTorrenaCloudY = 0; rumbleRaindrops = []; rumbleHailstone = null; rumbleHailCracked = false; rumbleHailShards = []; rumbleTorrenaEvapParticles = [];
        rumbleSnazzDiscoBall = null; rumbleSnazzConfetti = []; rumbleSnazzPunchLanded = false;
        rumbleHaystackRavens = []; rumbleHaystackScythe = false; rumbleHaystackStrike = false; rumbleHaystackDust = []; rumbleHaystackDiveStart = null;
        rumbleCodemaxLaser = false; rumbleCodemaxPixelLevel = 0; rumbleCodemaxGlitch = 0; rumbleCodemaxLaserParticles = [];
        rumbleCorvidaPhase = 0; rumbleCorvidaNestX = 0; rumbleCorvidaEggs = []; rumbleCorvidaGulpChick = -1;
        rumbleGolgarEntity2 = null; rumbleGolgarPhase = 0; rumbleGolgarLaunchVy = 0; rumbleGolgarOpX = 0;
        if (player) { player.rubberArmReach = 0; player._hideFrontArm = false; player._hideBackArm = false; player._rumbleRotation = 0; }
        if (cpu) { cpu.rubberArmReach = 0; cpu._hideFrontArm = false; cpu._hideBackArm = false; cpu._rumbleRotation = 0; }
        if (player) { player._brushArmT = undefined; player._rumbleAlpha = undefined; }
        if (cpu) { cpu._brushArmT = undefined; cpu._rumbleAlpha = undefined; }
      }
      if ((key === 'Escape' || key === 'Backspace') && gameMode === 'rumblePractice') {
        gameState = 'title';
        paused = false;
        playTitleMusic();
        rumbleActive = false; rumbleTimer = 0; rumbleType = null; rumbleSubType = null;
        rumbleCodeBuffer = ''; rumbleAshes = null; rumbleLoserHidden = false; rumbleIceShards = [];
        rumbleAcidBlob = null; rumbleGoo = null; rumbleAcidSplashes = []; rumbleVenomMeltPct = 0; rumbleVenomDrips = [];
        rumbleLightBurst = null; rumbleLightParticles = []; rumbleZapActive = false;
        rumbleSinkhole = null; rumbleSinkProgress = 0; rumbleDirtParticles = [];
        rumbleShadePoof = false; rumbleSmokeParticles = []; rumbleShadeComboHit = 0; rumbleShadeBrush = false;
        rumbleBojdoPhase = 0; rumbleBojdoLaunchVy = 0;
        rumbleTetherAngle = 0; rumbleTetherSlams = 0; rumbleTetherCracked = false; rumbleTetherGrabX = 0;
        rumbleTorrenaPhase = 0; rumbleTorrenaCloudX = 0; rumbleTorrenaCloudY = 0; rumbleRaindrops = []; rumbleHailstone = null; rumbleHailCracked = false; rumbleHailShards = []; rumbleTorrenaEvapParticles = [];
        rumbleSnazzDiscoBall = null; rumbleSnazzConfetti = []; rumbleSnazzPunchLanded = false;
        rumbleHaystackRavens = []; rumbleHaystackScythe = false; rumbleHaystackStrike = false; rumbleHaystackDust = []; rumbleHaystackDiveStart = null;
        rumbleCodemaxLaser = false; rumbleCodemaxPixelLevel = 0; rumbleCodemaxGlitch = 0; rumbleCodemaxLaserParticles = [];
        rumbleCorvidaPhase = 0; rumbleCorvidaNestX = 0; rumbleCorvidaEggs = []; rumbleCorvidaGulpChick = -1;
        rumbleGolgarEntity2 = null; rumbleGolgarPhase = 0; rumbleGolgarLaunchVy = 0; rumbleGolgarOpX = 0;
        if (player) { player.rubberArmReach = 0; player._hideFrontArm = false; player._hideBackArm = false; player._rumbleRotation = 0; }
        if (cpu) { cpu.rubberArmReach = 0; cpu._hideFrontArm = false; cpu._hideBackArm = false; cpu._rumbleRotation = 0; }
        if (player) { player._brushArmT = undefined; player._rumbleAlpha = undefined; }
        if (cpu) { cpu._brushArmT = undefined; cpu._rumbleAlpha = undefined; }
      }
      break;
  }
}

let player, cpu;

// --- VERSUS SCREEN STATE ---
let versusTimer = 0;
const VERSUS_DURATION = 150; // frames (~2.5 sec at 60fps)

function startVersusScreen() {
  versusTimer = 0;
  gameState = 'versus';
  stopTitleMusic();
  const level = selectedLevel ? selectedLevel.name : 'CLASSIC';
  if (level === 'CLASSIC') playFightMusic();
}

function startRumblePractice() {
  // Create fighters like a normal fight
  player = new Fighter(selectedPlayer, 250, 1, true, selectedAssist);
  cpu = new Fighter(selectedCPU, 710, -1, false, assists[cpuAssistIndex]);
  paused = false;
  shakeTimer = 0;
  rumbleActive = false; rumbleTimer = 0; rumbleType = null; rumbleSubType = null;
  rumbleCodeBuffer = ''; rumbleAshes = null; rumbleLoserHidden = false; rumbleIceShards = [];
  rumbleAcidBlob = null; rumbleGoo = null; rumbleAcidSplashes = []; rumbleVenomMeltPct = 0; rumbleVenomDrips = [];
  rumbleLightBurst = null; rumbleLightParticles = []; rumbleZapActive = false;
  rumbleSinkhole = null; rumbleSinkProgress = 0; rumbleDirtParticles = [];
  rumbleShadePoof = false; rumbleSmokeParticles = []; rumbleShadeComboHit = 0; rumbleShadeBrush = false;
  rumbleBojdoPhase = 0; rumbleBojdoLaunchVy = 0;
  rumbleTetherAngle = 0; rumbleTetherSlams = 0; rumbleTetherCracked = false; rumbleTetherGrabX = 0;
  rumbleTorrenaPhase = 0; rumbleTorrenaCloudX = 0; rumbleTorrenaCloudY = 0; rumbleRaindrops = []; rumbleHailstone = null; rumbleHailCracked = false; rumbleHailShards = []; rumbleTorrenaEvapParticles = [];
  rumbleSnazzDiscoBall = null; rumbleSnazzConfetti = []; rumbleSnazzPunchLanded = false;
  rumbleHaystackRavens = []; rumbleHaystackScythe = false; rumbleHaystackStrike = false; rumbleHaystackDust = []; rumbleHaystackDiveStart = null;
  rumbleCodemaxLaser = false; rumbleCodemaxPixelLevel = 0; rumbleCodemaxGlitch = 0; rumbleCodemaxLaserParticles = [];
  rumbleCorvidaPhase = 0; rumbleCorvidaNestX = 0; rumbleCorvidaEggs = []; rumbleCorvidaGulpChick = -1;
  rumbleGolgarEntity2 = null; rumbleGolgarPhase = 0; rumbleGolgarLaunchVy = 0; rumbleGolgarOpX = 0;
  rumbleTelatrinePhase = 0; rumbleTelatrineShrug = 0;
  if (player) { player._brushArmT = undefined; player._rumbleAlpha = undefined; player.waterPhase = false; player._hideFrontArm = false; player._hideBackArm = false; player._rumbleRotation = 0; player.rubberArmReach = 0; player.dancing = false; player.danceTimer = 0; }
  if (cpu) { cpu._brushArmT = undefined; cpu._rumbleAlpha = undefined; cpu.waterPhase = false; cpu._hideFrontArm = false; cpu._hideBackArm = false; cpu._rumbleRotation = 0; cpu.rubberArmReach = 0; cpu.dancing = false; cpu.danceTimer = 0; }
  // Set player as winner, cpu health to 0
  winner = 'player';
  cpu.health = 0;
  // Clear hit effects on both fighters
  for (const f of [player, cpu]) {
    f.hitEffect = null;
    f.assistActive = null;
    f.queuedAttacks = [];
    f.inputBuffer = [];
    f.aiComboQueue = [];
  }
  // Go straight to finishHim
  finishHimTimer = 0;
  gameState = 'finishHim';
}

function startFight() {
  player = new Fighter(selectedPlayer, 250, 1, true, selectedAssist);
  cpu = new Fighter(selectedCPU, 710, -1, false, assists[cpuAssistIndex]);
  gameState = 'fight';
  paused = false;
  winner = null;
  shakeTimer = 0;
  rumbleActive = false; rumbleTimer = 0; rumbleType = null;
  rumbleCodeBuffer = ''; rumbleAshes = null; rumbleLoserHidden = false; rumbleIceShards = [];
        rumbleAcidBlob = null; rumbleGoo = null; rumbleAcidSplashes = []; rumbleVenomMeltPct = 0; rumbleVenomDrips = [];
        rumbleLightBurst = null; rumbleLightParticles = []; rumbleZapActive = false;
        rumbleSinkhole = null; rumbleSinkProgress = 0; rumbleDirtParticles = [];
        rumbleShadePoof = false; rumbleSmokeParticles = []; rumbleShadeComboHit = 0; rumbleShadeBrush = false;
        rumbleBojdoPhase = 0; rumbleBojdoLaunchVy = 0;
        rumbleTetherAngle = 0; rumbleTetherSlams = 0; rumbleTetherCracked = false; rumbleTetherGrabX = 0;
        rumbleTorrenaPhase = 0; rumbleTorrenaCloudX = 0; rumbleTorrenaCloudY = 0; rumbleRaindrops = []; rumbleHailstone = null; rumbleHailCracked = false; rumbleHailShards = []; rumbleTorrenaEvapParticles = [];
        rumbleSnazzDiscoBall = null; rumbleSnazzConfetti = []; rumbleSnazzPunchLanded = false;
        rumbleHaystackRavens = []; rumbleHaystackScythe = false; rumbleHaystackStrike = false; rumbleHaystackDust = []; rumbleHaystackDiveStart = null;
        rumbleCodemaxLaser = false; rumbleCodemaxPixelLevel = 0; rumbleCodemaxGlitch = 0; rumbleCodemaxLaserParticles = [];
        rumbleCorvidaPhase = 0; rumbleCorvidaNestX = 0; rumbleCorvidaEggs = []; rumbleCorvidaGulpChick = -1;
        rumbleGolgarEntity2 = null; rumbleGolgarPhase = 0; rumbleGolgarLaunchVy = 0; rumbleGolgarOpX = 0;
        if (player) { player.rubberArmReach = 0; player._hideFrontArm = false; player._hideBackArm = false; player._rumbleRotation = 0; }
        if (cpu) { cpu.rubberArmReach = 0; cpu._hideFrontArm = false; cpu._hideBackArm = false; cpu._rumbleRotation = 0; }
        if (player) { player._brushArmT = undefined; player._rumbleAlpha = undefined; }
        if (cpu) { cpu._brushArmT = undefined; cpu._rumbleAlpha = undefined; }
}

// --- DRAWING FUNCTIONS ---
function drawPortraitIcon(charName, x, y, size) {
  const img = portraitImages[charName];
  if (img) {
    ctx.save();
    ctx.drawImage(img, x - size, y - size, size * 2, size * 2);
    ctx.restore();
  } else {
    // fallback to procedural icon if portrait not loaded yet
    drawFighterIcon(charName, x, y, size, '#fff');
  }
}

function drawFighterIcon(charName, x, y, size, color) {
  ctx.save();
  ctx.translate(x, y);
  const s = size / 16; // normalize to base size 16
  ctx.fillStyle = color;
  ctx.strokeStyle = color;

  switch (charName) {
    case 'BLAZE': {
      // Flame
      ctx.beginPath();
      ctx.moveTo(0, -14 * s);
      ctx.quadraticCurveTo(8 * s, -6 * s, 7 * s, 4 * s);
      ctx.quadraticCurveTo(4 * s, 10 * s, 0, 12 * s);
      ctx.quadraticCurveTo(-4 * s, 10 * s, -7 * s, 4 * s);
      ctx.quadraticCurveTo(-8 * s, -6 * s, 0, -14 * s);
      ctx.fill();
      break;
    }
    case 'ARTIK': {
      if (iconImages['ARTIK']) {
        ctx.drawImage(iconImages['ARTIK'], -size, -size, size * 2, size * 2);
      } else {
        // Fallback while image loads
        ctx.lineWidth = 1.5 * s;
        for (let i = 0; i < 6; i++) {
          const a = (i / 6) * Math.PI * 2;
          ctx.beginPath(); ctx.moveTo(0, 0);
          ctx.lineTo(Math.cos(a) * 10 * s, Math.sin(a) * 10 * s);
          ctx.stroke();
        }
      }
      break;
    }
    case 'VENOM': {
      // Fang/tooth
      ctx.beginPath();
      ctx.moveTo(-6 * s, -12 * s);
      ctx.lineTo(0, 12 * s);
      ctx.lineTo(6 * s, -12 * s);
      ctx.quadraticCurveTo(0, -6 * s, -6 * s, -12 * s);
      ctx.fill();
      break;
    }
    case 'SURGE': {
      // Lightning bolt
      ctx.beginPath();
      ctx.moveTo(2 * s, -13 * s);
      ctx.lineTo(-4 * s, 0);
      ctx.lineTo(1 * s, 0);
      ctx.lineTo(-3 * s, 13 * s);
      ctx.lineTo(7 * s, -2 * s);
      ctx.lineTo(2 * s, -2 * s);
      ctx.closePath();
      ctx.fill();
      break;
    }
    case 'TITAN': {
      // Shield
      ctx.beginPath();
      ctx.moveTo(0, -12 * s);
      ctx.lineTo(10 * s, -8 * s);
      ctx.lineTo(10 * s, 2 * s);
      ctx.quadraticCurveTo(10 * s, 10 * s, 0, 14 * s);
      ctx.quadraticCurveTo(-10 * s, 10 * s, -10 * s, 2 * s);
      ctx.lineTo(-10 * s, -8 * s);
      ctx.closePath();
      ctx.fill();
      break;
    }
    case 'SHADE': {
      // Half circle / mask
      ctx.beginPath();
      ctx.arc(0, 0, 11 * s, 0, Math.PI * 2);
      ctx.fill();
      // Cut out an eye slit
      ctx.save();
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.ellipse(0, -1 * s, 7 * s, 2.5 * s, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
      break;
    }
    case 'BOJDO':
    case 'BOJDOBOJDO': {
      // Up/down arrows (size shift)
      ctx.beginPath();
      ctx.moveTo(0, -13 * s);
      ctx.lineTo(6 * s, -5 * s);
      ctx.lineTo(-6 * s, -5 * s);
      ctx.closePath();
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(0, 13 * s);
      ctx.lineTo(6 * s, 5 * s);
      ctx.lineTo(-6 * s, 5 * s);
      ctx.closePath();
      ctx.fill();
      // Center bar
      ctx.fillRect(-2 * s, -5 * s, 4 * s, 10 * s);
      break;
    }
    case 'RUBBERMAN': {
      // Stretched spring/coil
      ctx.lineWidth = 2.5 * s;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(-8 * s, -10 * s);
      ctx.lineTo(8 * s, -5 * s);
      ctx.lineTo(-8 * s, 0);
      ctx.lineTo(8 * s, 5 * s);
      ctx.lineTo(-8 * s, 10 * s);
      ctx.stroke();
      break;
    }
    case 'TORRENA': {
      // Water droplet
      ctx.beginPath();
      ctx.moveTo(0, -13 * s);
      ctx.quadraticCurveTo(10 * s, 2 * s, 0, 13 * s);
      ctx.quadraticCurveTo(-10 * s, 2 * s, 0, -13 * s);
      ctx.fill();
      break;
    }
    case 'CODEMAX': {
      // Angle brackets < / >
      ctx.lineWidth = 3 * s;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.beginPath();
      ctx.moveTo(-2 * s, -10 * s);
      ctx.lineTo(-9 * s, 0);
      ctx.lineTo(-2 * s, 10 * s);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(2 * s, -10 * s);
      ctx.lineTo(9 * s, 0);
      ctx.lineTo(2 * s, 10 * s);
      ctx.stroke();
      break;
    }
    case 'HAYSTACK': {
      // Scarecrow cross
      ctx.lineWidth = 3 * s;
      ctx.lineCap = 'round';
      // Vertical
      ctx.beginPath();
      ctx.moveTo(0, -12 * s);
      ctx.lineTo(0, 12 * s);
      ctx.stroke();
      // Horizontal arms
      ctx.beginPath();
      ctx.moveTo(-10 * s, -4 * s);
      ctx.lineTo(10 * s, -4 * s);
      ctx.stroke();
      // Head circle
      ctx.beginPath();
      ctx.arc(0, -12 * s, 4 * s, 0, Math.PI * 2);
      ctx.fill();
      break;
    }
    case 'SNAZZ MCJAZZ': {
      // Music note
      ctx.beginPath();
      ctx.arc(-4 * s, 8 * s, 5 * s, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillRect(-4 * s + 4.5 * s, -12 * s, 2.5 * s, 20 * s);
      // Flag
      ctx.beginPath();
      ctx.moveTo(-4 * s + 7 * s, -12 * s);
      ctx.lineTo(-4 * s + 7 * s + 8 * s, -8 * s);
      ctx.lineTo(-4 * s + 7 * s, -4 * s);
      ctx.fill();
      break;
    }
    case 'DUPLAIRE': {
      // Two overlapping circles
      ctx.globalAlpha = 0.8;
      ctx.beginPath();
      ctx.arc(-4 * s, 0, 9 * s, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(4 * s, 0, 9 * s, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
      break;
    }
    case 'TELATRINE': {
      // Portal ring
      ctx.lineWidth = 3 * s;
      ctx.beginPath();
      ctx.ellipse(0, 0, 10 * s, 12 * s, 0, 0, Math.PI * 2);
      ctx.stroke();
      // Center dot
      ctx.beginPath();
      ctx.arc(0, 0, 3 * s, 0, Math.PI * 2);
      ctx.fill();
      break;
    }
    case 'GOLGAR': {
      // Yin-yang style dual shape
      ctx.beginPath();
      ctx.arc(0, 0, 11 * s, -Math.PI / 2, Math.PI / 2);
      ctx.arc(0, 5.5 * s, 5.5 * s, Math.PI / 2, -Math.PI / 2, true);
      ctx.arc(0, -5.5 * s, 5.5 * s, Math.PI / 2, -Math.PI / 2);
      ctx.fill();
      break;
    }
    case 'CORVIDA': {
      // Bird/wing silhouette
      ctx.beginPath();
      ctx.moveTo(0, 4 * s);
      ctx.quadraticCurveTo(-14 * s, -8 * s, -10 * s, -12 * s);
      ctx.quadraticCurveTo(-4 * s, -6 * s, 0, -4 * s);
      ctx.quadraticCurveTo(4 * s, -6 * s, 10 * s, -12 * s);
      ctx.quadraticCurveTo(14 * s, -8 * s, 0, 4 * s);
      ctx.fill();
      // Tail
      ctx.beginPath();
      ctx.moveTo(-3 * s, 4 * s);
      ctx.lineTo(0, 12 * s);
      ctx.lineTo(3 * s, 4 * s);
      ctx.fill();
      break;
    }
    case 'BOZOLLOK': {
      // Beetle/bug shape
      ctx.beginPath();
      ctx.ellipse(0, 2 * s, 8 * s, 10 * s, 0, 0, Math.PI * 2);
      ctx.fill();
      // Line down the center (wing split)
      ctx.save();
      ctx.globalCompositeOperation = 'destination-out';
      ctx.lineWidth = 1.5 * s;
      ctx.beginPath();
      ctx.moveTo(0, -7 * s);
      ctx.lineTo(0, 12 * s);
      ctx.stroke();
      ctx.restore();
      // Antennae
      ctx.lineWidth = 1.5 * s;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(-2 * s, -7 * s);
      ctx.lineTo(-6 * s, -13 * s);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(2 * s, -7 * s);
      ctx.lineTo(6 * s, -13 * s);
      ctx.stroke();
      break;
    }
    case 'GOURMAND': {
      // Open jaw/mouth
      ctx.beginPath();
      ctx.arc(0, 0, 11 * s, 0.3, Math.PI - 0.3);
      ctx.closePath();
      ctx.fill();
      ctx.beginPath();
      ctx.arc(0, 2 * s, 11 * s, Math.PI + 0.3, -0.3);
      ctx.closePath();
      ctx.fill();
      break;
    }
    case 'BATSCH': {
      // Turtle shell (hexagon)
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const a = (i / 6) * Math.PI * 2 - Math.PI / 2;
        const px = Math.cos(a) * 11 * s;
        const py = Math.sin(a) * 11 * s;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.fill();
      break;
    }
    case 'PALETAP': {
      // Footprint / stomp mark
      ctx.beginPath();
      ctx.ellipse(0, 3 * s, 8 * s, 10 * s, 0, 0, Math.PI * 2);
      ctx.fill();
      // Toes
      for (let i = -1; i <= 1; i++) {
        ctx.beginPath();
        ctx.arc(i * 5 * s, -10 * s, 3 * s, 0, Math.PI * 2);
        ctx.fill();
      }
      break;
    }
    case 'MATADOR': {
      // Bull horns
      ctx.lineWidth = 3 * s;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(-10 * s, -10 * s);
      ctx.quadraticCurveTo(-6 * s, 2 * s, 0, 4 * s);
      ctx.quadraticCurveTo(6 * s, 2 * s, 10 * s, -10 * s);
      ctx.stroke();
      // Nose ring
      ctx.lineWidth = 2 * s;
      ctx.beginPath();
      ctx.arc(0, 8 * s, 4 * s, 0, Math.PI);
      ctx.stroke();
      break;
    }
    case 'KILLA WATT': {
      // Double lightning bolt (like ⚡⚡)
      ctx.beginPath();
      ctx.moveTo(-4 * s, -12 * s);
      ctx.lineTo(-7 * s, 0);
      ctx.lineTo(-3 * s, 0);
      ctx.lineTo(-6 * s, 12 * s);
      ctx.lineTo(0, -1 * s);
      ctx.lineTo(-4 * s, -1 * s);
      ctx.closePath();
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(4 * s, -12 * s);
      ctx.lineTo(1 * s, 0);
      ctx.lineTo(5 * s, 0);
      ctx.lineTo(2 * s, 12 * s);
      ctx.lineTo(8 * s, -1 * s);
      ctx.lineTo(4 * s, -1 * s);
      ctx.closePath();
      ctx.fill();
      break;
    }
    case 'BACKTRACK': {
      // Rewind arrows (◄◄)
      ctx.beginPath();
      ctx.moveTo(2 * s, -10 * s);
      ctx.lineTo(-8 * s, 0);
      ctx.lineTo(2 * s, 10 * s);
      ctx.closePath();
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(10 * s, -10 * s);
      ctx.lineTo(0, 0);
      ctx.lineTo(10 * s, 10 * s);
      ctx.closePath();
      ctx.fill();
      break;
    }
    case 'EXOR': {
      // Skull outline
      ctx.beginPath();
      ctx.arc(0, -2 * s, 10 * s, Math.PI, 0);
      ctx.quadraticCurveTo(10 * s, 8 * s, 5 * s, 12 * s);
      ctx.lineTo(-5 * s, 12 * s);
      ctx.quadraticCurveTo(-10 * s, 8 * s, -10 * s, -2 * s);
      ctx.fill();
      // Eye holes
      ctx.save();
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(-4 * s, -2 * s, 3 * s, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(4 * s, -2 * s, 3 * s, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
      break;
    }
    case 'BUCK': {
      // Star (5-pointed)
      ctx.beginPath();
      for (let i = 0; i < 5; i++) {
        const a = (i / 5) * Math.PI * 2 - Math.PI / 2;
        const ox = Math.cos(a) * 12 * s;
        const oy = Math.sin(a) * 12 * s;
        if (i === 0) ctx.moveTo(ox, oy);
        else ctx.lineTo(ox, oy);
        const ia = ((i + 0.5) / 5) * Math.PI * 2 - Math.PI / 2;
        ctx.lineTo(Math.cos(ia) * 5 * s, Math.sin(ia) * 5 * s);
      }
      ctx.closePath();
      ctx.fill();
      break;
    }
    case 'X-HAUST': {
      // Exhaust pipe with smoke puff
      // Pipe body
      ctx.fillRect(-3 * s, -2 * s, 10 * s, 6 * s);
      // Pipe opening
      ctx.fillRect(7 * s, -4 * s, 3 * s, 10 * s);
      // Smoke puffs
      ctx.beginPath();
      ctx.arc(-6 * s, -4 * s, 4 * s, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(-9 * s, -8 * s, 3 * s, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(-5 * s, -10 * s, 2.5 * s, 0, Math.PI * 2);
      ctx.fill();
      break;
    }
    case 'VORTICE': {
      // Tornado/cyclone spiral
      ctx.lineWidth = 2.5 * s;
      ctx.strokeStyle = color;
      ctx.beginPath();
      // Funnel shape - wider at top, narrow at bottom
      ctx.moveTo(-10 * s, -10 * s);
      ctx.quadraticCurveTo(-8 * s, -4 * s, -3 * s, 2 * s);
      ctx.quadraticCurveTo(-1 * s, 8 * s, 0, 12 * s);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(10 * s, -10 * s);
      ctx.quadraticCurveTo(8 * s, -4 * s, 3 * s, 2 * s);
      ctx.quadraticCurveTo(1 * s, 8 * s, 0, 12 * s);
      ctx.stroke();
      // Horizontal swirl lines
      ctx.beginPath();
      ctx.moveTo(-10 * s, -8 * s);
      ctx.lineTo(10 * s, -8 * s);
      ctx.moveTo(-7 * s, -3 * s);
      ctx.lineTo(7 * s, -3 * s);
      ctx.moveTo(-4 * s, 2 * s);
      ctx.lineTo(4 * s, 2 * s);
      ctx.stroke();
      break;
    }
    case 'BAG': {
      // Punching bag silhouette
      ctx.beginPath();
      ctx.moveTo(-6 * s, -13 * s);
      ctx.lineTo(6 * s, -13 * s);
      ctx.lineTo(6 * s, -10 * s);
      ctx.quadraticCurveTo(9 * s, -5 * s, 9 * s, 3 * s);
      ctx.quadraticCurveTo(9 * s, 12 * s, 0, 13 * s);
      ctx.quadraticCurveTo(-9 * s, 12 * s, -9 * s, 3 * s);
      ctx.quadraticCurveTo(-9 * s, -5 * s, -6 * s, -10 * s);
      ctx.closePath();
      ctx.fill();
      break;
    }
    case 'MANNEQUIN': {
      // Wooden dummy T-shape
      ctx.beginPath();
      ctx.arc(0, -9 * s, 5 * s, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillRect(-2 * s, -4 * s, 4 * s, 14 * s);
      // Arms
      ctx.fillRect(-10 * s, -2 * s, 20 * s, 3 * s);
      break;
    }
    case 'DRONE': {
      // Crosshair / target
      ctx.lineWidth = 2 * s;
      ctx.beginPath();
      ctx.arc(0, 0, 9 * s, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, -13 * s);
      ctx.lineTo(0, -6 * s);
      ctx.moveTo(0, 6 * s);
      ctx.lineTo(0, 13 * s);
      ctx.moveTo(-13 * s, 0);
      ctx.lineTo(-6 * s, 0);
      ctx.moveTo(6 * s, 0);
      ctx.lineTo(13 * s, 0);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(0, 0, 2 * s, 0, Math.PI * 2);
      ctx.fill();
      break;
    }
    default: {
      // Fallback: circle with first letter
      ctx.beginPath();
      ctx.arc(0, 0, 11 * s, 0, Math.PI * 2);
      ctx.fill();
      ctx.save();
      ctx.globalCompositeOperation = 'destination-out';
      ctx.font = `bold ${14 * s}px Arial`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(charName.charAt(0), 0, 1 * s);
      ctx.restore();
      break;
    }
  }
  ctx.restore();
}

function drawBackground() {
  const level = selectedLevel ? selectedLevel.name : 'CLASSIC';
  const t = Date.now();

  switch (level) {
    case 'CLASSIC': {
      // Original arena
      const grad = ctx.createLinearGradient(0, 0, 0, 540);
      grad.addColorStop(0, '#1a1a2e');
      grad.addColorStop(0.6, '#16213e');
      grad.addColorStop(1, '#0f3460');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 960, 540);
      for (let i = 0; i < 5; i++) {
        const lx = 100 + i * 200;
        ctx.fillStyle = `rgba(255,255,200,${0.03 + Math.sin(t * 0.001 + i) * 0.015})`;
        ctx.beginPath();
        ctx.moveTo(lx, 0);
        ctx.lineTo(lx - 80, 400);
        ctx.lineTo(lx + 80, 400);
        ctx.fill();
      }
      ctx.fillStyle = '#2a2a4a';
      ctx.fillRect(0, 385, 960, 155);
      ctx.strokeStyle = '#4a4a7a';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, 387);
      ctx.lineTo(960, 387);
      ctx.stroke();
      ctx.strokeStyle = 'rgba(74,74,122,0.3)';
      ctx.lineWidth = 1;
      for (let i = 0; i < 20; i++) {
        ctx.beginPath();
        ctx.moveTo(i * 50 + (t * 0.01 % 50), 387);
        ctx.lineTo(i * 50 + (t * 0.01 % 50) - 20, 540);
        ctx.stroke();
      }
      break;
    }

    case 'THE TEMPLE': {
      // Ancient shrine background - warm golden sky
      const grad = ctx.createLinearGradient(0, 0, 0, 540);
      grad.addColorStop(0, '#2a1a0a');
      grad.addColorStop(0.3, '#4a3020');
      grad.addColorStop(0.6, '#3a2515');
      grad.addColorStop(1, '#1a1008');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 960, 540);

      // Distant misty mountains
      ctx.fillStyle = 'rgba(60,40,20,0.5)';
      ctx.beginPath();
      ctx.moveTo(0, 280);
      for (let i = 0; i <= 960; i += 40) {
        ctx.lineTo(i, 250 + Math.sin(i * 0.008) * 30 + Math.sin(i * 0.02) * 15);
      }
      ctx.lineTo(960, 400);
      ctx.lineTo(0, 400);
      ctx.fill();

      // Temple pillars in background
      for (let i = 0; i < 6; i++) {
        const px = 80 + i * 170;
        const broken = i === 2 || i === 4;
        const pillarH = broken ? 80 + Math.sin(i * 2.5) * 20 : 160;
        ctx.fillStyle = '#8B7355';
        ctx.fillRect(px - 12, 385 - pillarH, 24, pillarH);
        // Pillar detail lines
        ctx.strokeStyle = 'rgba(139,115,85,0.6)';
        ctx.lineWidth = 1;
        for (let j = 0; j < 3; j++) {
          ctx.beginPath();
          ctx.moveTo(px - 12 + j * 8 + 4, 385 - pillarH);
          ctx.lineTo(px - 12 + j * 8 + 4, 385);
          ctx.stroke();
        }
        // Pillar top (capital)
        if (!broken) {
          ctx.fillStyle = '#9B8365';
          ctx.fillRect(px - 18, 385 - pillarH - 8, 36, 8);
        }
        // Cracks on broken pillars
        if (broken) {
          ctx.strokeStyle = '#5a4030';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(px - 5, 385 - pillarH);
          ctx.lineTo(px + 3, 385 - pillarH + 15);
          ctx.lineTo(px - 2, 385 - pillarH + 25);
          ctx.stroke();
        }
      }

      // Overgrown vines hanging from pillars
      ctx.strokeStyle = '#2a5a1a';
      ctx.lineWidth = 2;
      for (let i = 0; i < 8; i++) {
        const vx = 60 + i * 120 + Math.sin(i * 3) * 30;
        const vy = 220 + Math.sin(i * 1.7) * 20;
        ctx.beginPath();
        ctx.moveTo(vx, vy);
        ctx.quadraticCurveTo(vx + 15, vy + 40 + Math.sin(t * 0.002 + i) * 5, vx + 5, vy + 60);
        ctx.stroke();
        // Small leaves
        ctx.fillStyle = '#3a7a2a';
        ctx.beginPath();
        ctx.ellipse(vx + 5, vy + 60, 4, 2, 0.3, 0, Math.PI * 2);
        ctx.fill();
      }

      // Floating dust/pollen particles
      for (let i = 0; i < 15; i++) {
        const px = (i * 73 + t * 0.02) % 960;
        const py = 100 + Math.sin(t * 0.001 + i * 2) * 80 + i * 15;
        ctx.fillStyle = `rgba(212,165,116,${0.2 + Math.sin(t * 0.003 + i) * 0.15})`;
        ctx.beginPath();
        ctx.arc(px, py, 1.5, 0, Math.PI * 2);
        ctx.fill();
      }

      // Stone floor with moss
      ctx.fillStyle = '#5a4a35';
      ctx.fillRect(0, 385, 960, 155);
      // Stone tiles
      for (let i = 0; i < 12; i++) {
        const tx = i * 80;
        ctx.strokeStyle = 'rgba(90,74,53,0.8)';
        ctx.lineWidth = 1;
        ctx.strokeRect(tx, 385, 80, 155);
        // Moss patches
        if (i % 3 === 0) {
          ctx.fillStyle = 'rgba(40,80,30,0.4)';
          ctx.beginPath();
          ctx.ellipse(tx + 40, 390, 25, 5, 0, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.strokeStyle = '#7a6a55';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, 387);
      ctx.lineTo(960, 387);
      ctx.stroke();
      break;
    }

    case 'THE PEAK': {
      // Snowy mountain summit
      const grad = ctx.createLinearGradient(0, 0, 0, 540);
      grad.addColorStop(0, '#4a6a8a');
      grad.addColorStop(0.3, '#6a8aaa');
      grad.addColorStop(0.6, '#8aaaca');
      grad.addColorStop(1, '#aaccee');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 960, 540);

      // Distant mountain range
      ctx.fillStyle = '#7a8a9a';
      ctx.beginPath();
      ctx.moveTo(0, 300);
      ctx.lineTo(120, 180);
      ctx.lineTo(200, 250);
      ctx.lineTo(320, 140);
      ctx.lineTo(420, 220);
      ctx.lineTo(500, 160);
      ctx.lineTo(600, 230);
      ctx.lineTo(720, 120);
      ctx.lineTo(800, 200);
      ctx.lineTo(880, 150);
      ctx.lineTo(960, 220);
      ctx.lineTo(960, 400);
      ctx.lineTo(0, 400);
      ctx.fill();

      // Snow caps on mountains
      ctx.fillStyle = '#e8f0f8';
      ctx.beginPath();
      ctx.moveTo(300, 160);
      ctx.lineTo(320, 140);
      ctx.lineTo(340, 155);
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(700, 140);
      ctx.lineTo(720, 120);
      ctx.lineTo(740, 135);
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(480, 175);
      ctx.lineTo(500, 160);
      ctx.lineTo(520, 172);
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(860, 165);
      ctx.lineTo(880, 150);
      ctx.lineTo(900, 163);
      ctx.fill();

      // Fog/cloud layer
      for (let i = 0; i < 6; i++) {
        const cx = (i * 180 + t * 0.008) % 1100 - 70;
        const cy = 260 + Math.sin(i * 1.5) * 20;
        ctx.fillStyle = 'rgba(200,215,230,0.3)';
        ctx.beginPath();
        ctx.ellipse(cx, cy, 80, 20, 0, 0, Math.PI * 2);
        ctx.fill();
      }

      // Snowfall
      for (let i = 0; i < 40; i++) {
        const sx = (i * 47 + t * 0.03 + Math.sin(i * 0.5) * 50) % 960;
        const sy = (i * 31 + t * 0.02) % 540;
        const size = 1 + (i % 3);
        ctx.fillStyle = `rgba(255,255,255,${0.3 + (i % 3) * 0.2})`;
        ctx.beginPath();
        ctx.arc(sx, sy, size, 0, Math.PI * 2);
        ctx.fill();
      }

      // Icy ground
      const floorGrad = ctx.createLinearGradient(0, 385, 0, 540);
      floorGrad.addColorStop(0, '#c8d8e8');
      floorGrad.addColorStop(1, '#a0b8d0');
      ctx.fillStyle = floorGrad;
      ctx.fillRect(0, 385, 960, 155);

      // Ice shine streaks
      ctx.strokeStyle = 'rgba(255,255,255,0.3)';
      ctx.lineWidth = 1;
      for (let i = 0; i < 8; i++) {
        ctx.beginPath();
        ctx.moveTo(i * 130 + 20, 390);
        ctx.lineTo(i * 130 + 80, 395);
        ctx.stroke();
      }
      ctx.strokeStyle = '#d0e0f0';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, 387);
      ctx.lineTo(960, 387);
      ctx.stroke();
      break;
    }

    case 'THE DEN': {
      // Burning hellscape
      const grad = ctx.createLinearGradient(0, 0, 0, 540);
      grad.addColorStop(0, '#1a0500');
      grad.addColorStop(0.3, '#3a0a00');
      grad.addColorStop(0.5, '#5a1500');
      grad.addColorStop(1, '#2a0800');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 960, 540);

      // Distant volcano
      ctx.fillStyle = '#2a0800';
      ctx.beginPath();
      ctx.moveTo(650, 380);
      ctx.lineTo(750, 120);
      ctx.lineTo(770, 120);
      ctx.lineTo(870, 380);
      ctx.fill();
      // Volcano rim
      ctx.fillStyle = '#4a1500';
      ctx.beginPath();
      ctx.moveTo(730, 130);
      ctx.lineTo(750, 120);
      ctx.lineTo(770, 120);
      ctx.lineTo(790, 130);
      ctx.lineTo(760, 140);
      ctx.fill();
      // Lava glow from volcano
      ctx.fillStyle = `rgba(255,80,0,${0.15 + Math.sin(t * 0.003) * 0.1})`;
      ctx.beginPath();
      ctx.moveTo(745, 120);
      ctx.lineTo(760, 50 + Math.sin(t * 0.004) * 10);
      ctx.lineTo(775, 120);
      ctx.fill();

      // Lava rivers on ground
      for (let i = 0; i < 4; i++) {
        const lx = 100 + i * 250;
        const glow = 0.4 + Math.sin(t * 0.005 + i * 1.5) * 0.2;
        ctx.strokeStyle = `rgba(255,100,0,${glow})`;
        ctx.lineWidth = 4 + Math.sin(t * 0.003 + i) * 2;
        ctx.beginPath();
        ctx.moveTo(lx, 400);
        ctx.quadraticCurveTo(lx + 30, 440 + Math.sin(t * 0.002 + i) * 10, lx + 60, 500);
        ctx.stroke();
        // Lava glow around rivers
        ctx.strokeStyle = `rgba(255,60,0,${glow * 0.3})`;
        ctx.lineWidth = 12;
        ctx.beginPath();
        ctx.moveTo(lx, 400);
        ctx.quadraticCurveTo(lx + 30, 440 + Math.sin(t * 0.002 + i) * 10, lx + 60, 500);
        ctx.stroke();
      }

      // Fire particles rising
      for (let i = 0; i < 20; i++) {
        const fx = (i * 53 + t * 0.04) % 960;
        const fy = 380 - ((t * 0.05 + i * 37) % 300);
        const alpha = Math.max(0, 1 - ((380 - fy) / 300));
        ctx.fillStyle = `rgba(255,${80 + i * 8},0,${alpha * 0.6})`;
        ctx.beginPath();
        ctx.arc(fx, fy, 2 + Math.sin(t * 0.01 + i) * 1, 0, Math.PI * 2);
        ctx.fill();
      }

      // Rocky/charred ground
      ctx.fillStyle = '#1a0a00';
      ctx.fillRect(0, 385, 960, 155);
      // Lava cracks in ground
      ctx.strokeStyle = `rgba(255,80,0,${0.3 + Math.sin(t * 0.002) * 0.15})`;
      ctx.lineWidth = 2;
      for (let i = 0; i < 10; i++) {
        ctx.beginPath();
        ctx.moveTo(i * 100 + 20, 390);
        ctx.lineTo(i * 100 + 50, 420 + Math.sin(i) * 15);
        ctx.lineTo(i * 100 + 30, 460);
        ctx.stroke();
      }
      ctx.strokeStyle = '#3a1500';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, 387);
      ctx.lineTo(960, 387);
      ctx.stroke();
      break;
    }

    case 'THE VOID': {
      // Space / meteor surface
      ctx.fillStyle = '#050510';
      ctx.fillRect(0, 0, 960, 540);

      // Rushing stars (streaks moving past)
      for (let i = 0; i < 60; i++) {
        const sy = (i * 11.3) % 540;
        const sx = (i * 47 + t * (0.1 + (i % 5) * 0.05)) % 1100 - 70;
        const speed = 0.1 + (i % 5) * 0.05;
        const len = 5 + speed * 40;
        const brightness = 150 + (i % 3) * 50;
        ctx.strokeStyle = `rgba(${brightness},${brightness},${brightness + 50},${0.3 + (i % 3) * 0.2})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(sx, sy);
        ctx.lineTo(sx - len, sy);
        ctx.stroke();
      }

      // Distant nebula glow
      const nebX = 700 + Math.sin(t * 0.0003) * 30;
      const nebY = 150;
      const nebGrad = ctx.createRadialGradient(nebX, nebY, 0, nebX, nebY, 120);
      nebGrad.addColorStop(0, 'rgba(100,50,180,0.15)');
      nebGrad.addColorStop(0.5, 'rgba(60,30,120,0.08)');
      nebGrad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = nebGrad;
      ctx.fillRect(0, 0, 960, 540);

      // Distant planet
      ctx.fillStyle = '#1a2a4a';
      ctx.beginPath();
      ctx.arc(200, 120, 45, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#2a3a5a';
      ctx.beginPath();
      ctx.arc(200, 120, 45, -0.5, 1.5);
      ctx.fill();
      // Planet ring
      ctx.strokeStyle = 'rgba(100,120,160,0.4)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.ellipse(200, 120, 65, 12, 0.3, 0, Math.PI * 2);
      ctx.stroke();

      // Meteor surface (rocky, cratered)
      ctx.fillStyle = '#2a2a30';
      ctx.fillRect(0, 385, 960, 155);
      // Craters
      for (let i = 0; i < 6; i++) {
        const cx = 80 + i * 160;
        const cr = 15 + (i % 3) * 8;
        ctx.fillStyle = '#1a1a22';
        ctx.beginPath();
        ctx.ellipse(cx, 400 + (i % 2) * 30, cr, cr * 0.4, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#3a3a44';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.ellipse(cx, 400 + (i % 2) * 30, cr, cr * 0.4, 0, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.strokeStyle = '#3a3a44';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, 387);
      ctx.lineTo(960, 387);
      ctx.stroke();
      break;
    }


    case 'SNOWY CITY': {
      // NYC skyline in winter snow
      const grad = ctx.createLinearGradient(0, 0, 0, 385);
      grad.addColorStop(0, '#1a2a3a');
      grad.addColorStop(0.5, '#2a3a4a');
      grad.addColorStop(1, '#3a4a5a');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 960, 385);

      // --- Back layer: distant skyline fill ---
      ctx.fillStyle = '#1a2434';
      const backBldgs = [[0,280,35,105],[38,260,30,125],[72,275,28,110],[140,250,32,135],[175,270,26,115],[370,255,28,130],[520,265,24,120],[550,250,30,135],[760,275,26,110],[845,260,28,125],[920,270,40,115]];
      for (const [bx,by,bw,bh] of backBldgs) {
        ctx.fillRect(bx, by, bw, bh);
      }

      // --- Brooklyn Bridge (left, spans x=30 to x=200) ---
      ctx.fillStyle = '#1e2838';
      ctx.fillRect(30, 330, 180, 8);
      // Left tower - gothic arches
      ctx.fillStyle = '#2a3444';
      ctx.fillRect(65, 245, 14, 93);
      ctx.fillRect(81, 245, 14, 93);
      ctx.fillRect(62, 240, 36, 8);
      // Right tower
      ctx.fillRect(150, 245, 14, 93);
      ctx.fillRect(166, 245, 14, 93);
      ctx.fillRect(147, 240, 36, 8);
      // Main cable
      ctx.strokeStyle = '#3a4a5a';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(30, 270);
      ctx.quadraticCurveTo(80, 248, 80, 248);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(80, 248);
      ctx.quadraticCurveTo(120, 310, 165, 248);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(165, 248);
      ctx.quadraticCurveTo(200, 280, 210, 290);
      ctx.stroke();
      // Suspender cables
      ctx.lineWidth = 1;
      for (let i = 0; i < 7; i++) {
        const cx = 90 + i * 12;
        const cableT = (cx - 80) / (165 - 80);
        const cableY = 248 + Math.sin(cableT * Math.PI) * 60;
        ctx.beginPath();
        ctx.moveTo(cx, cableY);
        ctx.lineTo(cx, 330);
        ctx.stroke();
      }

      // --- Empire State Building ---
      ctx.fillStyle = '#222838';
      ctx.fillRect(290, 155, 44, 230);
      ctx.fillRect(296, 140, 32, 15);
      ctx.fillRect(302, 125, 20, 15);
      ctx.fillRect(307, 105, 10, 20);
      ctx.strokeStyle = '#555';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(312, 105);
      ctx.lineTo(312, 65);
      ctx.stroke();
      for (let row = 0; row < 11; row++) {
        for (let col = 0; col < 5; col++) {
          const wx = 294 + col * 8;
          const wy = 165 + row * 20;
          const lit = Math.sin(row * 3.7 + col * 7.1 + t * 0.001) > 0.2;
          ctx.fillStyle = lit ? `rgba(255,220,130,${0.4 + Math.sin(t * 0.002 + row + col) * 0.2})` : 'rgba(40,50,60,0.5)';
          ctx.fillRect(wx, wy, 5, 12);
        }
      }

      // --- Chrysler Building ---
      ctx.fillStyle = '#1e2838';
      ctx.fillRect(395, 175, 28, 210);
      ctx.beginPath();
      ctx.moveTo(393, 175);
      ctx.lineTo(409, 140);
      ctx.lineTo(425, 175);
      ctx.fill();
      ctx.strokeStyle = '#555';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(409, 140);
      ctx.lineTo(409, 115);
      ctx.stroke();
      for (let row = 0; row < 10; row++) {
        for (let col = 0; col < 3; col++) {
          if (Math.sin(row * 2 + col * 5 + t * 0.001) > 0.3) {
            ctx.fillStyle = `rgba(255,220,130,${0.3 + Math.sin(t * 0.002 + row) * 0.15})`;
            ctx.fillRect(399 + col * 8, 185 + row * 20, 4, 12);
          }
        }
      }

      // --- One World Trade Center ---
      ctx.fillStyle = '#1e2838';
      ctx.beginPath();
      ctx.moveTo(480, 385);
      ctx.lineTo(486, 110);
      ctx.lineTo(514, 110);
      ctx.lineTo(520, 385);
      ctx.fill();
      ctx.strokeStyle = 'rgba(100,140,180,0.2)';
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(500, 110); ctx.lineTo(500, 385); ctx.stroke();
      ctx.strokeStyle = '#555';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(500, 110);
      ctx.lineTo(500, 60);
      ctx.stroke();
      for (let row = 0; row < 13; row++) {
        for (let col = 0; col < 3; col++) {
          if (Math.sin(row * 4 + col * 3 + t * 0.001) > 0.25) {
            ctx.fillStyle = `rgba(180,210,240,${0.3 + Math.sin(t * 0.002 + row) * 0.1})`;
            ctx.fillRect(489 + col * 10, 120 + row * 20, 5, 12);
          }
        }
      }

      // --- More midtown buildings ---
      const midBldgs = [[230,230,25,155],[260,260,22,125],[340,240,20,145],[430,235,22,150],[570,240,26,145],[600,270,22,115],[635,250,24,135]];
      for (const [bx,by,bw,bh] of midBldgs) {
        ctx.fillStyle = '#1a2434';
        ctx.fillRect(bx, by, bw, bh);
        for (let row = 0; row < Math.floor(bh / 18); row++) {
          for (let col = 0; col < Math.floor(bw / 8); col++) {
            if (Math.sin(bx + row * 5 + col * 3 + t * 0.001) > 0.3) {
              ctx.fillStyle = `rgba(255,220,130,${0.3 + Math.sin(t * 0.002 + row) * 0.15})`;
              ctx.fillRect(bx + 3 + col * 8, by + 4 + row * 18, 4, 10);
            }
          }
        }
      }

      // --- Statue of Liberty (far right, on island) ---
      ctx.fillStyle = '#3a5a5a';
      ctx.fillRect(880, 320, 24, 65);
      ctx.fillRect(875, 315, 34, 8);
      ctx.beginPath();
      ctx.moveTo(886, 320);
      ctx.lineTo(889, 280);
      ctx.lineTo(895, 280);
      ctx.lineTo(898, 320);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(892, 274, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#3a5a5a';
      ctx.lineWidth = 1.5;
      for (let s = 0; s < 5; s++) {
        const sa = -Math.PI * 0.8 + (s / 4) * Math.PI * 0.6;
        ctx.beginPath();
        ctx.moveTo(892 + Math.cos(sa) * 6, 274 + Math.sin(sa) * 6);
        ctx.lineTo(892 + Math.cos(sa) * 12, 274 + Math.sin(sa) * 12);
        ctx.stroke();
      }
      ctx.strokeStyle = '#3a5a5a';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(896, 285);
      ctx.lineTo(902, 262);
      ctx.stroke();
      ctx.fillStyle = `rgba(255,200,80,${0.6 + Math.sin(t * 0.005) * 0.2})`;
      ctx.beginPath();
      ctx.arc(903, 257, 5, 0, Math.PI * 2);
      ctx.fill();

      // --- Manhattan Bridge (right side) ---
      ctx.fillStyle = '#1e2838';
      ctx.fillRect(680, 330, 200, 8);
      ctx.fillRect(710, 265, 10, 73);
      ctx.fillRect(720, 265, 10, 73);
      ctx.fillRect(830, 265, 10, 73);
      ctx.fillRect(840, 265, 10, 73);
      ctx.fillRect(707, 260, 26, 8);
      ctx.fillRect(827, 260, 26, 8);
      ctx.strokeStyle = '#3a4a5a';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(680, 280);
      ctx.quadraticCurveTo(720, 265, 720, 265);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(720, 265);
      ctx.quadraticCurveTo(780, 315, 840, 265);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(840, 265);
      ctx.quadraticCurveTo(860, 275, 880, 285);
      ctx.stroke();
      ctx.lineWidth = 1;
      for (let i = 0; i < 9; i++) {
        const cx = 730 + i * 12;
        const cableT2 = (cx - 720) / (840 - 720);
        const cableY2 = 265 + Math.sin(cableT2 * Math.PI) * 48;
        ctx.beginPath();
        ctx.moveTo(cx, cableY2);
        ctx.lineTo(cx, 330);
        ctx.stroke();
      }

      // --- Snowfall ---
      for (let i = 0; i < 50; i++) {
        const sx = (i * 41 + t * 0.025 + Math.sin(i * 0.8 + t * 0.001) * 40) % 960;
        const sy = (i * 29 + t * 0.018) % 540;
        const size = 1 + (i % 3);
        ctx.fillStyle = `rgba(255,255,255,${0.3 + (i % 3) * 0.15})`;
        ctx.beginPath();
        ctx.arc(sx, sy, size, 0, Math.PI * 2);
        ctx.fill();
      }

      // --- Snowy ground ---
      ctx.fillStyle = '#c8d0d8';
      ctx.fillRect(0, 385, 960, 155);
      ctx.fillStyle = 'rgba(255,255,255,0.3)';
      for (let i = 0; i < 15; i++) {
        ctx.beginPath();
        ctx.ellipse(i * 70 + 20, 392, 30, 4, 0, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.strokeStyle = '#d8e0e8';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, 387);
      ctx.lineTo(960, 387);
      ctx.stroke();
      break;
    }

    case 'FOGGY CITY': {
      // SF skyline in fog
      const grad = ctx.createLinearGradient(0, 0, 0, 385);
      grad.addColorStop(0, '#8a8a8a');
      grad.addColorStop(0.4, '#9a9090');
      grad.addColorStop(1, '#6a6060');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 960, 385);

      // --- Background hills ---
      ctx.fillStyle = '#5a5555';
      ctx.beginPath();
      ctx.moveTo(0, 340);
      ctx.quadraticCurveTo(150, 280, 300, 320);
      ctx.quadraticCurveTo(450, 350, 600, 310);
      ctx.quadraticCurveTo(750, 280, 960, 330);
      ctx.lineTo(960, 385);
      ctx.lineTo(0, 385);
      ctx.fill();

      // --- Background buildings ---
      const sfBack = [[440,210,28,175],[472,240,24,145],[500,225,26,160],[530,255,20,130],[620,230,24,155],[650,260,20,125],[760,245,28,140],[792,270,22,115],[820,240,26,145],[850,265,20,120],[880,230,30,155],[915,260,25,125]];
      for (const [bx,by,bw,bh] of sfBack) {
        ctx.fillStyle = '#4a4a55';
        ctx.fillRect(bx, by, bw, bh);
        for (let row = 0; row < Math.floor(bh / 18); row++) {
          for (let col = 0; col < Math.floor(bw / 8); col++) {
            if (Math.sin(bx + row * 4 + col * 6) > 0.1) {
              ctx.fillStyle = `rgba(200,180,150,${0.2 + Math.sin(t * 0.002 + row) * 0.1})`;
              ctx.fillRect(bx + 3 + col * 8, by + 4 + row * 18, 4, 12);
            }
          }
        }
      }

      // --- Salesforce Tower (tallest, rounded top) ---
      ctx.fillStyle = '#5a5a68';
      ctx.beginPath();
      ctx.moveTo(555, 385);
      ctx.lineTo(562, 120);
      ctx.lineTo(582, 120);
      ctx.lineTo(589, 385);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(572, 120, 15, Math.PI, 0);
      ctx.fill();
      ctx.strokeStyle = 'rgba(120,120,140,0.4)';
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(572, 105); ctx.lineTo(572, 385); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(565, 120); ctx.lineTo(558, 385); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(579, 120); ctx.lineTo(586, 385); ctx.stroke();

      // --- Transamerica Pyramid ---
      ctx.fillStyle = '#6a6a78';
      ctx.beginPath();
      ctx.moveTo(690, 385);
      ctx.lineTo(710, 130);
      ctx.lineTo(730, 385);
      ctx.fill();
      ctx.strokeStyle = '#888';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(710, 130);
      ctx.lineTo(710, 100);
      ctx.stroke();
      // Wing structures
      ctx.fillStyle = '#5a5a68';
      ctx.beginPath();
      ctx.moveTo(690, 385);
      ctx.lineTo(690, 280);
      ctx.lineTo(683, 385);
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(730, 385);
      ctx.lineTo(730, 280);
      ctx.lineTo(737, 385);
      ctx.fill();

      // --- Golden Gate Bridge (left, spans x=20 to x=400) ---
      ctx.fillStyle = '#B5470F';
      ctx.fillRect(20, 340, 380, 8);
      // Left tower
      ctx.fillStyle = '#C85A17';
      ctx.fillRect(95, 165, 8, 183);
      ctx.fillRect(110, 165, 8, 183);
      ctx.fillRect(93, 165, 27, 6);
      ctx.fillRect(93, 220, 27, 4);
      ctx.fillRect(93, 270, 27, 4);
      ctx.fillRect(93, 320, 27, 4);
      // Right tower
      ctx.fillRect(285, 165, 8, 183);
      ctx.fillRect(300, 165, 8, 183);
      ctx.fillRect(283, 165, 27, 6);
      ctx.fillRect(283, 220, 27, 4);
      ctx.fillRect(283, 270, 27, 4);
      ctx.fillRect(283, 320, 27, 4);
      // Main cables
      ctx.strokeStyle = '#C85A17';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(20, 240);
      ctx.quadraticCurveTo(55, 200, 103, 170);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(103, 170);
      ctx.quadraticCurveTo(200, 300, 296, 170);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(296, 170);
      ctx.quadraticCurveTo(350, 220, 400, 260);
      ctx.stroke();
      // Vertical suspender cables
      ctx.lineWidth = 1;
      for (let i = 1; i <= 14; i++) {
        const cx = 103 + (i / 15) * (296 - 103);
        const cableT = i / 15;
        const cableY = 170 + Math.sin(cableT * Math.PI) * 130;
        ctx.beginPath();
        ctx.moveTo(cx, cableY);
        ctx.lineTo(cx, 340);
        ctx.stroke();
      }

      // --- Fog layers ---
      for (let layer = 0; layer < 4; layer++) {
        const fy = 170 + layer * 55;
        const fogAlpha = 0.12 + layer * 0.04;
        for (let i = 0; i < 8; i++) {
          const fx = (i * 140 + t * (0.005 + layer * 0.003) * (layer % 2 === 0 ? 1 : -1)) % 1200 - 120;
          ctx.fillStyle = `rgba(180,180,180,${fogAlpha})`;
          ctx.beginPath();
          ctx.ellipse(fx, fy, 110 + layer * 20, 28 + layer * 5, 0, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // --- Concrete ground ---
      ctx.fillStyle = '#5a5552';
      ctx.fillRect(0, 385, 960, 155);
      ctx.strokeStyle = '#6a6562';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, 387);
      ctx.lineTo(960, 387);
      ctx.stroke();
      break;
    }

    case 'RAINY CITY': {
      // Seattle skyline in rain
      const grad = ctx.createLinearGradient(0, 0, 0, 385);
      grad.addColorStop(0, '#2a3040');
      grad.addColorStop(0.5, '#3a4555');
      grad.addColorStop(1, '#354050');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 960, 385);

      // --- Mount Rainier ---
      ctx.fillStyle = '#3a4555';
      ctx.beginPath();
      ctx.moveTo(550, 380);
      ctx.quadraticCurveTo(620, 200, 720, 100);
      ctx.quadraticCurveTo(820, 200, 900, 380);
      ctx.fill();
      ctx.fillStyle = '#8a9aaa';
      ctx.beginPath();
      ctx.moveTo(670, 180);
      ctx.quadraticCurveTo(695, 120, 720, 100);
      ctx.quadraticCurveTo(745, 120, 770, 175);
      ctx.quadraticCurveTo(750, 165, 740, 150);
      ctx.quadraticCurveTo(720, 130, 700, 150);
      ctx.quadraticCurveTo(685, 165, 670, 180);
      ctx.fill();

      // --- Background buildings ---
      const seaBldgs = [[280,245,26,140],[310,265,22,120],[340,235,28,150],[380,255,22,130],[420,240,24,145],[460,260,20,125],[500,245,26,140],[540,270,20,115],[580,250,24,135],[620,265,20,120],[660,255,22,130],[750,240,28,145],[785,265,22,120],[815,250,24,135]];
      for (const [bx,by,bw,bh] of seaBldgs) {
        ctx.fillStyle = '#2a3545';
        ctx.fillRect(bx, by, bw, bh);
        for (let row = 0; row < Math.floor(bh / 16); row++) {
          for (let col = 0; col < Math.floor(bw / 8); col++) {
            if (Math.sin(bx + row * 3 + col * 5) > 0.2) {
              ctx.fillStyle = `rgba(180,200,220,${0.15 + Math.sin(t * 0.002 + row) * 0.1})`;
              ctx.fillRect(bx + 3 + col * 8, by + 3 + row * 16, 4, 10);
            }
          }
        }
      }

      // --- Space Needle ---
      const snX = 160;
      ctx.fillStyle = '#5a6575';
      // Tripod legs
      ctx.beginPath();
      ctx.moveTo(snX - 35, 385);
      ctx.lineTo(snX - 3, 270);
      ctx.lineTo(snX + 3, 270);
      ctx.lineTo(snX - 25, 385);
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(snX + 35, 385);
      ctx.lineTo(snX + 3, 270);
      ctx.lineTo(snX - 3, 270);
      ctx.lineTo(snX + 25, 385);
      ctx.fill();
      // Center shaft
      ctx.fillRect(snX - 3, 175, 6, 95);
      // Observation deck
      ctx.fillStyle = '#6a7585';
      ctx.beginPath();
      ctx.moveTo(snX - 45, 180);
      ctx.lineTo(snX - 40, 172);
      ctx.lineTo(snX + 40, 172);
      ctx.lineTo(snX + 45, 180);
      ctx.lineTo(snX + 35, 185);
      ctx.lineTo(snX - 35, 185);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = `rgba(180,200,220,${0.3 + Math.sin(t * 0.002) * 0.1})`;
      for (let w = 0; w < 6; w++) {
        ctx.fillRect(snX - 32 + w * 11, 174, 6, 6);
      }
      // Roof
      ctx.fillStyle = '#5a6575';
      ctx.beginPath();
      ctx.moveTo(snX - 38, 172);
      ctx.lineTo(snX, 160);
      ctx.lineTo(snX + 38, 172);
      ctx.fill();
      // Antenna
      ctx.strokeStyle = '#7a8a9a';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(snX, 160);
      ctx.lineTo(snX, 120);
      ctx.stroke();

      // --- Smith Tower ---
      ctx.fillStyle = '#3a4858';
      ctx.fillRect(85, 220, 24, 165);
      ctx.beginPath();
      ctx.moveTo(83, 220);
      ctx.lineTo(97, 185);
      ctx.lineTo(111, 220);
      ctx.fill();
      for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 2; col++) {
          if (Math.sin(row * 3 + col * 7) > 0) {
            ctx.fillStyle = `rgba(180,200,220,${0.15 + Math.sin(t * 0.002 + row) * 0.1})`;
            ctx.fillRect(89 + col * 10, 225 + row * 19, 5, 12);
          }
        }
      }

      // --- Columbia Center ---
      ctx.fillStyle = '#2a3545';
      ctx.fillRect(220, 170, 32, 215);
      ctx.fillRect(224, 160, 24, 10);
      ctx.fillRect(228, 152, 16, 8);
      for (let row = 0; row < 12; row++) {
        for (let col = 0; col < 3; col++) {
          ctx.fillStyle = `rgba(140,170,200,${0.12 + Math.sin(t * 0.002 + row) * 0.08})`;
          ctx.fillRect(224 + col * 9, 175 + row * 17, 5, 10);
        }
      }

      // --- Rain ---
      ctx.strokeStyle = 'rgba(150,170,200,0.3)';
      ctx.lineWidth = 1;
      for (let i = 0; i < 80; i++) {
        const rx = (i * 37 + t * 0.08) % 960;
        const ry = (i * 23 + t * 0.15) % 600 - 60;
        ctx.beginPath();
        ctx.moveTo(rx, ry);
        ctx.lineTo(rx - 2, ry + 15);
        ctx.stroke();
      }

      // --- Wet ground ---
      ctx.fillStyle = '#2a3040';
      ctx.fillRect(0, 385, 960, 155);
      for (let i = 0; i < 6; i++) {
        const px = 80 + i * 160;
        ctx.fillStyle = `rgba(80,100,130,${0.25 + Math.sin(t * 0.003 + i) * 0.1})`;
        ctx.beginPath();
        ctx.ellipse(px, 415 + (i % 3) * 20, 45, 5, 0, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.strokeStyle = '#3a4555';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, 387);
      ctx.lineTo(960, 387);
      ctx.stroke();
      break;
    }

    case 'GLOWING CITY': {
      // Las Vegas at night
      ctx.fillStyle = '#0a0515';
      ctx.fillRect(0, 0, 960, 540);

      // Night sky with stars
      for (let i = 0; i < 30; i++) {
        ctx.fillStyle = `rgba(255,255,255,${0.2 + Math.sin(t * 0.003 + i * 2) * 0.15})`;
        ctx.beginPath();
        ctx.arc((i * 67) % 960, (i * 31) % 180, 1, 0, Math.PI * 2);
        ctx.fill();
      }

      // --- Desert mountains ---
      ctx.fillStyle = '#15101a';
      ctx.beginPath();
      ctx.moveTo(0, 350);
      ctx.lineTo(100, 300);
      ctx.lineTo(250, 330);
      ctx.lineTo(400, 290);
      ctx.lineTo(550, 320);
      ctx.lineTo(700, 280);
      ctx.lineTo(850, 310);
      ctx.lineTo(960, 290);
      ctx.lineTo(960, 385);
      ctx.lineTo(0, 385);
      ctx.fill();

      // --- Strip buildings (back layer) ---
      const vegasBldgs = [[50,220,30,165],[85,245,25,140],[270,215,32,170],[305,245,25,140],[480,230,28,155],[512,255,22,130],[750,215,32,170],[785,245,25,140],[850,225,30,160],[885,250,28,135],[920,240,30,145]];
      for (const [bx,by,bw,bh] of vegasBldgs) {
        ctx.fillStyle = '#1a1520';
        ctx.fillRect(bx, by, bw, bh);
        const neonHue = (bx * 3 + t * 0.02) % 360;
        ctx.strokeStyle = `hsla(${neonHue}, 100%, 60%, 0.4)`;
        ctx.lineWidth = 1;
        ctx.strokeRect(bx, by, bw, bh);
        for (let row = 0; row < Math.floor(bh / 14); row++) {
          for (let col = 0; col < Math.floor(bw / 8); col++) {
            const hue2 = (bx + row * 20 + col * 40 + t * 0.05) % 360;
            ctx.fillStyle = `hsla(${hue2}, 80%, 60%, 0.35)`;
            ctx.fillRect(bx + 3 + col * 8, by + 3 + row * 14, 4, 8);
          }
        }
      }

      // --- Luxor Pyramid ---
      ctx.fillStyle = '#1a1810';
      ctx.beginPath();
      ctx.moveTo(120, 385);
      ctx.lineTo(175, 200);
      ctx.lineTo(230, 385);
      ctx.fill();
      ctx.strokeStyle = 'rgba(40,35,20,0.5)';
      ctx.lineWidth = 1;
      for (let i = 1; i < 4; i++) {
        const py = 200 + i * 46;
        const w = (py - 200) / (385 - 200) * 55;
        ctx.beginPath();
        ctx.moveTo(175 - w, py);
        ctx.lineTo(175 + w, py);
        ctx.stroke();
      }
      // Sky beam
      ctx.fillStyle = `rgba(255,255,200,${0.06 + Math.sin(t * 0.003) * 0.02})`;
      ctx.beginPath();
      ctx.moveTo(172, 200);
      ctx.lineTo(165, 0);
      ctx.lineTo(185, 0);
      ctx.lineTo(178, 200);
      ctx.fill();
      // Sphinx
      ctx.fillStyle = '#1a1810';
      ctx.beginPath();
      ctx.ellipse(165, 378, 18, 8, 0, 0, Math.PI * 2);
      ctx.fill();

      // --- High Roller Ferris Wheel ---
      const wheelX = 380, wheelY = 250, wheelR = 65;
      ctx.fillStyle = '#333';
      ctx.beginPath();
      ctx.moveTo(wheelX - 8, 385);
      ctx.lineTo(wheelX - 3, wheelY + wheelR);
      ctx.lineTo(wheelX + 3, wheelY + wheelR);
      ctx.lineTo(wheelX + 8, 385);
      ctx.fill();
      ctx.strokeStyle = 'rgba(170,170,255,0.6)';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(wheelX, wheelY, wheelR, 0, Math.PI * 2);
      ctx.stroke();
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(wheelX, wheelY, wheelR - 6, 0, Math.PI * 2);
      ctx.stroke();
      for (let i = 0; i < 28; i++) {
        const a = (i / 28) * Math.PI * 2 + t * 0.0005;
        ctx.strokeStyle = 'rgba(170,170,255,0.3)';
        ctx.beginPath();
        ctx.moveTo(wheelX, wheelY);
        ctx.lineTo(wheelX + Math.cos(a) * wheelR, wheelY + Math.sin(a) * wheelR);
        ctx.stroke();
        if (i % 2 === 0) {
          ctx.fillStyle = `rgba(220,220,255,${0.5 + Math.sin(t * 0.003 + i) * 0.2})`;
          ctx.beginPath();
          ctx.arc(wheelX + Math.cos(a) * (wheelR - 3), wheelY + Math.sin(a) * (wheelR - 3), 4, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.fillStyle = '#555';
      ctx.beginPath();
      ctx.arc(wheelX, wheelY, 5, 0, Math.PI * 2);
      ctx.fill();

      // --- MSG Sphere (keeping original LED pattern) ---
      ctx.fillStyle = '#1a1a2a';
      ctx.beginPath();
      ctx.arc(650, 280, 60, 0, Math.PI * 2);
      ctx.fill();
      for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 12; col++) {
          const a = (col / 12) * Math.PI * 2;
          const r = 55 - row * 2;
          const px = 650 + Math.cos(a + t * 0.002) * r * Math.cos((row / 8 - 0.5) * Math.PI);
          const py = 280 + Math.sin((row / 8 - 0.5) * Math.PI) * 55;
          const hue = (col * 30 + row * 20 + t * 0.1) % 360;
          ctx.fillStyle = `hsla(${hue}, 100%, 60%, 0.7)`;
          ctx.beginPath();
          ctx.arc(px, py, 2, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // --- Neon glow on ground ---
      for (let i = 0; i < 8; i++) {
        const nx = 60 + i * 120;
        const hue = (i * 45 + t * 0.04) % 360;
        ctx.fillStyle = `hsla(${hue}, 100%, 55%, ${0.12 + Math.sin(t * 0.005 + i) * 0.06})`;
        ctx.beginPath();
        ctx.ellipse(nx, 375, 35, 12, 0, 0, Math.PI * 2);
        ctx.fill();
      }

      // --- Lit strip ground ---
      const floorGrad2 = ctx.createLinearGradient(0, 385, 0, 540);
      floorGrad2.addColorStop(0, '#1a1520');
      floorGrad2.addColorStop(1, '#100a15');
      ctx.fillStyle = floorGrad2;
      ctx.fillRect(0, 385, 960, 155);
      for (let i = 0; i < 10; i++) {
        const hue = (i * 36 + t * 0.03) % 360;
        ctx.fillStyle = `hsla(${hue}, 80%, 50%, 0.08)`;
        ctx.fillRect(i * 96, 385, 96, 155);
      }
      ctx.strokeStyle = '#2a2030';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, 387);
      ctx.lineTo(960, 387);
      ctx.stroke();
      break;
    }

    case 'SUNNY CITY': {
      // LA skyline under golden sun
      const grad = ctx.createLinearGradient(0, 0, 0, 385);
      grad.addColorStop(0, '#1a6aaa');
      grad.addColorStop(0.3, '#3a8acc');
      grad.addColorStop(0.6, '#5aaaee');
      grad.addColorStop(1, '#8accff');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 960, 385);

      // --- Sun ---
      const sunGrad = ctx.createRadialGradient(820, 70, 0, 820, 70, 90);
      sunGrad.addColorStop(0, 'rgba(255,245,200,1)');
      sunGrad.addColorStop(0.25, 'rgba(255,230,140,0.7)');
      sunGrad.addColorStop(0.6, 'rgba(255,200,80,0.2)');
      sunGrad.addColorStop(1, 'rgba(255,180,50,0)');
      ctx.fillStyle = sunGrad;
      ctx.fillRect(730, 0, 180, 180);
      ctx.fillStyle = '#fffae0';
      ctx.beginPath();
      ctx.arc(820, 70, 28, 0, Math.PI * 2);
      ctx.fill();

      // --- Rolling hills with Hollywood sign ---
      ctx.fillStyle = '#6a9a55';
      ctx.beginPath();
      ctx.moveTo(0, 340);
      ctx.quadraticCurveTo(80, 295, 180, 310);
      ctx.quadraticCurveTo(280, 280, 380, 305);
      ctx.quadraticCurveTo(440, 320, 500, 340);
      ctx.lineTo(500, 385);
      ctx.lineTo(0, 385);
      ctx.fill();
      ctx.fillStyle = '#5a8a4a';
      ctx.beginPath();
      ctx.moveTo(0, 355);
      ctx.quadraticCurveTo(100, 320, 200, 335);
      ctx.quadraticCurveTo(300, 350, 400, 345);
      ctx.quadraticCurveTo(480, 340, 520, 360);
      ctx.lineTo(520, 385);
      ctx.lineTo(0, 385);
      ctx.fill();
      ctx.font = 'bold 14px Arial';
      ctx.textAlign = 'center';
      ctx.fillStyle = '#e8e8e8';
      ctx.fillText('H O L L Y W O O D', 260, 295);

      // --- Downtown LA skyline (right side) ---
      ctx.fillStyle = '#4a6a8a';
      ctx.fillRect(700, 160, 30, 225);
      ctx.fillStyle = '#5a7a9a';
      ctx.beginPath();
      ctx.moveTo(700, 160);
      ctx.lineTo(715, 140);
      ctx.lineTo(730, 160);
      ctx.fill();
      ctx.fillStyle = '#3a5a7a';
      ctx.fillRect(745, 175, 26, 210);
      ctx.strokeStyle = '#6a8aaa';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(758, 175);
      ctx.lineTo(758, 135);
      ctx.stroke();
      const laBldgs = [[650,250,28,135],[680,270,18,115],[775,230,24,155],[802,260,20,125],[825,240,26,145],[855,265,22,120],[880,250,28,135],[912,270,25,115],[940,255,20,130]];
      for (const [bx,by,bw,bh] of laBldgs) {
        ctx.fillStyle = '#3a5a7a';
        ctx.fillRect(bx, by, bw, bh);
        for (let row = 0; row < Math.floor(bh / 16); row++) {
          for (let col = 0; col < Math.floor(bw / 9); col++) {
            ctx.fillStyle = 'rgba(200,230,255,0.25)';
            ctx.fillRect(bx + 3 + col * 9, by + 4 + row * 16, 5, 10);
          }
        }
      }

      // --- Griffith Observatory ---
      const goX = 420;
      ctx.fillStyle = '#6a9a55';
      ctx.beginPath();
      ctx.moveTo(goX - 80, 385);
      ctx.quadraticCurveTo(goX - 40, 290, goX, 280);
      ctx.quadraticCurveTo(goX + 40, 290, goX + 80, 385);
      ctx.fill();
      ctx.fillStyle = '#d8d0c0';
      ctx.fillRect(goX - 30, 305, 60, 18);
      ctx.fillStyle = '#c8c0b0';
      ctx.beginPath();
      ctx.arc(goX, 305, 14, Math.PI, 0);
      ctx.fill();
      ctx.fillRect(goX - 42, 310, 14, 13);
      ctx.fillRect(goX + 28, 310, 14, 13);
      ctx.beginPath();
      ctx.arc(goX - 35, 310, 7, Math.PI, 0);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(goX + 35, 310, 7, Math.PI, 0);
      ctx.fill();

      // --- Palm trees ---
      const palmPositions = [[60, 155], [190, 145], [550, 150], [920, 140]];
      for (let i = 0; i < palmPositions.length; i++) {
        const [px, trunkH] = palmPositions[i];
        const lean = Math.sin(i * 2.3) * 12;
        const topX = px + lean;
        const topY = 385 - trunkH;
        ctx.strokeStyle = '#8B6914';
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(px, 385);
        ctx.quadraticCurveTo(px + lean * 0.5, 385 - trunkH * 0.5, topX, topY);
        ctx.stroke();
        ctx.strokeStyle = '#7a5a10';
        ctx.lineWidth = 1;
        for (let s = 1; s < 6; s++) {
          const segT = s / 6;
          const segX = px + lean * segT;
          const segY = 385 - trunkH * segT;
          ctx.beginPath();
          ctx.moveTo(segX - 3, segY);
          ctx.lineTo(segX + 3, segY);
          ctx.stroke();
        }
        const frondAngles = [-2.2, -1.6, -1.0, -0.4, 0.2, 0.8, 1.4, 2.0];
        for (let f = 0; f < frondAngles.length; f++) {
          const fa = frondAngles[f];
          const fLen = 32 + Math.sin(f * 2 + t * 0.002) * 3;
          const endX = topX + Math.cos(fa) * fLen;
          const endY = topY + Math.abs(Math.sin(fa)) * fLen * 0.4 + fLen * 0.3;
          ctx.strokeStyle = '#2a7a2a';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(topX, topY);
          ctx.quadraticCurveTo(
            topX + Math.cos(fa) * fLen * 0.5,
            topY - 5 + Math.abs(Math.sin(fa)) * fLen * 0.1,
            endX, endY
          );
          ctx.stroke();
        }
      }

      // --- Sandy ground ---
      ctx.fillStyle = '#c8b898';
      ctx.fillRect(0, 385, 960, 155);
      ctx.strokeStyle = '#d8c8a8';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, 387);
      ctx.lineTo(960, 387);
      ctx.stroke();
      break;
    }

    default: {
      // Fallback to classic
      const grad = ctx.createLinearGradient(0, 0, 0, 540);
      grad.addColorStop(0, '#1a1a2e');
      grad.addColorStop(0.6, '#16213e');
      grad.addColorStop(1, '#0f3460');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 960, 540);
      ctx.fillStyle = '#2a2a4a';
      ctx.fillRect(0, 385, 960, 155);
      ctx.strokeStyle = '#4a4a7a';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, 387);
      ctx.lineTo(960, 387);
      ctx.stroke();
      break;
    }
  }
}

function drawHUD() {
  const barWidth = 350;
  const barHeight = 24;
  const barY = 25;

  // Player health bar (left)
  ctx.fillStyle = '#333';
  ctx.fillRect(30, barY, barWidth, barHeight);
  const pHealthWidth = (player.health / player.maxHealth) * barWidth;
  const pHealthColor = player.health > 50 ? '#2ecc71' : player.health > 25 ? '#f39c12' : '#e74c3c';
  ctx.fillStyle = pHealthColor;
  ctx.fillRect(30, barY, pHealthWidth, barHeight);
  // Duplaire clone sections on player health bar
  if (player.char.isDuplaire && player.duplaireClones.length > 0) {
    const activeClones = player.duplaireClones.filter(c => c.active || c.activationTimer > 0);
    const totalBodies = 1 + activeClones.length;
    const sectionWidth = barWidth / totalBodies;
    // Redraw with per-section fills
    ctx.fillStyle = '#333';
    ctx.fillRect(30, barY, barWidth, barHeight);
    // Original's section
    const origSectionMax = player.maxHealth / totalBodies;
    const origFill = Math.min(1, player.duplaireOrigHealth / origSectionMax);
    const origColor = player.duplaireOrigHealth > origSectionMax * 0.5 ? '#2ecc71' : player.duplaireOrigHealth > origSectionMax * 0.25 ? '#f39c12' : '#e74c3c';
    ctx.fillStyle = origColor;
    ctx.fillRect(30, barY, sectionWidth * origFill, barHeight);
    // Clone sections
    for (let s = 0; s < activeClones.length; s++) {
      const clone = activeClones[s];
      const sx = 30 + sectionWidth * (s + 1);
      const cloneFill = Math.min(1, clone.cloneHealth / (clone.cloneMaxHealth || origSectionMax));
      const cloneColor = cloneFill > 0.5 ? '#2ecc71' : cloneFill > 0.25 ? '#f39c12' : '#e74c3c';
      ctx.fillStyle = cloneColor;
      ctx.fillRect(sx, barY, sectionWidth * cloneFill, barHeight);
    }
    // Dividers
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 1;
    for (let s = 1; s < totalBodies; s++) {
      const sx = 30 + (barWidth * s / totalBodies);
      ctx.beginPath();
      ctx.moveTo(sx, barY);
      ctx.lineTo(sx, barY + barHeight);
      ctx.stroke();
    }
  }
  ctx.strokeStyle = '#fff';
  ctx.lineWidth = 2;
  ctx.strokeRect(30, barY, barWidth, barHeight);

  // CPU health bar (right, fills from right)
  ctx.fillStyle = '#333';
  ctx.fillRect(580, barY, barWidth, barHeight);
  const cHealthWidth = (cpu.health / cpu.maxHealth) * barWidth;
  ctx.fillStyle = cpu.health > 50 ? '#2ecc71' : cpu.health > 25 ? '#f39c12' : '#e74c3c';
  ctx.fillRect(580 + barWidth - cHealthWidth, barY, cHealthWidth, barHeight);
  // Duplaire clone sections on CPU health bar
  if (cpu.char.isDuplaire && cpu.duplaireClones.length > 0) {
    const activeClones = cpu.duplaireClones.filter(c => c.active || c.activationTimer > 0);
    const totalBodies = 1 + activeClones.length;
    const sectionWidth = barWidth / totalBodies;
    // Redraw with per-section fills (right-aligned bar)
    ctx.fillStyle = '#333';
    ctx.fillRect(580, barY, barWidth, barHeight);
    // Original's section (rightmost)
    const origSectionMax = cpu.maxHealth / totalBodies;
    const origFill = Math.min(1, cpu.duplaireOrigHealth / origSectionMax);
    const origColor = cpu.duplaireOrigHealth > origSectionMax * 0.5 ? '#2ecc71' : cpu.duplaireOrigHealth > origSectionMax * 0.25 ? '#f39c12' : '#e74c3c';
    ctx.fillStyle = origColor;
    ctx.fillRect(580 + barWidth - sectionWidth, barY, sectionWidth * origFill, barHeight);
    // Clone sections (fill from right)
    for (let s = 0; s < activeClones.length; s++) {
      const clone = activeClones[s];
      const sx = 580 + barWidth - sectionWidth * (s + 2);
      const cloneFill = Math.min(1, clone.cloneHealth / (clone.cloneMaxHealth || origSectionMax));
      const cloneColor = cloneFill > 0.5 ? '#2ecc71' : cloneFill > 0.25 ? '#f39c12' : '#e74c3c';
      ctx.fillStyle = cloneColor;
      ctx.fillRect(sx, barY, sectionWidth * cloneFill, barHeight);
    }
    // Dividers
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 1;
    for (let s = 1; s < totalBodies; s++) {
      const sx = 580 + (barWidth * s / totalBodies);
      ctx.beginPath();
      ctx.moveTo(sx, barY);
      ctx.lineTo(sx, barY + barHeight);
      ctx.stroke();
    }
  }
  ctx.strokeStyle = '#fff';
  ctx.lineWidth = 2;
  ctx.strokeRect(580, barY, barWidth, barHeight);

  // Names with icons
  drawPortraitIcon(selectedPlayer.name, 16, barY + 5, 16);
  ctx.font = 'bold 16px Arial';
  ctx.textAlign = 'left';
  ctx.fillStyle = selectedPlayer.accent;
  ctx.fillText(selectedPlayer.name, 30, barY - 5);
  drawPortraitIcon(selectedCPU.name, 944, barY + 5, 16);
  ctx.textAlign = 'right';
  ctx.fillStyle = selectedCPU.accent;
  ctx.fillText(selectedCPU.name + (gameMode === 'practice' ? '' : ' (CPU)'), 930, barY - 5);

  // Health numbers
  ctx.font = '12px Arial';
  ctx.textAlign = 'left';
  ctx.fillStyle = '#fff';
  ctx.fillText(gameMode === 'practice' ? '\u221E' : Math.ceil(player.health), 35, barY + 17);
  ctx.textAlign = 'right';
  ctx.fillText(gameMode === 'practice' ? '\u221E' : Math.ceil(cpu.health), 925, barY + 17);

  // VS text
  ctx.font = 'bold 18px Arial';
  ctx.textAlign = 'center';
  ctx.fillStyle = '#666';
  ctx.fillText('VS', 480, barY + 18);

  // Practice mode label
  if (gameMode === 'practice') {
    ctx.font = 'bold 14px Arial';
    ctx.fillStyle = '#ff6b35';
    ctx.fillText('PRACTICE MODE | ESC to quit', 480, 520);
  }

  // Assist cooldown bars
  const assistBarW = 100;
  const assistBarH = 8;
  // Player assist
  ctx.fillStyle = '#222';
  ctx.fillRect(30, barY + barHeight + 6, assistBarW, assistBarH);
  const pAssistReady = player.assistCooldown <= 0;
  const pAssistFill = pAssistReady ? 1 : 1 - (player.assistCooldown / selectedAssist.cooldownTime);
  ctx.fillStyle = pAssistReady ? selectedAssist.color : '#555';
  ctx.fillRect(30, barY + barHeight + 6, assistBarW * pAssistFill, assistBarH);
  ctx.strokeStyle = '#888';
  ctx.lineWidth = 1;
  ctx.strokeRect(30, barY + barHeight + 6, assistBarW, assistBarH);
  ctx.font = '10px Arial';
  ctx.textAlign = 'left';
  ctx.fillStyle = '#aaa';
  ctx.fillText(selectedAssist.name + (pAssistReady ? ' READY' : ''), 30, barY + barHeight + 26);

  // CPU assist
  const cpuAssist = assists[cpuAssistIndex];
  ctx.fillStyle = '#222';
  ctx.fillRect(830, barY + barHeight + 6, assistBarW, assistBarH);
  const cAssistReady = cpu.assistCooldown <= 0;
  const cAssistFill = cAssistReady ? 1 : 1 - (cpu.assistCooldown / cpuAssist.cooldownTime);
  ctx.fillStyle = cAssistReady ? cpuAssist.color : '#555';
  ctx.fillRect(830, barY + barHeight + 6, assistBarW * cAssistFill, assistBarH);
  ctx.strokeStyle = '#888';
  ctx.strokeRect(830, barY + barHeight + 6, assistBarW, assistBarH);
  ctx.textAlign = 'right';
  ctx.fillStyle = '#aaa';
  ctx.fillText(cpuAssist.name + (cAssistReady ? ' READY' : ''), 930, barY + barHeight + 26);

  // X-haust oil tank indicator
  if (selectedPlayer.isXhaust) {
    const tankX = 135;
    const tankY = barY + barHeight + 6;
    const tankW = 60;
    const tankH = assistBarH;
    const tankPct = player.xhaustOilTank / player.xhaustMaxOil;
    ctx.fillStyle = '#222';
    ctx.fillRect(tankX, tankY, tankW, tankH);
    ctx.fillStyle = tankPct > 0.5 ? '#ff8833' : tankPct > 0.2 ? '#cc6622' : '#883311';
    ctx.fillRect(tankX, tankY, tankW * tankPct, tankH);
    ctx.strokeStyle = '#888';
    ctx.lineWidth = 1;
    ctx.strokeRect(tankX, tankY, tankW, tankH);
    ctx.font = '10px Arial';
    ctx.textAlign = 'left';
    ctx.fillStyle = '#aaa';
    ctx.fillText('OIL', tankX, tankY + 20);
  }
  if (selectedCPU.isXhaust) {
    const tankX = 825;
    const tankY = barY + barHeight + 6;
    const tankW = -60;
    const tankH = assistBarH;
    const tankPct = cpu.xhaustOilTank / cpu.xhaustMaxOil;
    ctx.fillStyle = '#222';
    ctx.fillRect(tankX + tankW, tankY, -tankW, tankH);
    ctx.fillStyle = tankPct > 0.5 ? '#ff8833' : tankPct > 0.2 ? '#cc6622' : '#883311';
    ctx.fillRect(tankX + tankW, tankY, -tankW * tankPct, tankH);
    ctx.strokeStyle = '#888';
    ctx.lineWidth = 1;
    ctx.strokeRect(tankX + tankW, tankY, -tankW, tankH);
    ctx.font = '10px Arial';
    ctx.textAlign = 'right';
    ctx.fillStyle = '#aaa';
    ctx.fillText('OIL', tankX, tankY + 20);
  }

  // Bojdo scale indicator
  if (selectedPlayer.isBojdo) {
    const scaleBarX = 30;
    const scaleBarY = barY + barHeight + 38;
    const scaleBarW = 140;
    const scaleBarH = 10;
    const sMin = bojdobojdoUnlocked ? 0.2 : 0.5;
    const sMax = bojdobojdoUnlocked ? 3.5 : 2.0;
    const scalePct = (player.bojdoScale - sMin) / (sMax - sMin);
    ctx.fillStyle = '#222';
    ctx.fillRect(scaleBarX, scaleBarY, scaleBarW, scaleBarH);
    const scaleColor = player.bojdoScale > 1.0 ? '#ff4444' : player.bojdoScale < 1.0 ? '#44aaff' : '#ffcc00';
    ctx.fillStyle = scaleColor;
    ctx.fillRect(scaleBarX, scaleBarY, scaleBarW * scalePct, scaleBarH);
    ctx.strokeStyle = '#888';
    ctx.lineWidth = 1;
    ctx.strokeRect(scaleBarX, scaleBarY, scaleBarW, scaleBarH);
    // Midpoint marker
    ctx.fillStyle = '#fff';
    ctx.fillRect(scaleBarX + scaleBarW * ((1.0 - sMin) / (sMax - sMin)), scaleBarY - 2, 2, scaleBarH + 4);
    ctx.font = '10px Arial';
    ctx.textAlign = 'left';
    ctx.fillStyle = '#aaa';
    ctx.fillText('SIZE [K+/L-]', scaleBarX, scaleBarY + 22);
  }
}

function drawTitleScreen() {
  // Background
  const grad = ctx.createLinearGradient(0, 0, 0, 540);
  grad.addColorStop(0, '#0a0a1a');
  grad.addColorStop(0.5, '#1a0a2e');
  grad.addColorStop(1, '#0a1a2e');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 960, 540);

  // Animated bg particles
  for (let i = 0; i < 30; i++) {
    const px = (i * 137 + Date.now() * 0.02 * (i % 3 + 1)) % 960;
    const py = (i * 89 + Date.now() * 0.01 * (i % 2 + 1)) % 540;
    ctx.fillStyle = `rgba(255,100,50,${0.1 + Math.sin(i + Date.now() * 0.003) * 0.05})`;
    ctx.beginPath();
    ctx.arc(px, py, 2 + Math.sin(i) * 1, 0, Math.PI * 2);
    ctx.fill();
  }

  // Title
  titlePulse += 0.03;
  const scale = 1 + Math.sin(titlePulse) * 0.03;
  ctx.save();
  ctx.translate(480, 180);
  ctx.scale(scale, scale);

  // Title shadow
  ctx.font = 'bold 90px Arial';
  ctx.textAlign = 'center';
  ctx.fillStyle = 'rgba(255,50,0,0.3)';
  ctx.fillText('RUMBLER', 4, 4);

  // Title gradient
  const titleGrad = ctx.createLinearGradient(-200, -40, 200, 40);
  titleGrad.addColorStop(0, '#ff4500');
  titleGrad.addColorStop(0.5, '#ff6b35');
  titleGrad.addColorStop(1, '#ffa500');
  ctx.fillStyle = titleGrad;
  ctx.fillText('RUMBLER', 0, 0);

  ctx.strokeStyle = '#fff';
  ctx.lineWidth = 2;
  ctx.strokeText('RUMBLER', 0, 0);
  ctx.restore();

  // Subtitle
  ctx.font = '18px Arial';
  ctx.textAlign = 'center';
  ctx.fillStyle = '#888';
  ctx.fillText('ARCADE FIGHTING', 480, 220);

  // Decorative line
  ctx.strokeStyle = '#ff450066';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(200, 260);
  ctx.lineTo(760, 260);
  ctx.stroke();

  // Menu options
  const menuItems = ['FIGHT CPU', 'PRACTICE'];
  if (rumblePracticeUnlocked) menuItems.push('RUMBLE PRACTICE');
  const menuDescs = ['Battle a CPU opponent', 'Practice combos on a bag or mannequin', 'Practice your Rumble finishers'];
  const menuSpacing = menuItems.length > 2 ? 45 : 55;
  const menuStartY = menuItems.length > 2 ? 310 : 330;
  for (let i = 0; i < menuItems.length; i++) {
    const y = menuStartY + i * menuSpacing;
    const selected = i === titleCursor;
    const btnPulse = selected ? Math.sin(Date.now() * 0.004) * 0.5 + 0.5 : 0;

    // Selection indicator
    if (selected) {
      ctx.fillStyle = 'rgba(255,69,0,0.1)';
      ctx.beginPath();
      ctx.roundRect(330, y - 30, 300, 44, 8);
      ctx.fill();
      ctx.strokeStyle = `rgba(255,${150 + btnPulse * 105},0,${0.6 + btnPulse * 0.4})`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(330, y - 30, 300, 44, 8);
      ctx.stroke();

      ctx.font = 'bold 20px Arial';
      ctx.textAlign = 'right';
      ctx.fillStyle = '#ff6b35';
      ctx.fillText('>', 365, y);
    }

    ctx.font = 'bold 28px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = selected ? `rgba(255,${150 + btnPulse * 105},0,${0.8 + btnPulse * 0.2})` : '#555';
    ctx.fillText(menuItems[i], 480, y);
  }

  // Subtitle for selected mode
  const descY = menuStartY + menuItems.length * menuSpacing + 15;
  ctx.font = '14px Arial';
  ctx.textAlign = 'center';
  ctx.fillStyle = '#666';
  ctx.fillText(menuDescs[titleCursor] || '', 480, descY);

  // Footer
  ctx.font = '14px Arial';
  ctx.fillStyle = '#555';
  ctx.fillText('Press ENTER to select', 480, descY + 35);
}

function drawLockedCharPreview(char, x, y, size) {
  const s = size;
  ctx.save();
  ctx.translate(x, y);

  // Card background - darker than normal
  ctx.fillStyle = '#0a0a15';
  ctx.fillRect(-s/2 - 5, -s - 15, s + 10, s + 35);
  ctx.strokeStyle = '#222';
  ctx.lineWidth = 1;
  ctx.strokeRect(-s/2 - 5, -s - 15, s + 10, s + 35);

  // Black silhouette - generic fighter shape
  const sc = s / 100;
  ctx.save();
  ctx.scale(sc, sc);
  ctx.fillStyle = '#111';
  // Head
  ctx.beginPath(); ctx.arc(0, -100 + 22, 14, 0, Math.PI * 2); ctx.fill();
  // Body
  ctx.fillRect(-12, -100 + 30, 24, 30);
  // Arms
  ctx.fillRect(-22, -100 + 32, 12, 6);
  ctx.fillRect(10, -100 + 32, 12, 6);
  // Legs
  ctx.fillRect(-10, -100 + 58, 8, 20);
  ctx.fillRect(2, -100 + 58, 8, 20);
  ctx.restore();

  // ??? name
  ctx.font = `bold ${Math.max(10, s * 0.18)}px Arial`;
  ctx.fillStyle = '#444';
  ctx.textAlign = 'center';
  ctx.fillText('???', 0, s * 0.12);

  // Hint text
  const hint = secretCharHints.get(char) || '...';
  ctx.font = `${Math.max(7, s * 0.11)}px Arial`;
  ctx.fillStyle = '#333';
  ctx.fillText(hint, 0, s * 0.26);

  ctx.restore();
}

function drawCharacterPreview(char, x, y, size, selected, label) {
  const s = size;
  ctx.save();
  ctx.translate(x, y);

  // Selection highlight
  if (selected) {
    ctx.shadowColor = char.accent;
    ctx.shadowBlur = 20;
    ctx.strokeStyle = char.accent;
    ctx.lineWidth = 3;
    ctx.strokeRect(-s/2 - 8, -s - 20, s + 16, s + 40);
    ctx.shadowBlur = 0;
  }

  // Card background
  ctx.fillStyle = selected ? '#2a2a4a' : '#1a1a2a';
  ctx.fillRect(-s/2 - 5, -s - 15, s + 10, s + 35);
  ctx.strokeStyle = selected ? char.accent : '#333';
  ctx.lineWidth = 1;
  ctx.strokeRect(-s/2 - 5, -s - 15, s + 10, s + 35);

  // Mini character (scaled to card size)
  const sc = s / 100;
  const bob = selected ? Math.sin(Date.now() * 0.005) * 3 * sc : 0;

  ctx.save();
  ctx.scale(sc, sc);
  // Golgar: draw dormant entity on the left, shift active entity to the right
  if (char.isGolgar) {
    ctx.save();
    ctx.translate(-16, 0);
    const stoneColor = '#777788';
    const stoneAccent = '#999aaa';
    // Body
    ctx.fillStyle = stoneColor;
    ctx.fillRect(-12, -100 + 30 + bob / sc, 24, 30);
    // Head
    ctx.fillStyle = stoneAccent;
    ctx.beginPath(); ctx.arc(0, -100 + 22 + bob / sc, 14, 0, Math.PI * 2); ctx.fill();
    // Closed eyes
    ctx.strokeStyle = '#555566';
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(-6, -100 + 20 + bob / sc); ctx.lineTo(-1, -100 + 20 + bob / sc); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(2, -100 + 20 + bob / sc); ctx.lineTo(7, -100 + 20 + bob / sc); ctx.stroke();
    // Legs
    ctx.strokeStyle = stoneColor;
    ctx.lineWidth = 4;
    ctx.beginPath(); ctx.moveTo(-6, -100 + 60 + bob / sc); ctx.lineTo(-10, -100 + 75 + bob / sc); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(6, -100 + 60 + bob / sc); ctx.lineTo(10, -100 + 75 + bob / sc); ctx.stroke();
    ctx.restore();
    ctx.translate(16, 0);
  }
  // Body
  ctx.fillStyle = char.color;
  if (char.isPaletap) {
    // Taller body for Paletap
    ctx.fillRect(-13, -100 + 10 + bob / sc, 26, 50);
  } else {
    ctx.fillRect(-12, -100 + 30 + bob / sc, 24, 30);
  }
  // Head
  ctx.fillStyle = char.accent;
  if (char.isPaletap) {
    ctx.save();
    ctx.translate(0, -100 + 6 + bob / sc);
    ctx.rotate(0.3);
    ctx.beginPath();
    ctx.arc(0, 0, 14, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  } else {
    ctx.beginPath();
    ctx.arc(0, -100 + 22 + bob / sc, 14, 0, Math.PI * 2);
    ctx.fill();
  }
  // Snazz McJazz fedora on character select
  if (char.isSnazz) {
    const headCY = -100 + 22 + bob / sc;
    ctx.fillStyle = '#ffffff';
    ctx.strokeStyle = '#cccccc';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.ellipse(0, headCY - 10, 18, 4, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.moveTo(-8, headCY - 10);
    ctx.lineTo(-6, headCY - 22);
    ctx.lineTo(6, headCY - 22);
    ctx.lineTo(8, headCY - 10);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#cccccc';
    ctx.stroke();
    ctx.fillStyle = '#222222';
    ctx.fillRect(-7, headCY - 14, 14, 2);
  }
  // Bozollok antennae and mandibles on card
  if (char.isBozollok) {
    const headCY = -100 + 22 + bob / sc;
    ctx.strokeStyle = '#c8a030';
    ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(3, headCY - 10); ctx.quadraticCurveTo(12, headCY - 22, 16, headCY - 19); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(-1, headCY - 10); ctx.quadraticCurveTo(-8, headCY - 24, -4, headCY - 22); ctx.stroke();
    ctx.fillStyle = '#c8a030';
    ctx.beginPath(); ctx.arc(16, headCY - 19, 1.5, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(-4, headCY - 22, 1.5, 0, Math.PI * 2); ctx.fill();
    // Mandibles
    ctx.strokeStyle = '#8a6a10';
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(5, headCY + 4); ctx.lineTo(11, headCY + 9); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(3, headCY + 6); ctx.lineTo(9, headCY + 12); ctx.stroke();
  }
  // Gourmand fork and spoon on card
  if (char.isGourmand) {
    const hCY = -100 + 22 + bob / sc;
    // Fork (right side)
    ctx.strokeStyle = '#ccc';
    ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(18, hCY + 20); ctx.lineTo(22, hCY + 4); ctx.stroke();
    for (let p = -1; p <= 1; p++) {
      ctx.beginPath(); ctx.moveTo(22 + p * 1.5, hCY + 4); ctx.lineTo(23 + p * 1.5, hCY - 2); ctx.stroke();
    }
    // Spoon (left side)
    ctx.beginPath(); ctx.moveTo(-16, hCY + 20); ctx.lineTo(-20, hCY + 4); ctx.stroke();
    ctx.fillStyle = '#ccc';
    ctx.beginPath(); ctx.ellipse(-20, hCY + 1, 3, 2.5, 0, 0, Math.PI * 2); ctx.fill();
  }
  // Eyes
  const cardEyeY = char.isPaletap ? -100 + 4 + bob / sc : -100 + 20 + bob / sc;
  ctx.fillStyle = char.outline;
  if (char.isPaletap) {
    ctx.save();
    ctx.translate(0, cardEyeY);
    ctx.rotate(0.3);
    ctx.beginPath(); ctx.arc(-4, 0, 2.5, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(5, 0, 2.5, 0, Math.PI * 2); ctx.fill();
    ctx.restore();
  } else {
    ctx.beginPath();
    ctx.arc(-4, cardEyeY, 2.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(5, cardEyeY, 2.5, 0, Math.PI * 2);
    ctx.fill();
  }
  // Legs
  ctx.strokeStyle = char.color;
  ctx.lineWidth = char.isPaletap ? 5 : 4;
  if (char.isPaletap) {
    // Longer legs with knees
    ctx.beginPath();
    ctx.moveTo(-6, -100 + 60 + bob / sc);
    ctx.lineTo(-8, -100 + 68 + bob / sc);
    ctx.lineTo(-10, -100 + 80 + bob / sc);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(6, -100 + 60 + bob / sc);
    ctx.lineTo(8, -100 + 68 + bob / sc);
    ctx.lineTo(10, -100 + 80 + bob / sc);
    ctx.stroke();
  } else {
    ctx.beginPath();
    ctx.moveTo(-6, -100 + 60 + bob / sc);
    ctx.lineTo(-10, -100 + 75 + bob / sc);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(6, -100 + 60 + bob / sc);
    ctx.lineTo(10, -100 + 75 + bob / sc);
    ctx.stroke();
  }
  ctx.restore();

  // Name
  ctx.font = `bold ${Math.round(13 * sc)}px Arial`;
  ctx.textAlign = 'center';
  ctx.fillStyle = selected ? '#fff' : '#888';
  ctx.fillText(char.name, 0, 15 * sc);

  // Label
  if (label) {
    ctx.font = `${Math.round(10 * sc)}px Arial`;
    ctx.fillStyle = char.accent;
    ctx.fillText(label, 0, -s - 22 * sc);
  }

  ctx.restore();
}

function drawRandomCard(x, y, size, selected, label) {
  const s = size;
  ctx.save();
  ctx.translate(x, y);

  if (selected) {
    ctx.shadowColor = '#ffd700';
    ctx.shadowBlur = 20;
    ctx.strokeStyle = '#ffd700';
    ctx.lineWidth = 3;
    ctx.strokeRect(-s/2 - 8, -s - 20, s + 16, s + 40);
    ctx.shadowBlur = 0;
  }

  ctx.fillStyle = selected ? '#2a2a3a' : '#1a1a2a';
  ctx.fillRect(-s/2 - 5, -s - 15, s + 10, s + 35);
  ctx.strokeStyle = selected ? '#ffd700' : '#333';
  ctx.lineWidth = 1;
  ctx.strokeRect(-s/2 - 5, -s - 15, s + 10, s + 35);

  // Question mark with animation (scaled to card size)
  const sc = s / 100;
  const pulse = selected ? Math.sin(Date.now() * 0.005) * 4 * sc : 0;
  ctx.font = `bold ${Math.round(50 * sc) + pulse}px Arial`;
  ctx.textAlign = 'center';
  ctx.fillStyle = selected ? '#ffd700' : '#666';
  ctx.fillText('?', 0, -s + 55 * sc);

  ctx.font = `bold ${Math.round(13 * sc)}px Arial`;
  ctx.fillStyle = selected ? '#fff' : '#888';
  ctx.fillText('RANDOM', 0, 15 * sc);

  if (label) {
    ctx.font = `${Math.round(10 * sc)}px Arial`;
    ctx.fillStyle = '#ffd700';
    ctx.fillText(label, 0, -s - 22 * sc);
  }

  ctx.restore();
}

function drawLotteryOverlay() {
  if (!lotteryActive) return;
  const isChar = lotteryType === 'char' || lotteryType === 'cpu';
  const isLevel = lotteryType === 'level';
  const pool = isLevel ? getLevels() : (isChar ? characters : assists);
  const pick = pool[lotteryCurrent];
  const landed = lotteryTimer >= lotteryDuration;
  const progress = Math.min(1, lotteryTimer / lotteryDuration);

  // Darkened backdrop
  ctx.save();
  ctx.fillStyle = 'rgba(0,0,0,0.7)';
  ctx.fillRect(0, 0, 960, 540);

  // Cycling name display
  const bounceY = landed ? 0 : Math.sin(lotteryTimer * 0.5) * 5;
  const scaleUp = landed ? 1.15 : 1;

  ctx.translate(480, 250 + bounceY);
  ctx.scale(scaleUp, scaleUp);

  // Glow behind name when landed
  if (landed) {
    const flashAlpha = 0.4 + Math.sin((lotteryTimer - lotteryDuration) * 0.15) * 0.2;
    ctx.shadowColor = pick.accent || '#ffd700';
    ctx.shadowBlur = 40;
    ctx.globalAlpha = flashAlpha;
    ctx.fillStyle = pick.accent || '#ffd700';
    ctx.beginPath();
    ctx.arc(0, -10, 80, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.globalAlpha = 1;
  }

  // Name text
  ctx.font = 'bold 42px Arial';
  ctx.textAlign = 'center';
  ctx.strokeStyle = '#000';
  ctx.lineWidth = 4;
  ctx.strokeText(pick.name, 0, 0);
  ctx.fillStyle = pick.accent || '#ffd700';
  ctx.fillText(pick.name, 0, 0);

  // Description
  ctx.font = '18px Arial';
  ctx.fillStyle = '#aaa';
  ctx.fillText(pick.desc || '', 0, 30);

  // Rapid-cycling indicator lines (visual flair while spinning)
  if (!landed) {
    const count = Math.ceil((1 - progress) * 6);
    for (let i = 0; i < count; i++) {
      const lx = (Math.random() - 0.5) * 300;
      const ly = 50 + Math.random() * 20;
      ctx.globalAlpha = 0.2 + Math.random() * 0.3;
      ctx.fillStyle = '#fff';
      ctx.fillRect(lx, ly, 30 + Math.random() * 40, 2);
    }
    ctx.globalAlpha = 1;
  }

  ctx.restore();
}

function drawPracticeTargetScreen() {
  ctx.fillStyle = '#0a0a1a';
  ctx.fillRect(0, 0, 960, 540);

  // Title
  ctx.font = 'bold 32px Arial';
  ctx.textAlign = 'center';
  ctx.fillStyle = '#ff6b35';
  ctx.fillText('SELECT PRACTICE TARGET', 480, 60);

  ctx.font = '16px Arial';
  ctx.fillStyle = '#aaa';
  ctx.fillText('Choose what to train against', 480, 90);
  // Player icon
  drawPortraitIcon(selectedPlayer.name, 30, 30, 22);
  ctx.font = '11px Arial';
  ctx.textAlign = 'left';
  ctx.fillStyle = selectedPlayer.accent;
  ctx.fillText(selectedPlayer.name, 48, 34);

  const targets = [
    { name: 'BAG', desc: ['Punching bag.', 'Stands still, takes hits.'], color: '#8B4513', accent: '#D2691E' },
    { name: 'MANNEQUIN', desc: ['Wooden dummy.', 'Punches every 2 seconds.'], color: '#c4a36e', accent: '#dbc09a' },
    { name: 'DRONE', desc: ['Moving target.', 'Walks around, no attacks.'], color: '#7a8a9a', accent: '#aabbcc' }
  ];

  for (let i = 0; i < targets.length; i++) {
    const t = targets[i];
    const x = 260 + i * 220;
    const selected = i === practiceTargetCursor;
    const pulse = selected ? Math.sin(Date.now() * 0.004) * 0.5 + 0.5 : 0;

    // Card background
    ctx.fillStyle = selected ? 'rgba(255,107,53,0.15)' : 'rgba(255,255,255,0.05)';
    ctx.beginPath();
    ctx.roundRect(x - 80, 130, 160, 280, 12);
    ctx.fill();
    ctx.strokeStyle = selected ? `rgba(255,${150 + pulse * 105},0,${0.6 + pulse * 0.4})` : '#333';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw preview
    ctx.save();
    ctx.translate(x, 250);
    if (i === 0) {
      // Bag preview
      ctx.fillStyle = t.color;
      ctx.strokeStyle = '#5C3317';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(-18, -50);
      ctx.quadraticCurveTo(-22, -25, -18, 0);
      ctx.quadraticCurveTo(0, 5, 18, 0);
      ctx.quadraticCurveTo(22, -25, 18, -50);
      ctx.closePath();
      ctx.fill(); ctx.stroke();
      ctx.fillStyle = t.accent;
      ctx.beginPath(); ctx.ellipse(0, -50, 18, 6, 0, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = '#888';
      ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(0, -56); ctx.lineTo(0, -80); ctx.stroke();
      ctx.strokeStyle = t.accent;
      ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(0, -48); ctx.lineTo(0, -5); ctx.stroke();
    } else if (i === 1) {
      // Mannequin preview
      const wood = t.color;
      const joint = '#8a7040';
      // Head
      ctx.fillStyle = wood;
      ctx.beginPath(); ctx.arc(0, -50, 12, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = '#a08050'; ctx.lineWidth = 1.5; ctx.stroke();
      // Eyes
      ctx.fillStyle = '#333';
      ctx.beginPath(); ctx.arc(-4, -52, 2, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(4, -52, 2, 0, Math.PI * 2); ctx.fill();
      // Smile
      ctx.strokeStyle = '#333'; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.arc(0, -48, 5, 0.1, Math.PI - 0.1); ctx.stroke();
      // Neck
      ctx.fillStyle = joint;
      ctx.beginPath(); ctx.arc(0, -38, 3, 0, Math.PI * 2); ctx.fill();
      // Torso
      ctx.fillStyle = wood;
      ctx.beginPath(); ctx.roundRect(-14, -36, 28, 36, 4); ctx.fill();
      // Arms
      ctx.fillRect(-22, -34, 6, 20);
      ctx.fillRect(16, -34, 6, 20);
      ctx.fillStyle = joint;
      ctx.beginPath(); ctx.arc(-14, -34, 3, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(14, -34, 3, 0, Math.PI * 2); ctx.fill();
      // Legs
      ctx.fillStyle = wood;
      ctx.fillRect(-10, 0, 7, 24);
      ctx.fillRect(3, 0, 7, 24);
      ctx.fillStyle = joint;
      ctx.beginPath(); ctx.arc(-7, 0, 3, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(7, 0, 3, 0, Math.PI * 2); ctx.fill();
      // Base
      ctx.fillStyle = '#a08050';
      ctx.beginPath(); ctx.roundRect(-18, 24, 36, 4, 2); ctx.fill();
    } else {
      // Drone preview - looks like a normal fighter
      const c = t.color;
      const a = t.accent;
      const o = '#4a5a6a';
      // Head
      ctx.fillStyle = c;
      ctx.strokeStyle = o;
      ctx.lineWidth = 2;
      ctx.beginPath(); ctx.arc(0, -48, 12, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
      // Eyes
      ctx.fillStyle = '#fff';
      ctx.beginPath(); ctx.arc(-4, -50, 3, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(4, -50, 3, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#111';
      ctx.beginPath(); ctx.arc(-3, -50, 1.5, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(5, -50, 1.5, 0, Math.PI * 2); ctx.fill();
      // Body
      ctx.fillStyle = c;
      ctx.strokeStyle = o;
      ctx.beginPath(); ctx.roundRect(-14, -36, 28, 32, 4); ctx.fill(); ctx.stroke();
      // Accent stripe
      ctx.fillStyle = a;
      ctx.fillRect(-10, -28, 20, 4);
      // Arms
      ctx.fillStyle = c;
      ctx.fillRect(-22, -34, 8, 22);
      ctx.fillRect(14, -34, 8, 22);
      // Legs
      ctx.fillRect(-12, -4, 9, 26);
      ctx.fillRect(3, -4, 9, 26);
      // Arrow indicators (showing movement)
      ctx.fillStyle = a;
      ctx.globalAlpha = 0.5 + Math.sin(Date.now() * 0.005) * 0.3;
      ctx.beginPath(); ctx.moveTo(-30, -20); ctx.lineTo(-24, -26); ctx.lineTo(-24, -14); ctx.closePath(); ctx.fill();
      ctx.beginPath(); ctx.moveTo(30, -20); ctx.lineTo(24, -26); ctx.lineTo(24, -14); ctx.closePath(); ctx.fill();
      ctx.globalAlpha = 1;
    }
    ctx.restore();

    // Name
    ctx.font = 'bold 20px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = selected ? '#fff' : '#888';
    ctx.fillText(t.name, x, 340);

    // Description
    ctx.font = '11px Arial';
    ctx.fillStyle = '#666';
    ctx.fillText(t.desc[0], x, 360);
    ctx.fillText(t.desc[1], x, 375);
  }

  // Instructions
  ctx.font = '14px Arial';
  ctx.textAlign = 'center';
  ctx.fillStyle = '#555';
  ctx.fillText('LEFT/RIGHT to browse | ENTER to select | ESC to go back', 480, 470);
}

function drawCharSelectScreen() {
  // Background
  ctx.fillStyle = '#0a0a1a';
  ctx.fillRect(0, 0, 960, 540);

  // Build display list: unlocked chars + locked silhouettes (when toggled) + RANDOM
  const lockedChars = showLockedChars ? secretCharOrder.filter(c => !characters.includes(c)) : [];
  const displaySlots = characters.length + lockedChars.length + 1; // +1 for RANDOM

  // Character cards (including RANDOM) - adaptive full-width grid layout
  const charSlots = characters.length + 1; // selectable slots (for cursor)
  const canvasW = 960;
  const canvasH = 540;
  const margin = 20; // side margins
  const usableWidth = canvasW - margin * 2;
  const titleSpace = 65; // space for title at top
  const infoH = 140; // info panel height at bottom
  const bottomPad = 30;
  const availableGridH = canvasH - titleSpace - infoH - bottomPad;

  // Find best perRow: try fitting in fewest rows while keeping cards reasonable
  let perRow, rows, cardSize, gap;
  const cardVisualExtra = 45; // space below card for name label
  const minGap = 10;
  const maxCardSize = 110;

  // Try increasing perRow until everything fits well
  for (let tryPerRow = Math.ceil(displaySlots / 4); tryPerRow <= displaySlots; tryPerRow++) {
    const tryRows = Math.ceil(displaySlots / tryPerRow);
    // Card size from width: usableWidth = tryPerRow * cardSize + (tryPerRow - 1) * gap
    // We want gap = fraction of cardSize. Start by computing max card size for this perRow.
    // gap = cardSize * 0.3 (target ratio), so: usableWidth = tryPerRow * cs + (tryPerRow-1) * cs * 0.3
    const cs = Math.min(maxCardSize, usableWidth / (tryPerRow + (tryPerRow - 1) * 0.3));
    const g = cs * 0.3;
    if (g < minGap) continue;
    // Check vertical fit: each row = cardSize + cardVisualExtra + gap (equal gap vertically)
    const rowH = cs + cardVisualExtra + g;
    const totalGridH = tryRows * rowH;
    if (totalGridH <= availableGridH || tryRows <= 1) {
      perRow = tryPerRow;
      rows = tryRows;
      cardSize = Math.round(cs);
      gap = Math.round(g);
      break;
    }
  }

  // Fallback if nothing fit perfectly — use scrolling with reasonable size
  if (!perRow) {
    perRow = Math.ceil(displaySlots / 3);
    rows = Math.ceil(displaySlots / perRow);
    cardSize = Math.round(Math.min(maxCardSize, usableWidth / (perRow + (perRow - 1) * 0.3)));
    gap = Math.round(cardSize * 0.3);
  }

  const spacing = cardSize + gap;
  const rowHeight = cardSize + cardVisualExtra + gap;
  charSelectPerRow = perRow; // expose to navigation

  const manyChars = characters.length > 12;
  const topSpace = titleSpace;
  const gridStartY = topSpace + cardSize + 40;
  const lastRowY = gridStartY + (rows - 1) * rowHeight;
  const infoBaseY = lastRowY + 20 + 22;
  const compact = rows > 2;
  const totalContentH = infoBaseY + infoH + 30;
  charSelectMaxScroll = Math.max(0, totalContentH - 540);
  charSelectScroll = Math.max(0, Math.min(charSelectScroll, charSelectMaxScroll));

  // Auto-scroll only when cursor changes
  const activeCursor = selectingCPU ? cpuSelectCursor : charSelectCursor;
  if (activeCursor !== charSelectLastCursor) {
    charSelectLastCursor = activeCursor;
    const selectedRow = Math.floor(activeCursor / perRow);
    const selectedCardTop = gridStartY + selectedRow * rowHeight - cardSize - 20;
    const selectedCardBot = gridStartY + selectedRow * rowHeight + 30;
    if (selectedCardTop < charSelectScroll) {
      charSelectScroll = Math.max(0, selectedCardTop);
    }
    if (selectedCardBot > charSelectScroll + 540) {
      charSelectScroll = Math.min(charSelectMaxScroll, selectedCardBot - 540);
    }
  }

  ctx.save();
  ctx.translate(0, -charSelectScroll);

  // Title
  ctx.font = `bold ${manyChars ? 28 : 36}px Arial`;
  ctx.textAlign = 'center';
  ctx.fillStyle = '#ff6b35';
  ctx.fillText('SELECT YOUR FIGHTER', 480, manyChars ? 35 : 50);

  if (gameMode === 'practice') {
    ctx.font = `${manyChars ? 14 : 18}px Arial`;
    ctx.fillStyle = '#aaa';
    ctx.fillText('Practice Mode - Select your fighter', 480, manyChars ? 52 : 80);
  } else if (selectingCPU) {
    ctx.font = `${manyChars ? 14 : 18}px Arial`;
    ctx.fillStyle = '#aaa';
    ctx.fillText('Now select CPU opponent', 480, manyChars ? 52 : 80);
  }

  // Build display order: unlocked chars, then locked chars, then RANDOM
  const displayList = [];
  for (let i = 0; i < characters.length; i++) displayList.push({ type: 'char', char: characters[i], selectIdx: i });
  for (let i = 0; i < lockedChars.length; i++) displayList.push({ type: 'locked', char: lockedChars[i] });
  displayList.push({ type: 'random', selectIdx: characters.length });

  // Character cards
  for (let i = 0; i < displayList.length; i++) {
    const row = Math.floor(i / perRow);
    const col = i % perRow;
    const slotsInRow = row < rows - 1 ? perRow : displayList.length - row * perRow;
    const rowStartX = 480 - ((slotsInRow - 1) * spacing) / 2;
    const x = rowStartX + col * spacing;
    const y = gridStartY + row * rowHeight;
    const item = displayList[i];

    if (item.type === 'locked') {
      drawLockedCharPreview(item.char, x, y, cardSize);
    } else {
      let label = null;
      let isSelected = false;
      const si = item.selectIdx;
      if (!selectingCPU) {
        isSelected = si === charSelectCursor;
      } else {
        isSelected = si === cpuSelectCursor;
        if (si === charSelectCursor) label = 'P1';
      }
      if (item.type === 'char') {
        drawCharacterPreview(item.char, x, y, cardSize, isSelected, label);
      } else {
        drawRandomCard(x, y, cardSize, isSelected, label);
      }
    }
  }

  // Selected character info
  const cursorIdx = selectingCPU ? cpuSelectCursor : charSelectCursor;
  const isRandom = cursorIdx >= characters.length;
  if (isRandom) {
    ctx.font = `bold ${compact ? 18 : 24}px Arial`;
    ctx.fillStyle = '#ffd700';
    ctx.textAlign = 'center';
    ctx.fillText('RANDOM', 480, infoBaseY);
    ctx.font = `${compact ? 12 : 16}px Arial`;
    ctx.fillStyle = '#aaa';
    ctx.fillText('Pick a random fighter', 480, infoBaseY + (compact ? 18 : 25));
  } else {
    const current = characters[cursorIdx];
    ctx.font = `bold ${compact ? 18 : 24}px Arial`;
    ctx.fillStyle = current.accent;
    ctx.textAlign = 'center';
    ctx.fillText(current.name, 480, infoBaseY);
    ctx.font = `${compact ? 12 : 16}px Arial`;
    ctx.fillStyle = '#aaa';
    ctx.fillText(current.desc, 480, infoBaseY + (compact ? 16 : 25));

    // Stats (left side)
    const statNames = ['Speed', 'Power', 'Defense'];
    const statValues = [current.stats.speed / 6, current.stats.power / 1.3, current.stats.defense / 1.4];
    const statGap = compact ? 16 : 22;
    const statStart = infoBaseY + (compact ? 30 : 45);
    for (let i = 0; i < 3; i++) {
      const sx = 250;
      const sy = statStart + i * statGap;
      ctx.font = '12px Arial';
      ctx.textAlign = 'right';
      ctx.fillStyle = '#888';
      ctx.fillText(statNames[i], sx, sy + 10);
      ctx.fillStyle = '#333';
      ctx.fillRect(sx + 8, sy, 140, 12);
      ctx.fillStyle = current.accent;
      ctx.fillRect(sx + 8, sy, 140 * statValues[i], 12);
      ctx.strokeStyle = '#555';
      ctx.lineWidth = 1;
      ctx.strokeRect(sx + 8, sy, 140, 12);
    }

    // Combos / abilities preview (right side)
    const abilStart = compact ? statStart : infoBaseY + 55;
    const abilLine1 = abilStart + (compact ? 12 : 17);
    const abilLine2 = abilLine1 + (compact ? 14 : 18);
    const combos = characterCombos[current.name];
    if (combos) {
      ctx.font = 'bold 12px Arial';
      ctx.textAlign = 'left';
      ctx.fillStyle = '#888';
      ctx.fillText('COMBOS:', 530, abilStart);
      const keyMap = { jab: 'Z', lowKick: 'C', uppercut: 'X', highKick: 'V' };
      for (let c = 0; c < combos.length; c++) {
        const cy = abilLine1 + c * (compact ? 16 : 22);
        ctx.fillStyle = combos[c].effectColor;
        ctx.beginPath();
        ctx.arc(537, cy - 3, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.font = '11px Arial';
        ctx.fillStyle = '#ccc';
        ctx.fillText(combos[c].name, 545, cy);
        ctx.fillStyle = '#888';
        const seq = combos[c].sequence.map(s => keyMap[s]).join(' > ');
        ctx.fillText(seq, 660, cy);
      }
    } else {
      // Special ability preview for secret characters
      const abilityMap = {
        isBojdo: ['SIZE SHIFTING', 'K / L', 'Grow or shrink to change stats'],
        isRubberman: ['RUBBER STRETCH', '', 'Attacks reach across the screen'],
        isTorrena: ['WATER PHASE', 'H', 'Phase through foes, immune to damage'],
        isSnazz: ['JAZZ DANCE', 'J', 'Dance 2s to heal, 2x damage if hit'],
        isHaystack: ['HAY EXPLOSION', 'F', 'Explode into arrows & sword, 1s reform'],
        isCodemax: ['CODE PORT', 'N', 'Swap positions with opponent'],
        isCorvida: ['BLUE JAY FORM', '\u2191 \u2191', 'Double-jump to fly, land to revert'],
        isGolgar: ['SOUL SWAP', 'G', 'Switch to dormant entity'],
        isTelatrine: ['WARP WALK', '', 'Walk through walls to the other side'],
        isDuplaire: ['CLONE ARMY', 'K', 'Create clones that share damage & health'],
        isBozollok: ['SKIN SHED', 'H', 'Molt leap, hover, then claw descent'],
        isGourmand: ['DEVOUR', 'L / P', 'Absorb attacks, spit energy ball'],
        isBatsch: ['TORTOISE FORM', '\u2193 \u2193', 'Shell reduces damage 60%, jump to revert'],
        isPaletap: ['GROUND SLAM', 'K', 'Shockwave across the ground, jump to dodge'],
        isMatador: ['ESTOQUE DASH', 'O', 'Dash through foe and slash with blade'],
        isKillawatt: ['VOLT ZAP', 'K', 'Zap foe in range, stun & damage'],
        isBacktrack: ['TIME REWIND', 'J', 'Rewind 8s, restore health & positions'],
        isExor: ['SOUL DRAIN', 'N', 'Steal HP at close range, slows foe'],
        isBuck: ['FIREWORK SPRAY', 'L', 'Spray red, white & blue fireworks'],
        isVortice: ['TORNADO', 'H / J', 'Pull foes in or blast them away'],
        isXhaust: ['OIL IGNITE', 'L / K', 'Leak oil trail, then ignite it'],
      };
      for (const [flag, info] of Object.entries(abilityMap)) {
        if (!current[flag]) continue;
        ctx.font = 'bold 12px Arial';
        ctx.textAlign = 'left';
        ctx.fillStyle = '#888';
        ctx.fillText('ABILITIES:', 530, abilStart);
        ctx.font = '11px Arial';
        ctx.fillStyle = current.accent;
        ctx.beginPath(); ctx.arc(537, abilLine1 - 3, 3, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#ccc';
        ctx.fillText(info[0], 545, abilLine1);
        if (info[1]) { ctx.fillStyle = '#888'; ctx.fillText(info[1], 660, abilLine1); }
        ctx.fillStyle = '#666';
        ctx.fillText(info[2], 545, abilLine2);
        break;
      }
    }
  }

  // Instructions
  ctx.font = '14px Arial';
  ctx.textAlign = 'center';
  ctx.fillStyle = '#555';
  ctx.fillText('LEFT/RIGHT to browse | ENTER to select' + (selectingCPU ? ' | ESC to go back' : '') + (charSelectMaxScroll > 0 ? ' | Scroll to see more' : ''), 480, infoBaseY + infoH + 10);

  ctx.restore();

  // Scroll indicator (drawn at screen coordinates)
  if (charSelectMaxScroll > 0) {
    const trackH = 400;
    const trackY = 70;
    const thumbH = Math.max(30, trackH * (540 / totalContentH));
    const thumbY = trackY + (charSelectScroll / charSelectMaxScroll) * (trackH - thumbH);
    ctx.fillStyle = 'rgba(255,255,255,0.1)';
    ctx.fillRect(948, trackY, 6, trackH);
    ctx.fillStyle = 'rgba(255,255,255,0.3)';
    ctx.beginPath();
    ctx.roundRect(948, thumbY, 6, thumbH, 3);
    ctx.fill();
  }

  // Bojdo unlock flash
  if (bojdoUnlockFlash > 0) {
    bojdoUnlockFlash--;
    ctx.save();
    ctx.globalAlpha = bojdoUnlockFlash / 60 * 0.6;
    ctx.fillStyle = '#ffcc00';
    ctx.fillRect(0, 0, 960, 540);
    ctx.globalAlpha = Math.min(1, bojdoUnlockFlash / 30);
    ctx.font = 'bold 48px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#000';
    ctx.fillText(bojdobojdoUnlocked ? 'BOJDOBOJDO AWAKENED' : 'CHALLENGER UNLOCKED', 480, 270);
    ctx.restore();
  }

  // Rubberman unlock flash
  if (rubbermanUnlockFlash > 0) {
    rubbermanUnlockFlash--;
    ctx.save();
    ctx.globalAlpha = rubbermanUnlockFlash / 60 * 0.6;
    ctx.fillStyle = '#ff4400';
    ctx.fillRect(0, 0, 960, 540);
    ctx.globalAlpha = Math.min(1, rubbermanUnlockFlash / 30);
    ctx.font = 'bold 48px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#fff';
    ctx.fillText('CHALLENGER UNLOCKED', 480, 270);
    ctx.restore();
  }

  // Torrena unlock flash
  if (torrenaUnlockFlash > 0) {
    torrenaUnlockFlash--;
    ctx.save();
    ctx.globalAlpha = torrenaUnlockFlash / 60 * 0.6;
    ctx.fillStyle = '#44ddff';
    ctx.fillRect(0, 0, 960, 540);
    ctx.globalAlpha = Math.min(1, torrenaUnlockFlash / 30);
    ctx.font = 'bold 48px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#000';
    ctx.fillText('CHALLENGER UNLOCKED', 480, 270);
    ctx.restore();
  }

  // Snazz McJazz unlock flash
  if (snazzUnlockFlash > 0) {
    snazzUnlockFlash--;
    ctx.save();
    ctx.globalAlpha = snazzUnlockFlash / 60 * 0.6;
    ctx.fillStyle = '#ff00ff';
    ctx.fillRect(0, 0, 960, 540);
    ctx.globalAlpha = Math.min(1, snazzUnlockFlash / 30);
    ctx.font = 'bold 48px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#fff';
    ctx.fillText('CHALLENGER UNLOCKED', 480, 270);
    ctx.restore();
  }

  // Haystack unlock flash
  if (haystackUnlockFlash > 0) {
    haystackUnlockFlash--;
    ctx.save();
    ctx.globalAlpha = haystackUnlockFlash / 60 * 0.6;
    ctx.fillStyle = '#c4a35a';
    ctx.fillRect(0, 0, 960, 540);
    ctx.globalAlpha = Math.min(1, haystackUnlockFlash / 30);
    ctx.font = 'bold 48px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#000';
    ctx.fillText('CHALLENGER UNLOCKED', 480, 270);
    ctx.restore();
  }

  // Codemax unlock flash
  if (codemaxUnlockFlash > 0) {
    codemaxUnlockFlash--;
    ctx.save();
    ctx.globalAlpha = codemaxUnlockFlash / 60 * 0.6;
    ctx.fillStyle = '#00ff88';
    ctx.fillRect(0, 0, 960, 540);
    ctx.globalAlpha = Math.min(1, codemaxUnlockFlash / 30);
    ctx.font = 'bold 48px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#000';
    ctx.fillText('CHALLENGER UNLOCKED', 480, 270);
    ctx.restore();
  }

  // Telatrine unlock flash
  if (telatrineUnlockFlash > 0) {
    telatrineUnlockFlash--;
    ctx.save();
    ctx.globalAlpha = telatrineUnlockFlash / 60 * 0.6;
    ctx.fillStyle = '#b366ff';
    ctx.fillRect(0, 0, 960, 540);
    ctx.globalAlpha = Math.min(1, telatrineUnlockFlash / 30);
    ctx.font = 'bold 48px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#fff';
    ctx.fillText('CHALLENGER UNLOCKED', 480, 270);
    ctx.restore();
  }

  // Golgar unlock flash
  if (golgarUnlockFlash > 0) {
    golgarUnlockFlash--;
    ctx.save();
    ctx.globalAlpha = golgarUnlockFlash / 60 * 0.6;
    ctx.fillStyle = '#8b7ec8';
    ctx.fillRect(0, 0, 960, 540);
    ctx.globalAlpha = Math.min(1, golgarUnlockFlash / 30);
    ctx.font = 'bold 48px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#fff';
    ctx.fillText('CHALLENGER UNLOCKED', 480, 270);
    ctx.restore();
  }

  // Corvida unlock flash
  if (corvidaUnlockFlash > 0) {
    corvidaUnlockFlash--;
    ctx.save();
    ctx.globalAlpha = corvidaUnlockFlash / 60 * 0.6;
    ctx.fillStyle = '#4a90d9';
    ctx.fillRect(0, 0, 960, 540);
    ctx.globalAlpha = Math.min(1, corvidaUnlockFlash / 30);
    ctx.font = 'bold 48px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#fff';
    ctx.fillText('CHALLENGER UNLOCKED', 480, 270);
    ctx.restore();
  }

  // Duplaire unlock flash
  if (duplaireUnlockFlash > 0) {
    duplaireUnlockFlash--;
    ctx.save();
    ctx.globalAlpha = duplaireUnlockFlash / 60 * 0.6;
    ctx.fillStyle = '#8bcc66';
    ctx.fillRect(0, 0, 960, 540);
    ctx.globalAlpha = Math.min(1, duplaireUnlockFlash / 30);
    ctx.font = 'bold 48px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#000';
    ctx.fillText('CHALLENGER UNLOCKED', 480, 270);
    ctx.restore();
  }

  // Bozollok unlock flash
  if (bozollokUnlockFlash > 0) {
    bozollokUnlockFlash--;
    ctx.save();
    ctx.globalAlpha = bozollokUnlockFlash / 60 * 0.6;
    ctx.fillStyle = '#c8a030';
    ctx.fillRect(0, 0, 960, 540);
    ctx.globalAlpha = Math.min(1, bozollokUnlockFlash / 30);
    ctx.font = 'bold 48px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#000';
    ctx.fillText('CHALLENGER UNLOCKED', 480, 270);
    ctx.restore();
  }

  // Gourmand unlock flash
  if (gourmandUnlockFlash > 0) {
    gourmandUnlockFlash--;
    ctx.save();
    ctx.globalAlpha = gourmandUnlockFlash / 60 * 0.6;
    ctx.fillStyle = '#e8a852';
    ctx.fillRect(0, 0, 960, 540);
    ctx.globalAlpha = Math.min(1, gourmandUnlockFlash / 30);
    ctx.font = 'bold 48px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#000';
    ctx.fillText('CHALLENGER UNLOCKED', 480, 270);
    ctx.restore();
  }

  if (batschUnlockFlash > 0) {
    batschUnlockFlash--;
    ctx.save();
    ctx.globalAlpha = batschUnlockFlash / 60 * 0.6;
    ctx.fillStyle = '#c4a55a';
    ctx.fillRect(0, 0, 960, 540);
    ctx.globalAlpha = Math.min(1, batschUnlockFlash / 30);
    ctx.font = 'bold 48px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#000';
    ctx.fillText('CHALLENGER UNLOCKED', 480, 270);
    ctx.restore();
  }

  if (paletapUnlockFlash > 0) {
    paletapUnlockFlash--;
    ctx.save();
    ctx.globalAlpha = paletapUnlockFlash / 60 * 0.6;
    ctx.fillStyle = '#f0f0f0';
    ctx.fillRect(0, 0, 960, 540);
    ctx.globalAlpha = Math.min(1, paletapUnlockFlash / 30);
    ctx.font = 'bold 48px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#000';
    ctx.fillText('CHALLENGER UNLOCKED', 480, 270);
    ctx.restore();
  }

  if (matadorUnlockFlash > 0) {
    matadorUnlockFlash--;
    ctx.save();
    ctx.globalAlpha = matadorUnlockFlash / 60 * 0.6;
    ctx.fillStyle = '#ff2222';
    ctx.fillRect(0, 0, 960, 540);
    ctx.globalAlpha = Math.min(1, matadorUnlockFlash / 30);
    ctx.font = 'bold 48px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#000';
    ctx.fillText('CHALLENGER UNLOCKED', 480, 270);
    ctx.restore();
  }

  if (killawattUnlockFlash > 0) {
    killawattUnlockFlash--;
    ctx.save();
    ctx.globalAlpha = killawattUnlockFlash / 60 * 0.6;
    ctx.fillStyle = '#00e5ff';
    ctx.fillRect(0, 0, 960, 540);
    ctx.globalAlpha = Math.min(1, killawattUnlockFlash / 30);
    ctx.font = 'bold 48px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#000';
    ctx.fillText('CHALLENGER UNLOCKED', 480, 270);
    ctx.restore();
  }

  if (backtrackUnlockFlash > 0) {
    backtrackUnlockFlash--;
    ctx.save();
    ctx.globalAlpha = backtrackUnlockFlash / 60 * 0.6;
    ctx.fillStyle = '#b44dff';
    ctx.fillRect(0, 0, 960, 540);
    ctx.globalAlpha = Math.min(1, backtrackUnlockFlash / 30);
    ctx.font = 'bold 48px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#000';
    ctx.fillText('CHALLENGER UNLOCKED', 480, 270);
    ctx.restore();
  }

  if (exorUnlockFlash > 0) {
    exorUnlockFlash--;
    ctx.save();
    ctx.globalAlpha = exorUnlockFlash / 60 * 0.6;
    ctx.fillStyle = '#39ff14';
    ctx.fillRect(0, 0, 960, 540);
    ctx.globalAlpha = Math.min(1, exorUnlockFlash / 30);
    ctx.font = 'bold 48px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#000';
    ctx.fillText('CHALLENGER UNLOCKED', 480, 270);
    ctx.restore();
  }

  if (buckUnlockFlash > 0) {
    buckUnlockFlash--;
    ctx.save();
    ctx.globalAlpha = buckUnlockFlash / 60 * 0.6;
    ctx.fillStyle = '#cc0000';
    ctx.fillRect(0, 0, 960, 540);
    ctx.globalAlpha = Math.min(1, buckUnlockFlash / 30);
    ctx.font = 'bold 48px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#fff';
    ctx.fillText('CHALLENGER UNLOCKED', 480, 270);
    ctx.restore();
  }
  if (vorticeUnlockFlash > 0) {
    vorticeUnlockFlash--;
    ctx.save();
    ctx.globalAlpha = vorticeUnlockFlash / 60 * 0.6;
    ctx.fillStyle = '#4a6a5a';
    ctx.fillRect(0, 0, 960, 540);
    ctx.globalAlpha = Math.min(1, vorticeUnlockFlash / 30);
    ctx.font = 'bold 48px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#fff';
    ctx.fillText('CHALLENGER UNLOCKED', 480, 270);
    ctx.restore();
  }
  if (xhaustUnlockFlash > 0) {
    xhaustUnlockFlash--;
    ctx.save();
    ctx.globalAlpha = xhaustUnlockFlash / 60 * 0.6;
    ctx.fillStyle = '#5a5a5a';
    ctx.fillRect(0, 0, 960, 540);
    ctx.globalAlpha = Math.min(1, xhaustUnlockFlash / 30);
    ctx.font = 'bold 48px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#fff';
    ctx.fillText('CHALLENGER UNLOCKED', 480, 270);
    ctx.restore();
  }

  // Master passkey flash
  if (masterUnlockFlash > 0) {
    masterUnlockFlash--;
    ctx.save();
    ctx.globalAlpha = masterUnlockFlash / 60 * 0.6;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, 960, 540);
    ctx.globalAlpha = Math.min(1, masterUnlockFlash / 30);
    ctx.font = 'bold 48px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#000';
    ctx.fillText('MASTER PASSKEY ACTIVATED', 480, 270);
    ctx.restore();
  }

  // Lottery animation overlay
  if (lotteryActive && (lotteryType === 'char' || lotteryType === 'cpu')) {
    drawLotteryOverlay();
  }
}

function drawAssistSelectScreen() {
  ctx.fillStyle = '#0a0a1a';
  ctx.fillRect(0, 0, 960, 540);

  ctx.font = 'bold 36px Arial';
  ctx.textAlign = 'center';
  ctx.fillStyle = '#ff6b35';
  ctx.fillText(selectingCPUAssist ? 'SELECT CPU ASSIST' : 'SELECT YOUR ASSIST', 480, 50);

  ctx.font = '16px Arial';
  ctx.fillStyle = '#888';
  if (gameMode === 'practice') {
    ctx.fillText(`${selectedPlayer.name} - Practice Mode`, 480, 80);
  } else if (selectingCPUAssist) {
    const pAssistName = selectedAssist.name;
    ctx.fillText(`${selectedPlayer.name} (${pAssistName}) vs ${selectedCPU.name}`, 480, 80);
  } else {
    ctx.fillText(`${selectedPlayer.name} vs ${selectedCPU.name}`, 480, 80);
  }
  // Player & CPU icons in corners
  drawPortraitIcon(selectedPlayer.name, 30, 30, 22);
  ctx.font = '11px Arial';
  ctx.textAlign = 'left';
  ctx.fillStyle = selectedPlayer.accent;
  ctx.fillText(selectedPlayer.name, 48, 34);
  if (selectedCPU) {
    drawPortraitIcon(selectedCPU.name, 930, 30, 22);
    ctx.font = '11px Arial';
    ctx.textAlign = 'right';
    ctx.fillStyle = selectedCPU.accent;
    ctx.fillText(selectedCPU.name, 912, 34);
  }

  const activeCursor = selectingCPUAssist ? cpuAssistCursor : assistCursor;

  // Assist cards (including RANDOM) with scrolling
  const assistSlots = assists.length + 1;
  const cardSpacing = 180;
  const maxVisible = 5;
  // Center the view on the active cursor
  const scrollOffset = activeCursor - Math.floor(maxVisible / 2);
  const clampedScroll = Math.max(0, Math.min(scrollOffset, assistSlots - maxVisible));
  const visibleStart = assistSlots <= maxVisible ? 0 : clampedScroll;
  const visibleEnd = assistSlots <= maxVisible ? assistSlots : Math.min(visibleStart + maxVisible, assistSlots);
  const visibleCount = visibleEnd - visibleStart;
  const startX = 480 - ((visibleCount - 1) * cardSpacing) / 2;

  // Draw scroll arrows
  if (visibleStart > 0) {
    ctx.font = 'bold 28px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#888';
    ctx.fillText('\u25C0', startX - 110, 225);
  }
  if (visibleEnd < assistSlots) {
    const lastX = startX + (visibleCount - 1) * cardSpacing;
    ctx.font = 'bold 28px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#888';
    ctx.fillText('\u25B6', lastX + 110, 225);
  }

  for (let vi = 0; vi < visibleCount; vi++) {
    const i = visibleStart + vi;
    const x = startX + vi * cardSpacing;
    const y = 220;
    const selected = i === activeCursor;
    // Show P1 label on player's chosen assist when selecting CPU assist
    let label = null;
    if (selectingCPUAssist && i < assists.length && assists[i] === selectedAssist) label = 'P1';
    if (selectingCPUAssist && i === assists.length) {
      // check if player picked random (selectedAssist won't match the RANDOM slot)
    }

    ctx.save();
    ctx.translate(x, y);

    if (i < assists.length) {
      if (selected) {
        ctx.shadowColor = assists[i].color;
        ctx.shadowBlur = 20;
      }

      ctx.fillStyle = selected ? '#2a2a4a' : '#1a1a2a';
      ctx.strokeStyle = selected ? assists[i].accent : '#333';
      ctx.lineWidth = selected ? 3 : 1;
      ctx.beginPath();
      ctx.roundRect(-70, -60, 140, 140, 10);
      ctx.fill();
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Orb
      const pulse = selected ? Math.sin(Date.now() * 0.005) * 5 : 0;
      ctx.fillStyle = assists[i].color;
      ctx.beginPath();
      ctx.arc(0, -15, 25 + pulse, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = assists[i].accent;
      ctx.beginPath();
      ctx.arc(0, -15, 12 + pulse * 0.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.font = 'bold 16px Arial';
      ctx.textAlign = 'center';
      ctx.fillStyle = selected ? '#fff' : '#888';
      ctx.fillText(assists[i].name, 0, 55);

      ctx.font = '11px Arial';
      ctx.fillStyle = selected ? assists[i].accent : '#666';
      ctx.fillText(assists[i].type, 0, 72);

      if (label) {
        ctx.font = 'bold 10px Arial';
        ctx.fillStyle = assists[i].accent;
        ctx.fillText(label, 0, -68);
      }
    } else {
      // RANDOM card
      if (selected) {
        ctx.shadowColor = '#ffd700';
        ctx.shadowBlur = 20;
      }

      ctx.fillStyle = selected ? '#2a2a3a' : '#1a1a2a';
      ctx.strokeStyle = selected ? '#ffd700' : '#333';
      ctx.lineWidth = selected ? 3 : 1;
      ctx.beginPath();
      ctx.roundRect(-70, -60, 140, 140, 10);
      ctx.fill();
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Question mark
      const pulse = selected ? Math.sin(Date.now() * 0.005) * 5 : 0;
      ctx.font = `bold ${40 + pulse}px Arial`;
      ctx.textAlign = 'center';
      ctx.fillStyle = selected ? '#ffd700' : '#666';
      ctx.fillText('?', 0, -2);

      ctx.font = 'bold 16px Arial';
      ctx.fillStyle = selected ? '#fff' : '#888';
      ctx.fillText('RANDOM', 0, 55);

      ctx.font = '11px Arial';
      ctx.fillStyle = selected ? '#ffd700' : '#666';
      ctx.fillText('Surprise!', 0, 72);
    }

    ctx.restore();
  }

  // Selected assist info
  const isRandomAssist = activeCursor >= assists.length;
  if (isRandomAssist) {
    ctx.font = 'bold 24px Arial';
    ctx.fillStyle = '#ffd700';
    ctx.textAlign = 'center';
    ctx.fillText('RANDOM', 480, 340);
    ctx.font = '16px Arial';
    ctx.fillStyle = '#aaa';
    ctx.fillText('Pick a random assist', 480, 365);
  } else {
    const current = assists[activeCursor];
    ctx.font = 'bold 24px Arial';
    ctx.fillStyle = current.accent;
    ctx.textAlign = 'center';
    ctx.fillText(current.name, 480, 340);

    ctx.font = '16px Arial';
    ctx.fillStyle = '#aaa';
    ctx.fillText(current.desc, 480, 365);

    ctx.font = '14px Arial';
    ctx.fillStyle = '#888';
    ctx.fillText(`Damage: ${current.damage} | Cooldown: ${(current.cooldownTime / 60).toFixed(1)}s`, 480, 390);
  }

  ctx.font = '14px Arial';
  ctx.fillStyle = '#555';
  ctx.fillText('LEFT/RIGHT to browse | ENTER to select' + (selectingCPUAssist ? ' | ESC to go back' : ''), 480, 520);

  // Lottery animation overlay
  if (lotteryActive && (lotteryType === 'assist' || lotteryType === 'cpuAssist')) {
    drawLotteryOverlay();
  }

  // Assist unlock flashes
  const assistFlashes = [
    { timer: () => bojAssistUnlockFlash, dec: () => bojAssistUnlockFlash--, bg: '#22aa22', fg: '#66ff66' },
    { timer: () => weedthornUnlockFlash, dec: () => weedthornUnlockFlash--, bg: '#2d8a4e', fg: '#5ee87a' },
    { timer: () => jazzAssistUnlockFlash, dec: () => jazzAssistUnlockFlash--, bg: '#e6a800', fg: '#ffe066' },
    { timer: () => cyanoAssistUnlockFlash, dec: () => cyanoAssistUnlockFlash--, bg: '#4488cc', fg: '#88ccff' },
    { timer: () => warperAssistUnlockFlash, dec: () => warperAssistUnlockFlash--, bg: '#9933cc', fg: '#cc88ff' },
    { timer: () => aphidAssistUnlockFlash, dec: () => aphidAssistUnlockFlash--, bg: '#555555', fg: '#aaaaaa' },
    { timer: () => studAssistUnlockFlash, dec: () => studAssistUnlockFlash--, bg: '#6b5a3a', fg: '#c4a55a' },
    { timer: () => floatAssistUnlockFlash, dec: () => floatAssistUnlockFlash--, bg: '#ff99cc', fg: '#ffccee' },
    { timer: () => stickerAssistUnlockFlash, dec: () => stickerAssistUnlockFlash--, bg: '#cc8800', fg: '#ffbb33' },
    { timer: () => serpentAssistUnlockFlash, dec: () => serpentAssistUnlockFlash--, bg: '#336633', fg: '#66cc66' },
  ];
  for (const af of assistFlashes) {
    const t = af.timer();
    if (t > 0) {
      af.dec();
      ctx.save();
      ctx.globalAlpha = t / 60 * 0.6;
      ctx.fillStyle = af.bg;
      ctx.fillRect(0, 0, 960, 540);
      ctx.globalAlpha = Math.min(1, t / 30);
      ctx.font = 'bold 48px Arial';
      ctx.textAlign = 'center';
      ctx.fillStyle = af.fg;
      ctx.fillText('ASSIST UNLOCKED', 480, 270);
      ctx.restore();
    }
  }

  // Master passkey flash
  if (masterUnlockFlash > 0) {
    masterUnlockFlash--;
    ctx.save();
    ctx.globalAlpha = masterUnlockFlash / 60 * 0.6;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, 960, 540);
    ctx.globalAlpha = Math.min(1, masterUnlockFlash / 30);
    ctx.font = 'bold 48px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#000';
    ctx.fillText('MASTER PASSKEY ACTIVATED', 480, 270);
    ctx.restore();
  }
}

function drawDifficultySelectScreen() {
  ctx.fillStyle = '#0a0a1a';
  ctx.fillRect(0, 0, 960, 540);

  ctx.font = 'bold 36px Arial';
  ctx.textAlign = 'center';
  ctx.fillStyle = '#ff6b35';
  ctx.fillText('SELECT DIFFICULTY', 480, 50);

  ctx.font = '16px Arial';
  ctx.fillStyle = '#888';
  ctx.fillText(`${selectedPlayer.name} vs ${selectedCPU.name}`, 480, 80);
  // Player & CPU icons
  drawPortraitIcon(selectedPlayer.name, 30, 30, 22);
  ctx.font = '11px Arial';
  ctx.textAlign = 'left';
  ctx.fillStyle = selectedPlayer.accent;
  ctx.fillText(selectedPlayer.name, 48, 34);
  drawPortraitIcon(selectedCPU.name, 930, 30, 22);
  ctx.font = '11px Arial';
  ctx.textAlign = 'right';
  ctx.fillStyle = selectedCPU.accent;
  ctx.fillText(selectedCPU.name, 912, 34);

  // Difficulty cards
  const startX = 480 - ((difficulties.length - 1) * 200) / 2;
  for (let i = 0; i < difficulties.length; i++) {
    const x = startX + i * 200;
    const y = 230;
    const selected = i === difficultyCursor;
    const diff = difficulties[i];

    ctx.save();
    ctx.translate(x, y);

    if (selected) {
      ctx.shadowColor = diff.color;
      ctx.shadowBlur = 20;
    }

    ctx.fillStyle = selected ? '#2a2a4a' : '#1a1a2a';
    ctx.strokeStyle = selected ? diff.accent : '#333';
    ctx.lineWidth = selected ? 3 : 1;
    ctx.beginPath();
    ctx.roundRect(-80, -70, 160, 150, 10);
    ctx.fill();
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Difficulty icon (skulls / stars)
    const pulse = selected ? Math.sin(Date.now() * 0.005) * 3 : 0;
    const icons = i + 1; // 1-4 icons
    const iconSpacing = 22;
    const iconStartX = -((icons - 1) * iconSpacing) / 2;
    for (let j = 0; j < icons; j++) {
      ctx.fillStyle = selected ? diff.color : '#555';
      ctx.font = `${18 + pulse}px Arial`;
      ctx.textAlign = 'center';
      ctx.fillText('\u2605', iconStartX + j * iconSpacing, -15);
    }

    ctx.font = 'bold 18px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = selected ? '#fff' : '#888';
    ctx.fillText(diff.name, 0, 30);

    // Thin colored bar
    ctx.fillStyle = selected ? diff.color : '#444';
    ctx.fillRect(-40, 40, 80, 3);

    ctx.restore();
  }

  // Selected difficulty info
  const current = difficulties[difficultyCursor];
  ctx.font = 'bold 24px Arial';
  ctx.fillStyle = current.accent;
  ctx.textAlign = 'center';
  ctx.fillText(current.name, 480, 370);

  ctx.font = '16px Arial';
  ctx.fillStyle = '#aaa';
  ctx.fillText(current.desc, 480, 400);

  // Stat preview
  const barLabels = ['Reaction', 'Aggression', 'Blocking', 'Damage'];
  const barValues = [
    1 - (current.reactMin / 40),
    current.attackChance,
    current.blockChance / 0.5,
    current.damageMult / 1.5
  ];
  for (let i = 0; i < 4; i++) {
    const sx = 360;
    const sy = 425 + i * 22;
    ctx.font = '12px Arial';
    ctx.textAlign = 'right';
    ctx.fillStyle = '#888';
    ctx.fillText(barLabels[i], sx, sy + 10);
    ctx.fillStyle = '#333';
    ctx.fillRect(sx + 10, sy, 200, 12);
    ctx.fillStyle = current.color;
    ctx.fillRect(sx + 10, sy, 200 * Math.min(barValues[i], 1), 12);
    ctx.strokeStyle = '#555';
    ctx.lineWidth = 1;
    ctx.strokeRect(sx + 10, sy, 200, 12);
  }

  ctx.font = '14px Arial';
  ctx.fillStyle = '#555';
  ctx.fillText('LEFT/RIGHT to browse | ENTER to select | ESC to go back', 480, 530);
}

function drawPauseOverlay() {
  ctx.fillStyle = 'rgba(0,0,0,0.8)';
  ctx.fillRect(0, 0, 960, 540);

  ctx.font = 'bold 42px Arial';
  ctx.textAlign = 'center';
  ctx.fillStyle = '#ff6b35';
  ctx.fillText('PAUSED', 480, 55);

  // Left column: Controls
  ctx.font = 'bold 18px Arial';
  ctx.textAlign = 'center';
  ctx.fillStyle = '#ccc';
  ctx.fillText('CONTROLS', 240, 100);

  const controls = [
    ['Movement', 'Arrows / WASD'],
    ['Jump', 'Up / W'],
    ['Crouch', 'Down / S'],
    ['Block', 'Q / Walk Back'],
    ['Jab', 'Z'],
    ['Uppercut', 'X'],
    ['Low Kick', 'C'],
    ['High Kick', 'V'],
    ['Assist', 'B'],
    ['Pause', 'Space'],
    ['Quit', 'Escape'],
    ...(gameMode === 'practice' ? [['Reset ' + (selectedCPU.isMannequin ? 'Mannequin' : selectedCPU.isDrone ? 'Drone' : 'Bag'), 'M']] : [])
  ];

  ctx.font = '13px Arial';
  for (let i = 0; i < controls.length; i++) {
    const y = 130 + i * 26;
    ctx.textAlign = 'right';
    ctx.fillStyle = '#bbb';
    ctx.fillText(controls[i][0], 220, y);
    ctx.textAlign = 'left';
    ctx.fillStyle = '#ff6b35';
    ctx.fillText(controls[i][1], 250, y);
  }

  // Right column: Rumble move (during finishHim) or Combo Moves (during fight)
  if (gameState === 'finishHim') {
    const winChar = winner === 'player' ? selectedPlayer : selectedCPU;
    const rumbleEntry = characterRumbles[winChar.name];
    const rumbleList = rumbleEntry ? (Array.isArray(rumbleEntry) ? rumbleEntry : [rumbleEntry]) : [];

    ctx.font = 'bold 18px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#ff2222';
    ctx.fillText(rumbleList.length > 1 ? 'RUMBLES' : 'RUMBLE', 700, 100);

    if (rumbleList.length > 0 && winner === 'player') {
      let yOffset = 130;
      for (let ri = 0; ri < rumbleList.length; ri++) {
        const rumble = rumbleList[ri];
        // Rumble move name
        ctx.font = 'bold 15px Arial';
        ctx.textAlign = 'left';
        ctx.fillStyle = winChar.accent;
        ctx.fillText(rumble.name, 540, yOffset);

        // Code key caps
        const codeLetters = rumble.code.toUpperCase().split('');
        for (let k = 0; k < codeLetters.length; k++) {
          const kx = 555 + k * 38;
          const ky = yOffset + 28;
          ctx.fillStyle = '#333';
          ctx.strokeStyle = '#777';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.roundRect(kx - 13, ky - 13, 26, 26, 5);
          ctx.fill();
          ctx.stroke();
          ctx.font = 'bold 14px Arial';
          ctx.textAlign = 'center';
          ctx.fillStyle = '#fff';
          ctx.fillText(codeLetters[k], kx, ky + 5);
        }

        // Description
        ctx.font = '12px Arial';
        ctx.textAlign = 'left';
        ctx.fillStyle = '#aaa';
        ctx.fillText(rumble.desc, 543, yOffset + 60);

        // Effect color dot
        ctx.fillStyle = winChar.accent;
        ctx.shadowColor = winChar.accent;
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(535, yOffset + 56, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        yOffset += 90;
      }
    } else {
      ctx.font = '13px Arial';
      ctx.textAlign = 'center';
      ctx.fillStyle = '#666';
      ctx.fillText('No rumble available', 700, 150);
    }
  } else {
  ctx.font = 'bold 18px Arial';
  ctx.textAlign = 'center';
  ctx.fillStyle = selectedPlayer.accent;
  const hasSpecialAbility = selectedPlayer.isBojdo || selectedPlayer.isRubberman || selectedPlayer.isTorrena || selectedPlayer.isSnazz || selectedPlayer.isHaystack || selectedPlayer.isCodemax || selectedPlayer.isCorvida || selectedPlayer.isGolgar || selectedPlayer.isTelatrine || selectedPlayer.isDuplaire || selectedPlayer.isBozollok || selectedPlayer.isGourmand || selectedPlayer.isBatsch || selectedPlayer.isPaletap || selectedPlayer.isMatador || selectedPlayer.isKillawatt || selectedPlayer.isBacktrack || selectedPlayer.isExor || selectedPlayer.isBuck;
  ctx.fillText(`${selectedPlayer.name} ${hasSpecialAbility ? 'ABILITIES' : 'COMBOS'}`, 700, 100);

  const combos = characterCombos[selectedPlayer.name];
  if (combos) {
    for (let c = 0; c < combos.length; c++) {
      const combo = combos[c];
      const baseY = 135 + c * 130;

      // Combo name
      ctx.font = 'bold 16px Arial';
      ctx.textAlign = 'left';
      ctx.fillStyle = selectedPlayer.accent;
      ctx.fillText(combo.name, 540, baseY);

      // Key sequence with styled key caps
      const keyMap = { jab: 'Z', lowKick: 'C', uppercut: 'X', highKick: 'V' };
      for (let k = 0; k < combo.sequence.length; k++) {
        const kx = 555 + k * 55;
        const ky = baseY + 25;
        // Key cap
        ctx.fillStyle = '#333';
        ctx.strokeStyle = '#777';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.roundRect(kx - 14, ky - 14, 28, 28, 5);
        ctx.fill();
        ctx.stroke();
        ctx.font = 'bold 15px Arial';
        ctx.textAlign = 'center';
        ctx.fillStyle = '#fff';
        ctx.fillText(keyMap[combo.sequence[k]], kx, ky + 5);

        // Arrow between keys
        if (k < combo.sequence.length - 1) {
          ctx.font = '14px Arial';
          ctx.fillStyle = '#666';
          ctx.fillText('>', kx + 24, ky + 4);
        }
      }

      // Description
      ctx.font = '13px Arial';
      ctx.textAlign = 'left';
      ctx.fillStyle = '#aaa';
      ctx.fillText(combo.desc, 543, baseY + 60);

      // Effect color dot
      ctx.fillStyle = combo.effectColor;
      ctx.shadowColor = combo.effectColor;
      ctx.shadowBlur = 6;
      ctx.beginPath();
      ctx.arc(535, baseY + 56, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  // Special abilities for characters without combos
  if (selectedPlayer.isBojdo) {
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'left';
    ctx.fillStyle = selectedPlayer.accent;
    ctx.fillText('SIZE SHIFTING', 540, 135);

    const abilities = [
      ['K', 'Hold to grow bigger'],
      ['L', 'Hold to shrink smaller'],
    ];
    const details = [
      'Bigger = more power, range & defense',
      'Smaller = faster movement speed',
    ];
    for (let a = 0; a < abilities.length; a++) {
      const ay = 160 + a * 70;
      // Key cap
      ctx.fillStyle = '#333';
      ctx.strokeStyle = '#777';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(541, ay - 14, 28, 28, 5);
      ctx.fill();
      ctx.stroke();
      ctx.font = 'bold 15px Arial';
      ctx.textAlign = 'center';
      ctx.fillStyle = '#fff';
      ctx.fillText(abilities[a][0], 555, ay + 5);
      ctx.font = '13px Arial';
      ctx.textAlign = 'left';
      ctx.fillStyle = '#aaa';
      ctx.fillText(abilities[a][1], 580, ay + 5);
      ctx.fillStyle = '#888';
      ctx.fillText(details[a], 543, ay + 25);
    }
  }

  if (selectedPlayer.isRubberman) {
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'left';
    ctx.fillStyle = selectedPlayer.accent;
    ctx.fillText('RUBBER STRETCH', 540, 135);

    const ay = 160;
    ctx.font = '13px Arial';
    ctx.textAlign = 'left';
    ctx.fillStyle = '#aaa';
    ctx.fillText('Passive ability', 543, ay + 5);

    const tips = [
      'Attacks stretch to reach the opponent',
      'Range extends up to half the screen',
      'Damage decreases with distance',
    ];
    for (let t = 0; t < tips.length; t++) {
      ctx.fillStyle = '#888';
      ctx.fillText(tips[t], 543, ay + 28 + t * 18);
    }
  }

  if (selectedPlayer.isTorrena) {
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'left';
    ctx.fillStyle = selectedPlayer.accent;
    ctx.fillText('WATER PHASE', 540, 135);

    const ay = 160;
    // Key cap
    ctx.fillStyle = '#333';
    ctx.strokeStyle = '#777';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(541, ay - 14, 28, 28, 5);
    ctx.fill();
    ctx.stroke();
    ctx.font = 'bold 15px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#fff';
    ctx.fillText('H', 555, ay + 5);
    ctx.font = '13px Arial';
    ctx.textAlign = 'left';
    ctx.fillStyle = '#aaa';
    ctx.fillText('Toggle Water Phase', 580, ay + 5);

    const tips = [
      'Become pure water - pass through opponent',
      'Immune to all damage while active',
      'Cannot attack while in Water Phase',
    ];
    for (let t = 0; t < tips.length; t++) {
      ctx.fillStyle = '#888';
      ctx.fillText(tips[t], 543, ay + 28 + t * 18);
    }
  }

  if (selectedPlayer.isSnazz) {
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'left';
    ctx.fillStyle = selectedPlayer.accent;
    ctx.fillText('JAZZ DANCE', 540, 135);

    const ay = 160;
    // Key cap
    ctx.fillStyle = '#333';
    ctx.strokeStyle = '#777';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(541, ay - 14, 28, 28, 5);
    ctx.fill();
    ctx.stroke();
    ctx.font = 'bold 15px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#fff';
    ctx.fillText('J', 555, ay + 5);
    ctx.font = '13px Arial';
    ctx.textAlign = 'left';
    ctx.fillStyle = '#aaa';
    ctx.fillText('Start dancing (2s)', 580, ay + 5);

    const tips = [
      'Complete the dance to heal 25 HP',
      'Getting hit during dance = 2x damage',
      'Cannot move or attack while dancing',
    ];
    for (let t = 0; t < tips.length; t++) {
      ctx.fillStyle = '#888';
      ctx.fillText(tips[t], 543, ay + 28 + t * 18);
    }
  }

  if (selectedPlayer.isHaystack) {
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'left';
    ctx.fillStyle = selectedPlayer.accent;
    ctx.fillText('HAY EXPLOSION', 540, 135);

    const ay = 160;
    // Key cap
    ctx.fillStyle = '#333';
    ctx.strokeStyle = '#777';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(541, ay - 14, 28, 28, 5);
    ctx.fill();
    ctx.stroke();
    ctx.font = 'bold 15px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#fff';
    ctx.fillText('F', 555, ay + 5);
    ctx.font = '13px Arial';
    ctx.textAlign = 'left';
    ctx.fillStyle = '#aaa';
    ctx.fillText('Explode into projectiles', 580, ay + 5);

    const tips = [
      'Arrows fly in all directions',
      'Sword flies randomly for extra damage',
      'Takes 1 second to reform',
    ];
    for (let t = 0; t < tips.length; t++) {
      ctx.fillStyle = '#888';
      ctx.fillText(tips[t], 543, ay + 28 + t * 18);
    }
  }

  if (selectedPlayer.isCodemax) {
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'left';
    ctx.fillStyle = selectedPlayer.accent;
    ctx.fillText('CODE PORT', 540, 135);

    const ay = 160;
    // Key cap
    ctx.fillStyle = '#333';
    ctx.strokeStyle = '#777';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(541, ay - 14, 28, 28, 5);
    ctx.fill();
    ctx.stroke();
    ctx.font = 'bold 15px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#fff';
    ctx.fillText('N', 555, ay + 5);
    ctx.font = '13px Arial';
    ctx.textAlign = 'left';
    ctx.fillStyle = '#aaa';
    ctx.fillText('Swap positions', 580, ay + 5);

    const tips = [
      'Teleport and switch places with foe',
      '3 second cooldown between swaps',
      'Glitch effect on both fighters',
    ];
    for (let t = 0; t < tips.length; t++) {
      ctx.fillStyle = '#888';
      ctx.fillText(tips[t], 543, ay + 28 + t * 18);
    }
  }

  if (selectedPlayer.isCorvida) {
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'left';
    ctx.fillStyle = selectedPlayer.accent;
    ctx.fillText('BLUE JAY FORM', 540, 135);

    const ay = 160;
    // Key cap
    ctx.fillStyle = '#333';
    ctx.strokeStyle = '#777';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(541, ay - 14, 28, 28, 5);
    ctx.fill();
    ctx.stroke();
    ctx.font = 'bold 15px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#fff';
    ctx.fillText('\u2191\u2191', 555, ay + 5);
    ctx.font = '13px Arial';
    ctx.textAlign = 'left';
    ctx.fillStyle = '#aaa';
    ctx.fillText('Double-press jump', 580, ay + 5);

    const tips = [
      'Transform into a blue jay mid-air',
      'Fly freely, land to revert to normal',
      'Beak attacks are much weaker',
    ];
    for (let t = 0; t < tips.length; t++) {
      ctx.fillStyle = '#888';
      ctx.fillText(tips[t], 543, ay + 28 + t * 18);
    }
  }

  if (selectedPlayer.isGolgar) {
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'left';
    ctx.fillStyle = selectedPlayer.accent;
    ctx.fillText('SOUL SWAP', 540, 135);

    const ay = 160;
    // Key cap
    ctx.fillStyle = '#333';
    ctx.strokeStyle = '#777';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(541, ay - 14, 28, 28, 5);
    ctx.fill();
    ctx.stroke();
    ctx.font = 'bold 15px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#fff';
    ctx.fillText('G', 555, ay + 5);
    ctx.font = '13px Arial';
    ctx.textAlign = 'left';
    ctx.fillStyle = '#aaa';
    ctx.fillText('Switch entities', 580, ay + 5);

    const tips = [
      'Two bodies share one soul',
      'Dormant entity becomes a statue',
      'Switch to the other wherever it was left',
    ];
    for (let t = 0; t < tips.length; t++) {
      ctx.fillStyle = '#888';
      ctx.fillText(tips[t], 543, ay + 28 + t * 18);
    }
  }

  if (selectedPlayer.isTelatrine) {
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'left';
    ctx.fillStyle = selectedPlayer.accent;
    ctx.fillText('WARP WALK', 540, 135);

    const ay = 160;
    ctx.font = '13px Arial';
    ctx.textAlign = 'left';
    ctx.fillStyle = '#aaa';
    ctx.fillText('Passive ability', 543, ay + 5);

    const tips = [
      'Walk past the edge of the stage',
      'Reappear on the opposite side',
      'Works like a warp tunnel',
    ];
    for (let t = 0; t < tips.length; t++) {
      ctx.fillStyle = '#888';
      ctx.fillText(tips[t], 543, ay + 28 + t * 18);
    }
  }

  if (selectedPlayer.isDuplaire) {
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'left';
    ctx.fillStyle = selectedPlayer.accent;
    ctx.fillText('CLONE ARMY', 540, 135);

    const ay = 160;
    ctx.font = '13px Arial';
    ctx.textAlign = 'left';
    ctx.fillStyle = '#aaa';
    ctx.fillText('Press K to create a clone', 543, ay + 5);

    const tips = [
      'Clones take 3 seconds to activate',
      'Up to 6 clones can be created',
      'Damage and health are split among all bodies',
      'Health bar shows sections for each clone',
    ];
    for (let t = 0; t < tips.length; t++) {
      ctx.fillStyle = '#888';
      ctx.fillText(tips[t], 543, ay + 28 + t * 18);
    }
  }

  if (selectedPlayer.isBozollok) {
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'left';
    ctx.fillStyle = selectedPlayer.accent;
    ctx.fillText('SKIN SHED', 540, 135);

    const ay = 160;
    ctx.font = '13px Arial';
    ctx.textAlign = 'left';
    ctx.fillStyle = '#aaa';
    ctx.fillText('Press H to molt', 543, ay + 5);

    const tips = [
      'Leap high out of your skin',
      'Hover briefly at the apex',
      'Descend with claw attack on nearby foes',
      'Leaves a decomposing husk behind',
    ];
    for (let t = 0; t < tips.length; t++) {
      ctx.fillStyle = '#888';
      ctx.fillText(tips[t], 543, ay + 28 + t * 18);
    }
  }

  if (selectedPlayer.isGourmand) {
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'left';
    ctx.fillStyle = selectedPlayer.accent;
    ctx.fillText('ENERGY ABSORB', 540, 135);

    const abilities = [
      ['L', 'Open mouth to absorb damage'],
      ['P', 'Shoot stored energy ball'],
    ];
    const details = [
      'Incoming hits charge energy instead',
      'Damage equals energy stored (up to 80)',
    ];
    for (let a = 0; a < abilities.length; a++) {
      const ay = 160 + a * 70;
      ctx.fillStyle = '#333';
      ctx.strokeStyle = '#777';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(541, ay - 14, 28, 28, 5);
      ctx.fill();
      ctx.stroke();
      ctx.font = 'bold 15px Arial';
      ctx.textAlign = 'center';
      ctx.fillStyle = '#fff';
      ctx.fillText(abilities[a][0], 555, ay + 5);
      ctx.font = '13px Arial';
      ctx.textAlign = 'left';
      ctx.fillStyle = '#aaa';
      ctx.fillText(abilities[a][1], 580, ay + 5);
      ctx.fillStyle = '#888';
      ctx.fillText(details[a], 543, ay + 25);
    }
  }

  if (selectedPlayer.isBatsch) {
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'left';
    ctx.fillStyle = selectedPlayer.accent;
    ctx.fillText('TORTOISE FORM', 540, 135);

    const ay = 160;
    ctx.fillStyle = '#333';
    ctx.strokeStyle = '#777';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(541, ay - 14, 28, 28, 5);
    ctx.fill();
    ctx.stroke();
    ctx.font = 'bold 15px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#fff';
    ctx.fillText('\u2193\u2193', 555, ay + 5);
    ctx.font = '13px Arial';
    ctx.textAlign = 'left';
    ctx.fillStyle = '#aaa';
    ctx.fillText('Double-tap crouch', 580, ay + 5);

    const tips = [
      'Retreat into a protective shell',
      'Takes 60% less damage while transformed',
      'Movement speed reduced to half',
      'Jump to exit tortoise form',
    ];
    for (let t = 0; t < tips.length; t++) {
      ctx.fillStyle = '#888';
      ctx.fillText(tips[t], 543, ay + 28 + t * 18);
    }
  }

  if (selectedPlayer.isPaletap) {
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'left';
    ctx.fillStyle = selectedPlayer.accent;
    ctx.fillText('GROUND SLAM', 540, 135);

    const ay = 160;
    ctx.fillStyle = '#333';
    ctx.strokeStyle = '#777';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(541, ay - 14, 28, 28, 5);
    ctx.fill();
    ctx.stroke();
    ctx.font = 'bold 15px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#fff';
    ctx.fillText('K', 555, ay + 5);
    ctx.font = '13px Arial';
    ctx.textAlign = 'left';
    ctx.fillStyle = '#aaa';
    ctx.fillText('Slam the ground', 580, ay + 5);

    const tips = [
      'Sends a shockwave along the ground',
      'Hits grounded opponents, misses crouchers',
      'Cannot move during the slam',
    ];
    for (let t = 0; t < tips.length; t++) {
      ctx.fillStyle = '#888';
      ctx.fillText(tips[t], 543, ay + 28 + t * 18);
    }
  }

  if (selectedPlayer.isMatador) {
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'left';
    ctx.fillStyle = selectedPlayer.accent;
    ctx.fillText('ESTOQUE DASH', 540, 135);

    const ay = 160;
    ctx.fillStyle = '#333';
    ctx.strokeStyle = '#777';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(541, ay - 14, 28, 28, 5);
    ctx.fill();
    ctx.stroke();
    ctx.font = 'bold 15px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#fff';
    ctx.fillText('O', 555, ay + 5);
    ctx.font = '13px Arial';
    ctx.textAlign = 'left';
    ctx.fillStyle = '#aaa';
    ctx.fillText('Dash through and slash', 580, ay + 5);

    const tips = [
      'Dash through the opponent at high speed',
      'Slashes with estoque as you pass',
      '1.5 second cooldown between dashes',
    ];
    for (let t = 0; t < tips.length; t++) {
      ctx.fillStyle = '#888';
      ctx.fillText(tips[t], 543, ay + 28 + t * 18);
    }
  }

  if (selectedPlayer.isKillawatt) {
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'left';
    ctx.fillStyle = selectedPlayer.accent;
    ctx.fillText('VOLT ZAP', 540, 135);

    const ay = 160;
    ctx.fillStyle = '#333';
    ctx.strokeStyle = '#777';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(541, ay - 14, 28, 28, 5);
    ctx.fill();
    ctx.stroke();
    ctx.font = 'bold 15px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#fff';
    ctx.fillText('K', 555, ay + 5);
    ctx.font = '13px Arial';
    ctx.textAlign = 'left';
    ctx.fillStyle = '#aaa';
    ctx.fillText('Zap foe, stun & damage', 580, ay + 5);

    const tips = [
      'Electrocute opponent when in range',
      'Stuns them briefly, unable to move or attack',
      'They vibrate as electricity crackles through',
    ];
    for (let t = 0; t < tips.length; t++) {
      ctx.fillStyle = '#888';
      ctx.fillText(tips[t], 543, ay + 28 + t * 18);
    }
  }

  if (selectedPlayer.isBacktrack) {
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'left';
    ctx.fillStyle = selectedPlayer.accent;
    ctx.fillText('TIME REWIND', 540, 135);

    const ay = 160;
    ctx.fillStyle = '#333';
    ctx.strokeStyle = '#777';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(541, ay - 14, 28, 28, 5);
    ctx.fill();
    ctx.stroke();
    ctx.font = 'bold 15px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#fff';
    ctx.fillText('J', 555, ay + 5);
    ctx.font = '13px Arial';
    ctx.textAlign = 'left';
    ctx.fillStyle = '#aaa';
    ctx.fillText('Rewind time 8 seconds', 580, ay + 5);

    const tips = [
      'Reverts health & positions of both fighters',
      'Affects you and your opponent equally',
      '10 second cooldown between rewinds',
    ];
    for (let t = 0; t < tips.length; t++) {
      ctx.fillStyle = '#888';
      ctx.fillText(tips[t], 543, ay + 28 + t * 18);
    }
  }

  if (selectedPlayer.isExor) {
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'left';
    ctx.fillStyle = selectedPlayer.accent;
    ctx.fillText('SOUL DRAIN', 540, 135);

    const ay = 160;
    ctx.fillStyle = '#333';
    ctx.strokeStyle = '#777';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(541, ay - 14, 28, 28, 5);
    ctx.fill();
    ctx.stroke();
    ctx.font = 'bold 15px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#fff';
    ctx.fillText('N', 555, ay + 5);
    ctx.font = '13px Arial';
    ctx.textAlign = 'left';
    ctx.fillStyle = '#aaa';
    ctx.fillText('Steal HP, slow opponent', 580, ay + 5);

    const tips = [
      'Drains life force from opponent at close range',
      'Heals Exor while damaging the foe',
      'Opponent is slowed while being drained',
      'Breaks if they escape too far',
    ];
    for (let t = 0; t < tips.length; t++) {
      ctx.fillStyle = '#888';
      ctx.fillText(tips[t], 543, ay + 28 + t * 18);
    }
  }

  if (selectedPlayer.isBuck) {
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'left';
    ctx.fillStyle = selectedPlayer.accent;
    ctx.fillText('FIREWORK SPRAY', 540, 135);

    const ay = 160;
    ctx.fillStyle = '#333';
    ctx.strokeStyle = '#777';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(541, ay - 14, 28, 28, 5);
    ctx.fill();
    ctx.stroke();
    ctx.font = 'bold 15px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#fff';
    ctx.fillText('L', 555, ay + 5);
    ctx.font = '13px Arial';
    ctx.textAlign = 'left';
    ctx.fillStyle = '#aaa';
    ctx.fillText('Spray exploding fireworks', 580, ay + 5);

    const tips = [
      'Rapidly fires red, white & blue fireworks',
      'Aim drifts between upward and forward',
      'Fireworks explode on contact',
      'Lasts 6 seconds, 8 second cooldown',
    ];
    for (let t = 0; t < tips.length; t++) {
      ctx.fillStyle = '#888';
      ctx.fillText(tips[t], 543, ay + 28 + t * 18);
    }
  }

  if (selectedPlayer.isVortice) {
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'left';
    ctx.fillStyle = selectedPlayer.accent;
    ctx.fillText('TORNADO', 540, 135);

    const abilities = [
      ['H', 'Hold to pull opponent in'],
      ['J', 'Press to blast opponent away'],
    ];
    const details = [
      'Summons a vortex that drags foes closer',
      'Reverses the tornado to launch foes far',
    ];
    for (let a = 0; a < abilities.length; a++) {
      const ay = 160 + a * 70;
      ctx.fillStyle = '#333';
      ctx.strokeStyle = '#777';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(541, ay - 14, 28, 28, 5);
      ctx.fill();
      ctx.stroke();
      ctx.font = 'bold 15px Arial';
      ctx.textAlign = 'center';
      ctx.fillStyle = '#fff';
      ctx.fillText(abilities[a][0], 555, ay + 5);
      ctx.font = '13px Arial';
      ctx.textAlign = 'left';
      ctx.fillStyle = '#aaa';
      ctx.fillText(abilities[a][1], 580, ay + 5);
      ctx.fillStyle = '#888';
      ctx.fillText(details[a], 543, ay + 25);
    }
  }

  if (selectedPlayer.isXhaust) {
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'left';
    ctx.fillStyle = selectedPlayer.accent;
    ctx.fillText('OIL IGNITE', 540, 135);

    const abilities = [
      ['L', 'Hold to leak oil trail'],
      ['K', 'Press to ignite all oil'],
    ];
    const details = [
      'Drains tank to leave oil on the ground',
      'Burns foes standing on the oil',
    ];
    for (let a = 0; a < abilities.length; a++) {
      const ay = 160 + a * 70;
      ctx.fillStyle = '#333';
      ctx.strokeStyle = '#777';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(541, ay - 14, 28, 28, 5);
      ctx.fill();
      ctx.stroke();
      ctx.font = 'bold 15px Arial';
      ctx.textAlign = 'center';
      ctx.fillStyle = '#fff';
      ctx.fillText(abilities[a][0], 555, ay + 5);
      ctx.font = '13px Arial';
      ctx.textAlign = 'left';
      ctx.fillStyle = '#aaa';
      ctx.fillText(abilities[a][1], 580, ay + 5);
      ctx.fillStyle = '#888';
      ctx.fillText(details[a], 543, ay + 25);
    }

    ctx.fillStyle = '#888';
    ctx.fillText('Tank fills by landing hits on opponent', 543, 320);
  }
  } // end else (fight state combos/abilities)

  // Divider
  ctx.strokeStyle = '#333';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(480, 90);
  ctx.lineTo(480, 430);
  ctx.stroke();

  ctx.font = '14px Arial';
  ctx.textAlign = 'center';
  ctx.fillStyle = '#666';
  ctx.fillText('Press SPACE to resume', 480, 510);
}

function drawVictoryScreen() {
  ctx.fillStyle = 'rgba(0,0,0,0.6)';
  ctx.fillRect(0, 0, 960, 540);

  const winnerChar = winner === 'player' ? selectedPlayer : selectedCPU;
  const label = winner === 'player' ? 'YOU WIN!' : 'CPU WINS!';

  ctx.font = 'bold 64px Arial';
  ctx.textAlign = 'center';

  // Glow
  ctx.shadowColor = winnerChar.accent;
  ctx.shadowBlur = 30;
  ctx.fillStyle = winnerChar.accent;
  ctx.fillText(label, 480, 220);
  ctx.shadowBlur = 0;

  ctx.font = 'bold 36px Arial';
  ctx.fillStyle = winnerChar.color;
  ctx.fillText(winnerChar.name, 480, 280);

  ctx.font = '20px Arial';
  ctx.fillStyle = '#aaa';
  if (gameMode === 'rumblePractice') {
    ctx.fillText('Press ENTER to retry', 480, 380);
    ctx.font = '14px Arial';
    ctx.fillStyle = '#666';
    ctx.fillText('Press ESC to return to title', 480, 410);
  } else {
    ctx.fillText('Press ENTER to return to title', 480, 380);
  }
}

// --- MAIN LOOP ---
function update() {
  // Lottery animation update
  if (lotteryActive) {
    lotteryTimer++;
    const progress = lotteryTimer / lotteryDuration;
    // Speed decreases as progress increases: fast at start, slow near end
    const interval = Math.max(2, Math.floor(2 + progress * progress * 20));
    const isChar = lotteryType === 'char' || lotteryType === 'cpu';
    const isLevel = lotteryType === 'level';
    const pool = isLevel ? getLevels() : (isChar ? characters : assists);
    if (lotteryTimer % interval === 0) {
      // Cycle to a random different index
      let next;
      do { next = Math.floor(Math.random() * pool.length); } while (next === lotteryCurrent && pool.length > 1);
      lotteryCurrent = next;
    }
    if (lotteryTimer >= lotteryDuration) {
      lotteryCurrent = lotteryFinal;
    }
    if (lotteryTimer >= lotteryDuration + 30) {
      lotteryActive = false;
      if (lotteryCallback) lotteryCallback();
      lotteryCallback = null;
    }
  }

  if (gameState === 'fight' && !paused && !winner) {
    frameCount++;
    // Screen shake
    if (shakeTimer > 0) shakeTimer--;

    player.update(cpu, keys);
    cpu.update(player, {});

    // Push apart if overlapping (skip if water phase or Matador dashing)
    const matadorDashing = player.matadorDashing || cpu.matadorDashing;
    if (!player.waterPhase && !cpu.waterPhase && !matadorDashing) {
      // Allow jumping over: skip push-apart only when one fighter is high enough above the other
      // Paletap: so tall that opponents must crouch under his legs instead of jumping over
      const paletapInvolved = player.char.isPaletap || cpu.char.isPaletap;
      const crouchingUnder = paletapInvolved && (
        (cpu.char.isPaletap && player.crouching && player.grounded) ||
        (player.char.isPaletap && cpu.crouching && cpu.grounded)
      );
      const jumpingOver = (!player.grounded && player.y < cpu.y - 50) || (!cpu.grounded && cpu.y < player.y - 50);
      if (!jumpingOver && !crouchingUnder) {
        const overlap = 40 - Math.abs(player.x - cpu.x);
        if (overlap > 0) {
          const push = overlap / 2 + 0.5;
          if (player.x < cpu.x) {
            player.x -= push;
            cpu.x += push;
          } else {
            player.x += push;
            cpu.x -= push;
          }
        }
      }
    }


    // Check victory (not in practice mode)
    if (gameMode !== 'practice') {
      if (player.health <= 0 || cpu.health <= 0) {
        winner = player.health <= 0 ? 'cpu' : 'player';
        finishHimTimer = 0;
        gameState = 'finishHim';
        stopFightMusic();
        // Clear hit effects, projectiles, and particles on both fighters
        for (const f of [player, cpu]) {
          f.hitEffect = null;
          f.assistActive = null;
          f.queuedAttacks = [];
          f.inputBuffer = [];
          f.aiComboQueue = [];
          f.haystackProjectiles = [];
          f.hayParticles = [];
          f.buckFireworks = [];
          f.buckExplosions = [];
          f.exorSoulParticles = [];
          f.matadorRoses = [];
          f.xhaustFlames = [];
          f.vorticeTornadoParticles = [];
          f.state = f === (winner === 'player' ? cpu : player) ? 'idle' : f.state;
          if (f.assistFighter) f.assistFighter = null;
        }
        // Set loser to idle
        const loseFighter = winner === 'player' ? cpu : player;
        loseFighter.state = 'idle';
      }
    }
  }

  // Finish Him phase: winner can still move, loser is passive
  if (gameState === 'finishHim' && !paused) {
    const winFighter = winner === 'player' ? player : cpu;
    const loseFighter = winner === 'player' ? cpu : player;

    if (rumbleActive) {
      // Rumble animation is playing — timer stops, fighters freeze
      rumbleTimer++;
      if (shakeTimer > 0) shakeTimer--;

      if (rumbleType === 'BLAZE') {
        // Blaze Scorched Earth: 210 frames total
        // 0-30: pillar rises, 30-120: full blaze, 120-150: fade, 150-170: ashes settle, 170-210: pause on ashes
        if (rumbleTimer >= 10 && rumbleTimer <= 120) {
          shakeTimer = 2;
          shakeIntensity = rumbleTimer < 30 ? 3 : 5;
        }
        if (rumbleTimer >= 30) {
          rumbleLoserHidden = true;
        }
        if (rumbleTimer >= 150 && !rumbleAshes) {
          rumbleAshes = { x: loseFighter.x, y: loseFighter.groundY };
        }
        if (rumbleTimer >= 210) {
          gameState = 'victory';
        }
        // Winner idles during Blaze rumble
        winFighter.vx = 0;
        winFighter.state = 'idle';
      }

      if (rumbleType === 'ARTIK') {
        // Artik Oppsicle: 270 frames total
        // 0-40: freeze solid (ice overlay intensifies)
        // 40-140: Artik walks toward opponent
        // 140-155: Artik winds up punch
        // 155-165: Punch connects, shatter, screen shake
        // 165-270: shards fly and settle
        const freezeEnd = 40;
        const walkEnd = 140;
        const windupEnd = 155;
        const punchFrame = 158;
        const shatterEnd = 165;
        const endFrame = 270;

        if (rumbleTimer <= freezeEnd) {
          // Freeze phase — loser gets frozen visual
          loseFighter.frozenTimer = 999;
          winFighter.vx = 0;
          winFighter.state = 'idle';
        } else if (rumbleTimer <= walkEnd) {
          // Walk toward opponent
          const dir = loseFighter.x > winFighter.x ? 1 : -1;
          const dist = Math.abs(winFighter.x - loseFighter.x);
          winFighter.facing = dir;
          if (dist > 50) {
            winFighter.vx = dir * 2.5;
            winFighter.x += winFighter.vx;
            winFighter.state = 'walk';
          } else {
            winFighter.vx = 0;
            winFighter.state = 'idle';
          }
        } else if (rumbleTimer <= windupEnd) {
          // Wind up — face opponent, idle
          winFighter.vx = 0;
          winFighter.facing = loseFighter.x > winFighter.x ? 1 : -1;
          winFighter.state = 'idle';
        } else if (rumbleTimer <= shatterEnd) {
          // Punch!
          winFighter.vx = 0;
          winFighter.state = 'attack';
          if (rumbleTimer === punchFrame && rumbleIceShards.length === 0) {
            // Shatter — spawn ice shards from loser's body
            rumbleLoserHidden = true;
            loseFighter.frozenTimer = 0;
            shakeTimer = 15;
            shakeIntensity = 8;
            const sx = loseFighter.x;
            const sy = loseFighter.y - 30; // center of body
            for (let i = 0; i < 24; i++) {
              const angle = (Math.random() * Math.PI * 2);
              const speed = 2 + Math.random() * 6;
              rumbleIceShards.push({
                x: sx + (Math.random() - 0.5) * 30,
                y: sy + (Math.random() - 0.5) * 60,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed - 3,
                size: 3 + Math.random() * 8,
                rot: Math.random() * Math.PI * 2,
                rotSpeed: (Math.random() - 0.5) * 0.3,
                alpha: 1,
                color: ['#aaeeff', '#ccf0ff', '#88ccee', '#ffffff', '#66bbdd'][Math.floor(Math.random() * 5)]
              });
            }
          }
        } else {
          // Shards flying and fading
          winFighter.vx = 0;
          winFighter.state = 'idle';
        }

        // Update ice shards
        for (const s of rumbleIceShards) {
          s.x += s.vx;
          s.y += s.vy;
          s.vy += 0.15; // gravity
          s.rot += s.rotSpeed;
          s.vx *= 0.98;
          // Fade out in last phase
          if (rumbleTimer > 200) {
            s.alpha = Math.max(0, s.alpha - 0.012);
          }
          // Bounce off ground
          if (s.y > loseFighter.groundY) {
            s.y = loseFighter.groundY;
            s.vy *= -0.4;
            s.vx *= 0.7;
          }
        }

        if (rumbleTimer >= endFrame) {
          gameState = 'victory';
        }
      }

      if (rumbleType === 'VENOM') {
        // Venom You've Been Pardoned: 270 frames total
        // 0-30: Venom faces opponent, winds up spit
        // 30-31: Launch acid blob projectile
        // 31-??: Blob flies toward opponent (variable, depends on distance)
        // impact: splash, opponent starts melting
        // impact+120: fully melted Wicked Witch style
        // last 90 frames: goo puddle bubbles
        const spitFrame = 30;
        const endFrame = 330;

        const dir = loseFighter.x > winFighter.x ? 1 : -1;
        winFighter.facing = dir;
        winFighter.vx = 0;

        if (rumbleTimer < spitFrame) {
          // Wind up
          winFighter.state = 'idle';
        } else if (rumbleTimer === spitFrame) {
          // Spit blob
          winFighter.state = 'attack';
          rumbleAcidBlob = {
            x: winFighter.x + dir * 25,
            y: winFighter.y - 35,
            vx: dir * 7,
            vy: -2
          };
        } else if (rumbleAcidBlob) {
          // Blob in flight
          winFighter.state = 'idle';
          rumbleAcidBlob.x += rumbleAcidBlob.vx;
          rumbleAcidBlob.y += rumbleAcidBlob.vy;
          rumbleAcidBlob.vy += 0.12; // gravity arc

          // Check if blob reached opponent
          if (Math.abs(rumbleAcidBlob.x - loseFighter.x) < 25 && Math.abs(rumbleAcidBlob.y - loseFighter.y + 20) < 50) {
            // Impact — spawn splashes
            for (let i = 0; i < 16; i++) {
              const angle = Math.random() * Math.PI * 2;
              const speed = 1 + Math.random() * 4;
              rumbleAcidSplashes.push({
                x: loseFighter.x + (Math.random() - 0.5) * 20,
                y: loseFighter.y - 20 + (Math.random() - 0.5) * 30,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed - 2,
                size: 2 + Math.random() * 4,
                alpha: 1,
                color: ['#44cc00', '#33aa00', '#66dd22', '#88ee44', '#22aa00'][Math.floor(Math.random() * 5)]
              });
            }
            rumbleAcidBlob = null;
            shakeTimer = 10;
            shakeIntensity = 4;
          }
        } else {
          // Post-impact: Wicked Witch melting phase
          winFighter.state = 'idle';
          if (!rumbleLoserHidden) {
            if (!rumbleGoo) {
              rumbleGoo = { x: loseFighter.x, y: loseFighter.groundY, meltTimer: 0 };
            }
            rumbleGoo.meltTimer++;
            rumbleVenomMeltPct = Math.min(1, rumbleGoo.meltTimer / 120); // slower melt over 120 frames

            // Spawn drips from the body as it melts
            if (rumbleGoo.meltTimer % 3 === 0 && rumbleVenomMeltPct < 0.95) {
              const bodyTop = loseFighter.y - 60 * (1 - rumbleVenomMeltPct);
              const bodyBot = loseFighter.groundY;
              const dripY = bodyTop + Math.random() * (bodyBot - bodyTop) * 0.6;
              const side = Math.random() > 0.5 ? 1 : -1;
              rumbleVenomDrips.push({
                x: loseFighter.x + side * (8 + Math.random() * 14),
                y: dripY,
                vx: side * (0.2 + Math.random() * 0.5),
                vy: 0.5 + Math.random() * 1.5,
                size: 2 + Math.random() * 3,
                alpha: 0.8 + Math.random() * 0.2,
                color: ['#44cc00', '#33aa00', '#66dd22', '#228800'][Math.floor(Math.random() * 4)]
              });
            }

            if (rumbleGoo.meltTimer >= 120) {
              rumbleLoserHidden = true;
            }
          }
        }

        // Update drips and remove dead ones
        for (let i = rumbleVenomDrips.length - 1; i >= 0; i--) {
          const d = rumbleVenomDrips[i];
          d.x += d.vx;
          d.y += d.vy;
          d.vy += 0.15;
          if (d.y >= loseFighter.groundY) {
            d.y = loseFighter.groundY;
            d.vy = 0;
            d.vx = 0;
            d.alpha = Math.max(0, d.alpha - 0.02);
          }
          if (d.alpha <= 0) rumbleVenomDrips.splice(i, 1);
        }

        // Update acid splashes
        for (const s of rumbleAcidSplashes) {
          s.x += s.vx;
          s.y += s.vy;
          s.vy += 0.1;
          s.vx *= 0.97;
          if (s.y > loseFighter.groundY) {
            s.y = loseFighter.groundY;
            s.vy = 0;
            s.vx *= 0.5;
          }
          if (rumbleTimer > 200) {
            s.alpha = Math.max(0, s.alpha - 0.015);
          }
        }

        if (rumbleTimer >= endFrame) {
          gameState = 'victory';
        }
      }

      if (rumbleType === 'SURGE') {
        // Surge Mr. Electric Boom: 300 frames total
        // 0-30: Surge raises hands, faces opponent
        // 30-120: Electricity beam connects, opponent overcharges (glows brighter)
        // 120-130: Screen goes white, opponent explodes
        // 130-300: Beautiful light particles expand and fade
        const zapStart = 30;
        const zapEnd = 120;
        const explodeFrame = 125;
        const endFrame = 300;

        const dir = loseFighter.x > winFighter.x ? 1 : -1;
        winFighter.facing = dir;
        winFighter.vx = 0;

        if (rumbleTimer < zapStart) {
          winFighter.state = 'idle';
        } else if (rumbleTimer < zapEnd) {
          // Zapping phase
          winFighter.state = 'attack';
          rumbleZapActive = true;
          // Loser glows and shakes increasingly
          loseFighter.flashTimer = 2;
        } else if (rumbleTimer === explodeFrame) {
          // Explosion!
          rumbleZapActive = false;
          rumbleLoserHidden = true;
          rumbleLightBurst = { x: loseFighter.x, y: loseFighter.y - 30, timer: 0 };
          shakeTimer = 25;
          shakeIntensity = 12;
          // Spawn beautiful light particles
          for (let i = 0; i < 40; i++) {
            const angle = (i / 40) * Math.PI * 2 + Math.random() * 0.3;
            const speed = 1.5 + Math.random() * 5;
            const hue = Math.floor(Math.random() * 360);
            rumbleLightParticles.push({
              x: loseFighter.x,
              y: loseFighter.y - 30,
              vx: Math.cos(angle) * speed,
              vy: Math.sin(angle) * speed - 1,
              size: 3 + Math.random() * 7,
              alpha: 1,
              hue: hue,
              glow: 10 + Math.random() * 20,
              decay: 0.003 + Math.random() * 0.004
            });
          }
        } else {
          winFighter.state = 'idle';
          rumbleZapActive = false;
        }

        // Update light burst
        if (rumbleLightBurst) {
          rumbleLightBurst.timer++;
        }

        // Update light particles
        for (const p of rumbleLightParticles) {
          p.x += p.vx;
          p.y += p.vy;
          p.vy += 0.03; // very light gravity
          p.vx *= 0.995;
          p.alpha = Math.max(0, p.alpha - p.decay);
        }

        if (rumbleTimer >= endFrame) {
          gameState = 'victory';
        }
      }

      if (rumbleType === 'TITAN') {
        // Titan "And what are you sinking about?": 300 frames total
        // 0-40: Titan stomps / raises fist, ground starts rumbling
        // 40-60: Sinkhole opens under opponent, dirt flies out
        // 60-180: Opponent sinks into the hole, struggling
        // 180-240: Hole closes over them
        // 240-300: Ground settles, dust clears
        const stompFrame = 30;
        const holeStart = 40;
        const sinkStart = 60;
        const sinkEnd = 180;
        const closeStart = 180;
        const closeEnd = 240;
        const endFrame = 300;

        const dir = loseFighter.x > winFighter.x ? 1 : -1;
        winFighter.facing = dir;
        winFighter.vx = 0;

        if (rumbleTimer < stompFrame) {
          winFighter.state = 'idle';
        } else if (rumbleTimer === stompFrame) {
          // Stomp!
          winFighter.state = 'attack';
          shakeTimer = 20;
          shakeIntensity = 8;
        } else if (rumbleTimer >= holeStart && rumbleTimer < sinkStart) {
          // Sinkhole opening
          winFighter.state = 'idle';
          if (!rumbleSinkhole) {
            rumbleSinkhole = {
              x: loseFighter.x,
              y: loseFighter.groundY,
              radius: 0,
              maxRadius: 55
            };
          }
          const openPct = (rumbleTimer - holeStart) / (sinkStart - holeStart);
          rumbleSinkhole.radius = rumbleSinkhole.maxRadius * openPct;

          // Spawn dirt particles as it opens
          if (rumbleTimer % 2 === 0) {
            for (let i = 0; i < 3; i++) {
              const angle = -Math.PI * Math.random();
              const speed = 2 + Math.random() * 4;
              rumbleDirtParticles.push({
                x: loseFighter.x + (Math.random() - 0.5) * 40,
                y: loseFighter.groundY - Math.random() * 5,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed - 2,
                size: 2 + Math.random() * 4,
                alpha: 1,
                color: ['#8B7355', '#6B5B3A', '#A0926B', '#554433'][Math.floor(Math.random() * 4)]
              });
            }
          }
          shakeTimer = 2;
          shakeIntensity = 3;
        } else if (rumbleTimer >= sinkStart && rumbleTimer <= sinkEnd) {
          // Opponent sinking
          winFighter.state = 'idle';
          rumbleSinkhole.radius = rumbleSinkhole.maxRadius;
          rumbleSinkProgress = Math.min(1, (rumbleTimer - sinkStart) / (sinkEnd - sinkStart));

          // Continuous small rumble
          if (rumbleTimer % 10 === 0) {
            shakeTimer = 3;
            shakeIntensity = 2;
          }

          // Occasional dirt bursts
          if (rumbleTimer % 8 === 0) {
            const angle = -Math.PI * Math.random();
            const speed = 1 + Math.random() * 3;
            rumbleDirtParticles.push({
              x: loseFighter.x + (Math.random() - 0.5) * 50,
              y: loseFighter.groundY - Math.random() * 3,
              vx: Math.cos(angle) * speed,
              vy: Math.sin(angle) * speed - 1.5,
              size: 2 + Math.random() * 3,
              alpha: 0.8,
              color: ['#8B7355', '#6B5B3A', '#A0926B'][Math.floor(Math.random() * 3)]
            });
          }

          // Hide loser once fully sunk
          if (rumbleSinkProgress >= 1) {
            rumbleLoserHidden = true;
          }
        } else if (rumbleTimer >= closeStart && rumbleTimer < closeEnd) {
          // Hole closing
          winFighter.state = 'idle';
          const closePct = (rumbleTimer - closeStart) / (closeEnd - closeStart);
          rumbleSinkhole.radius = rumbleSinkhole.maxRadius * (1 - closePct);

          if (rumbleTimer === closeStart) {
            shakeTimer = 10;
            shakeIntensity = 4;
          }
        } else if (rumbleTimer >= closeEnd) {
          // Ground settled
          winFighter.state = 'idle';
          rumbleSinkhole.radius = 0;
        }

        // Update dirt particles
        for (let i = rumbleDirtParticles.length - 1; i >= 0; i--) {
          const d = rumbleDirtParticles[i];
          d.x += d.vx;
          d.y += d.vy;
          d.vy += 0.2; // gravity
          d.vx *= 0.98;
          if (d.y > loseFighter.groundY + 5) {
            d.alpha = Math.max(0, d.alpha - 0.05);
          }
          if (d.alpha <= 0) rumbleDirtParticles.splice(i, 1);
        }

        if (rumbleTimer >= endFrame) {
          gameState = 'victory';
        }
      }

      if (rumbleType === 'SHADE') {
        // Shade "Wanted the smoke, got the smoke": 360 frames total
        // 0-30: Shade walks toward opponent
        // 30-160: Rapid martial arts combo (punches and kicks)
        // 160-170: Wind-up for final jab
        // 170-175: Final hard jab — opponent poofs into smoke
        // 175-280: Smoke dissipates, Shade brushes shoulder
        // 280-360: Pause on the cool pose
        const walkEnd = 30;
        const comboStart = 30;
        const comboEnd = 160;
        const windupEnd = 170;
        const poofFrame = 175;
        const brushStart = 290;
        const endFrame = 420;

        const dir = loseFighter.x > winFighter.x ? 1 : -1;
        winFighter.facing = dir;

        // Combo hit schedule: frame offsets from comboStart
        // Alternating punches and kicks with increasing speed
        const comboHits = [0, 15, 28, 39, 48, 56, 63, 69, 74, 79, 84, 89, 94, 99, 104, 109, 114, 118, 122, 126];

        if (rumbleTimer < walkEnd) {
          // Walk toward opponent — stop at 85px so punches/kicks are visible
          const dist = Math.abs(winFighter.x - loseFighter.x);
          if (dist > 85) {
            winFighter.vx = dir * 3;
            winFighter.x += winFighter.vx;
            winFighter.state = 'walk';
          } else {
            winFighter.vx = 0;
            winFighter.state = 'idle';
          }
        } else if (rumbleTimer >= comboStart && rumbleTimer < comboEnd) {
          // Martial arts combo
          winFighter.vx = 0;
          const comboFrame = rumbleTimer - comboStart;

          // Check if this frame is a hit frame
          const hitIndex = comboHits.indexOf(comboFrame);
          if (hitIndex !== -1) {
            rumbleShadeComboHit = hitIndex + 1;
            winFighter.state = 'attack';
            // Cycle through attack types so the animation shows different moves
            const moveOrder = [attacks.jab, attacks.lowKick, attacks.uppercut, attacks.highKick];
            winFighter.currentAttack = moveOrder[hitIndex % moveOrder.length];
            winFighter.attackFrame = 0;
            // Small screen shake on each hit
            shakeTimer = 3;
            shakeIntensity = 2 + Math.floor(hitIndex / 5);
            // Flash the loser
            loseFighter.flashTimer = 4;
          } else {
            // Between hits — advance the attack animation frame
            if (winFighter.state === 'attack' && winFighter.currentAttack) {
              winFighter.attackFrame++;
              const total = winFighter.currentAttack.startup + winFighter.currentAttack.active + winFighter.currentAttack.recovery;
              if (winFighter.attackFrame >= total) {
                winFighter.state = 'idle';
                winFighter.currentAttack = null;
                winFighter.attackFrame = 0;
              }
            }
          }
        } else if (rumbleTimer >= comboEnd && rumbleTimer < windupEnd) {
          // Wind-up for final jab
          winFighter.vx = 0;
          winFighter.state = 'idle';
        } else if (rumbleTimer === poofFrame) {
          // Final hard jab — opponent turns to smoke!
          winFighter.state = 'attack';
          winFighter.currentAttack = attacks.jab;
          winFighter.attackFrame = 0;
          shakeTimer = 15;
          shakeIntensity = 10;
          rumbleShadePoof = true;
          rumbleLoserHidden = true;

          // Spawn smoke particles at opponent's position
          for (let i = 0; i < 35; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 0.5 + Math.random() * 2.5;
            rumbleSmokeParticles.push({
              x: loseFighter.x + (Math.random() - 0.5) * 30,
              y: loseFighter.y - 30 + (Math.random() - 0.5) * 40,
              vx: Math.cos(angle) * speed,
              vy: Math.sin(angle) * speed - 0.8,
              size: 8 + Math.random() * 18,
              alpha: 0.7 + Math.random() * 0.3,
              growRate: 0.3 + Math.random() * 0.5,
              shade: Math.floor(40 + Math.random() * 60)
            });
          }
        } else if (rumbleTimer > poofFrame && rumbleTimer < brushStart) {
          // Post-poof: let final jab animation finish, then idle
          winFighter.vx = 0;
          if (winFighter.state === 'attack' && winFighter.currentAttack) {
            winFighter.attackFrame++;
            const total = winFighter.currentAttack.startup + winFighter.currentAttack.active + winFighter.currentAttack.recovery;
            if (winFighter.attackFrame >= total) {
              winFighter.state = 'idle';
              winFighter.currentAttack = null;
              winFighter.attackFrame = 0;
            }
          }
        } else if (rumbleTimer >= brushStart) {
          // Brush dust off shoulder — idle pose with arm override
          winFighter.vx = 0;
          winFighter.state = 'idle';
          winFighter.currentAttack = null;
          rumbleShadeBrush = true;
          // Set brush arm progress (0 to 1 over 80 frames)
          const brushProgress = Math.min(1, (rumbleTimer - brushStart) / 80);
          winFighter._brushArmT = brushProgress;
        }

        // Update smoke particles
        for (let i = rumbleSmokeParticles.length - 1; i >= 0; i--) {
          const p = rumbleSmokeParticles[i];
          p.x += p.vx;
          p.y += p.vy;
          p.vy -= 0.02; // smoke rises
          p.vx *= 0.98;
          p.size += p.growRate; // smoke expands
          p.growRate *= 0.97; // expansion slows
          p.alpha = Math.max(0, p.alpha - 0.01);
          if (p.alpha <= 0) rumbleSmokeParticles.splice(i, 1);
        }

        if (rumbleTimer >= endFrame) {
          gameState = 'victory';
        }
      }

      if ((rumbleType === 'BOJDO' || rumbleType === 'BOJDOBOJDO') && rumbleSubType === 'pellet') {
        // Bojdo "Death from below": 300 frames total
        // 0-40: Bojdo shrinks to tiny size
        // 40-90: Tiny Bojdo scurries under the opponent
        // 90-110: Pause underneath
        // 110-180: Grows back to normal, launching opponent upward
        // 180-240: Opponent flies offscreen
        // 240-300: Bojdo stands triumphant
        const shrinkEnd = 40;
        const scurryEnd = 90;
        const pauseEnd = 110;
        const growEnd = 180;
        const endFrame = 300;

        const dir = loseFighter.x > winFighter.x ? 1 : -1;
        winFighter.facing = dir;

        if (rumbleTimer <= shrinkEnd) {
          // Shrink phase: Bojdo gets tiny
          winFighter.vx = 0;
          winFighter.state = 'idle';
          const t = rumbleTimer / shrinkEnd;
          winFighter.bojdoScale = Math.max(0.15, 1 - t * 0.85);
        } else if (rumbleTimer <= scurryEnd) {
          // Scurry phase: tiny Bojdo runs toward opponent
          winFighter.state = 'walk';
          winFighter.bojdoScale = 0.15;
          const targetX = loseFighter.x;
          const dist = targetX - winFighter.x;
          if (Math.abs(dist) > 5) {
            const speed = 4;
            winFighter.x += dist > 0 ? speed : -speed;
            winFighter.facing = dist > 0 ? 1 : -1;
          } else {
            winFighter.x = targetX;
          }
          winFighter.vx = 0;
        } else if (rumbleTimer <= pauseEnd) {
          // Pause underneath: centered under opponent
          winFighter.vx = 0;
          winFighter.x = loseFighter.x;
          winFighter.state = 'idle';
          winFighter.bojdoScale = 0.15;
        } else if (rumbleTimer <= growEnd) {
          // Grow phase: expand back to full size, pushing opponent up
          winFighter.vx = 0;
          winFighter.x = loseFighter.x;
          winFighter.state = 'idle';
          const growT = (rumbleTimer - pauseEnd) / (growEnd - pauseEnd);
          const easeGrow = growT * growT; // accelerating growth
          winFighter.bojdoScale = 0.15 + easeGrow * 0.85;

          // Push the loser upward as Bojdo grows
          if (growT < 0.8) {
            loseFighter.y = loseFighter.groundY - growT * 80;
            loseFighter.grounded = false;
          }
          // At full size, launch!
          if (rumbleTimer === growEnd) {
            rumbleBojdoLaunchVy = -18;
            shakeTimer = 15;
            shakeIntensity = 10;
          }
        } else {
          // Post-launch: opponent flies offscreen, Bojdo stands proud
          winFighter.vx = 0;
          winFighter.state = 'idle';
          winFighter.bojdoScale = 1.0;

          // Launch the loser upward — no gravity, they fly offscreen
          if (!rumbleLoserHidden) {
            loseFighter.y += rumbleBojdoLaunchVy;
            loseFighter.vy = rumbleBojdoLaunchVy; // override so gravity code doesn't pull them back
            loseFighter.grounded = false;
            if (loseFighter.y < -150) {
              rumbleLoserHidden = true;
            }
          }
        }

        if (rumbleTimer >= endFrame) {
          gameState = 'victory';
        }
      }

      if (rumbleType === 'BOJDOBOJDO' && rumbleSubType === 'massiv') {
        // Bojdobojdo "Death from above": 340 frames total
        // 0-var: Walk to opponent
        // var-var+60: Grows to gargantuan size (only bottom half visible)
        // +60-+90: Raises one leg (stomp windup)
        // +90-+100: Stomps down on opponent
        // +100-+200: Foot on ground, opponent flattened
        // +200-+260: Lifts foot, shrinks back to normal
        // +260-+300: Stands triumphant
        const walkSpeed = 3;
        const distToOpponent = Math.abs(loseFighter.x - winFighter.x);
        const walkFrames = Math.max(10, Math.ceil(distToOpponent / walkSpeed));
        const walkEnd = walkFrames;
        const growEnd2 = walkEnd + 60;
        const raiseEnd = growEnd2 + 30;
        const stompFrame = raiseEnd + 10;
        const holdEnd = stompFrame + 100;
        const shrinkEnd2 = holdEnd + 60;
        const endFrame2 = shrinkEnd2 + 40;

        const dir = loseFighter.x > winFighter.x ? 1 : -1;
        winFighter.facing = dir;
        winFighter.vx = 0;

        if (rumbleTimer <= walkEnd) {
          // Walk toward opponent
          winFighter.state = 'walk';
          const dist = loseFighter.x - winFighter.x;
          if (Math.abs(dist) > 5) {
            winFighter.x += dist > 0 ? walkSpeed : -walkSpeed;
            winFighter.facing = dist > 0 ? 1 : -1;
          } else {
            winFighter.x = loseFighter.x;
          }
        } else if (rumbleTimer <= growEnd2) {
          // Grow to gargantuan
          winFighter.state = 'idle';
          winFighter.x = loseFighter.x;
          const t = (rumbleTimer - walkEnd) / (growEnd2 - walkEnd);
          const easeT = t * t;
          winFighter.bojdoScale = 1 + easeT * 7; // grow to 8x
          if (rumbleTimer > 10) {
            shakeTimer = 2;
            shakeIntensity = 2 + t * 4;
          }
        } else if (rumbleTimer <= raiseEnd) {
          // Foot raised — we track via rumbleBojdoPhase
          winFighter.state = 'idle';
          winFighter.x = loseFighter.x;
          winFighter.bojdoScale = 8;
          rumbleBojdoPhase = 1; // signal to draw: leg raised
        } else if (rumbleTimer <= stompFrame) {
          // Stomp down!
          winFighter.state = 'idle';
          winFighter.x = loseFighter.x;
          winFighter.bojdoScale = 8;
          rumbleBojdoPhase = 2; // signal to draw: stomp
          if (rumbleTimer === stompFrame) {
            shakeTimer = 25;
            shakeIntensity = 15;
            rumbleLoserHidden = true;
          }
        } else if (rumbleTimer <= holdEnd) {
          // Hold foot down
          winFighter.state = 'idle';
          winFighter.x = loseFighter.x;
          winFighter.bojdoScale = 8;
          rumbleBojdoPhase = 2;
        } else if (rumbleTimer <= shrinkEnd2) {
          // Shrink back to normal
          winFighter.state = 'idle';
          rumbleBojdoPhase = 0;
          const t = (rumbleTimer - holdEnd) / (shrinkEnd2 - holdEnd);
          winFighter.bojdoScale = 8 - t * 7; // back to 1
        } else {
          // Stand triumphant
          winFighter.state = 'idle';
          winFighter.bojdoScale = 1;
          rumbleBojdoPhase = 0;
        }

        if (rumbleTimer >= endFrame2) {
          gameState = 'victory';
        }
      }

      if (rumbleType === 'RUBBERMAN') {
        // Rubberman "Tetherball": 360 frames total
        // 0-30: Rubberman reaches out and grabs opponent
        // 30-240: Swings opponent back and forth, slamming into ground
        // 240-260: Winds up for final overhead smash
        // 260-270: Final smash into ground
        // 270-360: Opponent stuck in cracked ground, Rubberman retracts arm
        const grabEnd = 30;
        const swingEnd = 150;
        const windupEnd = 170;
        const smashFrame = 180;
        const endFrame = 280;
        const numSwings = 6;

        winFighter.vx = 0;

        // On first frame, store the fixed grab distance and direction
        if (rumbleTimer === 1) {
          rumbleTetherGrabX = Math.abs(loseFighter.x - winFighter.x);
          winFighter.facing = loseFighter.x > winFighter.x ? 1 : -1;
        }
        const dir = winFighter.facing;
        const pivotX = winFighter.x;
        const groundY = loseFighter.groundY;
        const armLen = Math.max(80, rumbleTetherGrabX);

        // Hide the fighter's normal front arm — the custom stretchy arm replaces it
        winFighter._hideFrontArm = true;

        if (rumbleTimer <= grabEnd) {
          // Reach out and grab
          winFighter.state = 'attack';
        } else if (rumbleTimer <= swingEnd) {
          // Swinging phase
          winFighter.state = 'walk'; // walk anim makes him look active/braced
          const swingTime = rumbleTimer - grabEnd;
          const swingDuration = swingEnd - grabEnd;

          const progress = swingTime / swingDuration;
          const swingAngle = progress * numSwings * Math.PI;
          rumbleTetherAngle = swingAngle;

          // Opponent on semicircular arc, grounded at extremes
          loseFighter.x = pivotX + Math.cos(swingAngle) * armLen;
          loseFighter.y = groundY - Math.abs(Math.sin(swingAngle)) * armLen;
          loseFighter.grounded = false;

          // Rotate opponent to follow the arc — body trails behind the swing direction
          // The tangent angle of the arc gives the direction of travel
          const sinA = Math.sin(swingAngle);
          const cosA = Math.cos(swingAngle);
          // Rotation: head points outward along the arc
          loseFighter._rumbleRotation = -swingAngle + Math.PI / 2;

          // Detect ground slams
          const prevSwingAngle = ((swingTime - 1) / swingDuration) * numSwings * Math.PI;
          if (Math.floor(swingAngle / Math.PI) !== Math.floor(prevSwingAngle / Math.PI) && swingTime > 3) {
            rumbleTetherSlams++;
            shakeTimer = 8;
            shakeIntensity = 5 + rumbleTetherSlams * 2;
            loseFighter.y = groundY;
          }

          // Rubberman leans into the swing
          winFighter.facing = cosA > 0 ? 1 : -1;
        } else if (rumbleTimer <= windupEnd) {
          // Wind up — smoothly arc opponent from last swing position to overhead
          winFighter.state = 'idle';
          winFighter.facing = dir;
          const windupDur = windupEnd - swingEnd;
          const t = (rumbleTimer - swingEnd) / windupDur;
          const ease = t * t; // ease in

          // Starting position: where swing ended (last swing angle)
          const finalSwingAngle = numSwings * Math.PI;
          const startX = pivotX + Math.cos(finalSwingAngle) * armLen;
          const startY = groundY - Math.abs(Math.sin(finalSwingAngle)) * armLen;
          // End position: directly overhead
          const endX = pivotX;
          const endY = groundY - armLen;

          // Arc upward via an intermediate high point
          loseFighter.x = startX + (endX - startX) * ease;
          // Use a smooth arc — go up first then settle overhead
          loseFighter.y = startY + (endY - startY) * ease - Math.sin(t * Math.PI) * 30;
          loseFighter.grounded = false;

          // Smoothly rotate from last swing rotation to upside down (PI)
          const lastSwingRot = -finalSwingAngle + Math.PI / 2;
          // Normalize to closest equivalent of PI
          const targetRot = Math.PI;
          loseFighter._rumbleRotation = lastSwingRot + (targetRot - lastSwingRot) * ease;
        } else if (rumbleTimer <= smashFrame) {
          // Final smash — arc from overhead down to the ground at a distance
          winFighter.state = 'attack';
          winFighter.facing = dir;
          const smashDist = Math.min(armLen * 0.8, 200); // land further out
          const smashDur = smashFrame - windupEnd;
          const t = (rumbleTimer - windupEnd) / smashDur;

          // Start: overhead (pivotX, groundY - armLen)
          const startX = pivotX;
          const startY = groundY - armLen;
          // End: on the ground further out
          const endX = pivotX + dir * smashDist;
          const endY = groundY;

          // Smooth arc down: x moves linearly, y uses cubic ease for impact feel
          loseFighter.x = startX + (endX - startX) * t;
          loseFighter.y = startY + (endY - startY) * t * t * t;
          loseFighter.grounded = false;

          // Rotate from upside down (PI) to face-down (PI/2)
          loseFighter._rumbleRotation = Math.PI * (1 - t * 0.5);

          if (rumbleTimer === smashFrame) {
            shakeTimer = 25;
            shakeIntensity = 15;
            rumbleTetherCracked = true;
            rumbleTetherGrabX = loseFighter.x; // store final smash X for draw
            loseFighter.y = groundY;
          }
        } else {
          // Retract, opponent face-down in cracked ground
          winFighter.state = 'idle';
          winFighter.facing = dir;
          winFighter._hideFrontArm = false;
          const smashX = rumbleTetherGrabX; // stored from smash impact
          loseFighter.x = smashX;
          loseFighter.y = groundY;
          loseFighter.grounded = true;
          loseFighter._rumbleRotation = 0;
          if (!rumbleLoserHidden) {
            rumbleLoserHidden = true;
          }
        }

        if (rumbleTimer >= endFrame) {
          winFighter._hideFrontArm = false;
          gameState = 'victory';
        }
      }

      if (rumbleType === 'GOLGAR') {
        // Golgar "You Must Be Double Dead!": ~340 frames
        // 0-40: Second entity walks to other side of opponent
        // 40-70: Both entities grab opponent's arms
        // 70-120: Wind up — pull opponent back together
        // 120-140: Swing forward and release — launch!
        // 140-200: Opponent flies diagonally into the sky
        // 200-280: Both entities face each other and high-five
        // 280-340: Settle
        const walkEnd = 40;
        const grabEnd = 70;
        const windupEnd = 120;
        const launchFrame = 135;
        const flyEnd = 200;
        const highFiveStart = 220;
        const highFiveHit = 250;
        const endFrame = 340;

        const dir = loseFighter.x > winFighter.x ? 1 : -1;
        winFighter.facing = dir;
        winFighter.vx = 0;

        if (!rumbleGolgarEntity2) {
          // Initialize on first frame
          rumbleGolgarEntity2 = {
            x: winFighter.golgarOtherX,
            y: winFighter.golgarOtherY || winFighter.y,
            facing: -dir
          };
          rumbleGolgarPhase = 0;
          rumbleGolgarLaunchVy = 0;
          rumbleGolgarOpX = loseFighter.x; // store opponent position once
        }

        const e2 = rumbleGolgarEntity2;
        // Target positions: one on each side of opponent (fixed from start)
        const entity1TargetX = rumbleGolgarOpX - dir * 45;
        const entity2TargetX = rumbleGolgarOpX + dir * 45;

        if (rumbleTimer <= walkEnd) {
          // Both entities walk toward opponent from each side
          rumbleGolgarPhase = 0;
          winFighter.x += (entity1TargetX - winFighter.x) * 0.08;
          e2.x += (entity2TargetX - e2.x) * 0.08;
          e2.y = winFighter.groundY;
          e2.facing = -dir;
          winFighter.state = 'idle';
        } else if (rumbleTimer <= grabEnd) {
          // Grab opponent's arms — both face inward
          rumbleGolgarPhase = 1;
          winFighter.x += (entity1TargetX - winFighter.x) * 0.15;
          e2.x += (entity2TargetX - e2.x) * 0.15;
          winFighter.facing = dir;
          e2.facing = -dir;
          winFighter.state = 'idle';
          loseFighter.state = 'hitstun';
        } else if (rumbleTimer <= windupEnd) {
          // Wind up — both step back together (away from launch direction), pulling opponent
          rumbleGolgarPhase = 2;
          const t = (rumbleTimer - grabEnd) / (windupEnd - grabEnd);
          const pullBack = Math.sin(t * Math.PI * 0.5) * 50; // pull back away from launch dir
          winFighter.x = entity1TargetX - dir * pullBack;
          e2.x = entity2TargetX - dir * pullBack;
          // Opponent follows between them
          loseFighter.x = (winFighter.x + e2.x) / 2;
          loseFighter.y = winFighter.groundY;
          winFighter.state = 'idle';
        } else if (rumbleTimer <= launchFrame) {
          // Swing forward and release — both lunge forward together
          rumbleGolgarPhase = 3;
          const t = (rumbleTimer - windupEnd) / (launchFrame - windupEnd);
          const ease = t * t;
          const swingForward = ease * 100;
          winFighter.x = (entity1TargetX - dir * 50) + dir * swingForward;
          e2.x = (entity2TargetX - dir * 50) + dir * swingForward;
          loseFighter.x = (winFighter.x + e2.x) / 2;
          // At launch frame, release opponent
          if (rumbleTimer === launchFrame) {
            rumbleGolgarLaunchVy = -18;
            shakeTimer = 10;
            shakeIntensity = 8;
          }
        } else if (rumbleTimer <= flyEnd) {
          // Opponent flies diagonally into the sky — slingshot angle
          rumbleGolgarPhase = 4;
          winFighter.state = 'idle';
          loseFighter.x += dir * 10; // strong horizontal — slingshot
          loseFighter.y += rumbleGolgarLaunchVy;
          rumbleGolgarLaunchVy -= 0.15; // gentler upward accel so angle stays diagonal
          loseFighter.grounded = false;
          loseFighter._rumbleRotation = (loseFighter._rumbleRotation || 0) + 0.2 * dir;
          if (loseFighter.y < -100) {
            rumbleLoserHidden = true;
          }
          // Entities return to center
          const midX = (entity1TargetX + entity2TargetX) / 2;
          winFighter.x += (midX - 30 - winFighter.x) * 0.05;
          e2.x += (midX + 30 - e2.x) * 0.05;
        } else if (rumbleTimer <= highFiveHit) {
          // Walk toward each other for high-five
          rumbleGolgarPhase = 5;
          winFighter.state = 'idle';
          winFighter._hideFrontArm = true; // hide normal arm, we draw raised arm
          const midX = rumbleGolgarOpX;
          winFighter.x += (midX - 35 - winFighter.x) * 0.12;
          e2.x += (midX + 35 - e2.x) * 0.12;
          winFighter.facing = 1;
          e2.facing = -1;
          rumbleLoserHidden = true;
        } else if (rumbleTimer <= highFiveHit + 30) {
          // High-five hold
          rumbleGolgarPhase = 6;
          winFighter.state = 'idle';
          winFighter._hideFrontArm = true;
          const midX = rumbleGolgarOpX;
          winFighter.x = midX - 35;
          e2.x = midX + 35;
          winFighter.facing = 1;
          e2.facing = -1;
          if (rumbleTimer === highFiveHit + 1) {
            shakeTimer = 3;
            shakeIntensity = 2;
          }
        } else {
          // Settle
          rumbleGolgarPhase = 7;
          winFighter.state = 'idle';
          winFighter._hideFrontArm = false;
        }

        if (rumbleTimer >= endFrame) {
          loseFighter._rumbleRotation = 0;
          winFighter._hideFrontArm = false;
          gameState = 'victory';
        }
      }

      if (rumbleType === 'TELATRINE') {
        const pickupStart = 40;
        const dir = loseFighter.x > winFighter.x ? 1 : -1;
        const walkSpeed = 2.5;

        if (rumbleTelatrinePhase === 0) {
          winFighter.facing = dir;
          const dist = Math.abs(loseFighter.x - winFighter.x);
          if (dist > 40) {
            winFighter.x += dir * walkSpeed;
          } else if (rumbleTimer >= pickupStart) {
            rumbleTelatrinePhase = 1;
          }
        } else if (rumbleTelatrinePhase === 1) {
          winFighter.facing = dir;
          const liftT = Math.min(1, (rumbleTimer - pickupStart) / 20);
          loseFighter.x = winFighter.x;
          loseFighter.y = winFighter.y - 50 - liftT * 30;
          loseFighter.grounded = false;
          loseFighter._rumbleScale = 0.8;
          if (liftT >= 1) {
            rumbleTelatrinePhase = 2;
            winFighter.facing = winFighter.x < 480 ? -1 : 1;
          }
        } else if (rumbleTelatrinePhase === 2) {
          winFighter.x += winFighter.facing * walkSpeed;
          loseFighter.x = winFighter.x;
          loseFighter.y = winFighter.y - 80;
          if (winFighter.x < -30 || winFighter.x > 990) {
            rumbleTelatrinePhase = 3;
            rumbleLoserHidden = true;
            winFighter._rumbleAlpha = 0;
            loseFighter._rumbleAlpha = 0;
            loseFighter._rumbleScale = undefined;
            rumbleTelatrineShrug = 0;
          }
        } else if (rumbleTelatrinePhase === 3) {
          winFighter._rumbleAlpha = 0;
          rumbleTelatrineShrug++;
          if (rumbleTelatrineShrug >= 50) {
            rumbleTelatrinePhase = 4;
            if (winFighter.facing === 1) {
              winFighter.x = -20;
            } else {
              winFighter.x = 980;
            }
            winFighter._rumbleAlpha = 1;
            rumbleTelatrineShrug = 0;
          }
        } else if (rumbleTelatrinePhase === 4) {
          winFighter._rumbleAlpha = 1;
          winFighter.x += winFighter.facing * walkSpeed;
          const targetX = 480 + winFighter.facing * 100;
          if ((winFighter.facing === 1 && winFighter.x >= targetX) ||
              (winFighter.facing === -1 && winFighter.x <= targetX)) {
            rumbleTelatrinePhase = 5;
            winFighter.vx = 0;
            rumbleTelatrineShrug = 0;
          }
        } else if (rumbleTelatrinePhase === 5) {
          winFighter.state = 'idle';
          winFighter.vx = 0;
          winFighter._hideFrontArm = true;
          winFighter._hideBackArm = true;
          rumbleTelatrineShrug++;
        }

        if (rumbleTelatrinePhase <= 2 || rumbleTelatrinePhase === 4) {
          winFighter.animTimer++;
          if (winFighter.animTimer > 6) { winFighter.animTimer = 0; winFighter.animFrame = (winFighter.animFrame + 1) % 4; }
        }

        if (rumbleTelatrinePhase === 5 && rumbleTelatrineShrug >= 80) {
          winFighter._rumbleAlpha = undefined;
          loseFighter._rumbleAlpha = undefined;
          loseFighter._rumbleScale = undefined;
          gameState = 'victory';
        }
      }

      if (rumbleType === 'CORVIDA') {
        // Corvida "Early Bird": ~480 frames
        // 0-40: Corvida transforms to giant blue jay
        // 40-80: Flies to center, drops nest on ground
        // 80-140: Lays 3 eggs into the nest
        // 140-190: Swoops to grab opponent
        // 190-240: Lifts opponent, hovers above nest
        // 240-290: Eggs hatch, chicks open mouths
        // 290-320: Drops opponent into a chick's mouth
        // 320-380: Gulp, chick satisfied
        // 380-480: Corvida lands, transforms back
        const transformEnd = 40;
        const nestDropEnd = 80;
        const layEnd = 140;
        const swoopEnd = 190;
        const hoverEnd = 240;
        const hatchEnd = 290;
        const dropFrame = 305;
        const gulpEnd = 380;
        const endFrame = 480;

        const dir = loseFighter.x > winFighter.x ? 1 : -1;
        const centerX = 480;
        const groundY = loseFighter.groundY;

        if (rumbleTimer === 1) {
          rumbleCorvidaNestX = centerX;
          // Giant eggs — positions relative to nest center, with falling state
          rumbleCorvidaEggs = [
            { x: centerX - 40, y: groundY - 15, fallY: -100, falling: false, landed: false, hatched: false },
            { x: centerX, y: groundY - 18, fallY: -100, falling: false, landed: false, hatched: false },
            { x: centerX + 40, y: groundY - 15, fallY: -100, falling: false, landed: false, hatched: false }
          ];
          rumbleCorvidaGulpChick = -1;
          rumbleCorvidaPhase = 0;
        }

        // Egg fall frames (staggered during lay phase)
        const eggDropFrames = [85, 105, 125];
        // Update falling eggs
        for (let i = 0; i < rumbleCorvidaEggs.length; i++) {
          const egg = rumbleCorvidaEggs[i];
          if (rumbleTimer === eggDropFrames[i]) {
            egg.falling = true;
            egg.fallY = winFighter.y + 30; // start from jay's position
            egg.fallVy = 0;
          }
          if (egg.falling && !egg.landed) {
            egg.fallVy += 0.8;
            egg.fallY += egg.fallVy;
            if (egg.fallY >= egg.y) {
              egg.fallY = egg.y;
              egg.landed = true;
              egg.falling = false;
              shakeTimer = 4;
              shakeIntensity = 3;
            }
          }
        }

        if (rumbleTimer <= transformEnd) {
          // Transform — grow into giant jay, hide normal fighter
          rumbleCorvidaPhase = 0;
          winFighter._rumbleAlpha = Math.max(0, 1 - rumbleTimer / 20);
          winFighter.vx = 0;
          winFighter.state = 'idle';
        } else if (rumbleTimer <= nestDropEnd) {
          // Fly as giant jay to center, drop nest
          rumbleCorvidaPhase = 1;
          winFighter._rumbleAlpha = 0;
          const t = (rumbleTimer - transformEnd) / (nestDropEnd - transformEnd);
          winFighter.x = winFighter.x + (centerX - winFighter.x) * 0.08;
          winFighter.y = groundY - 80 - t * 60;
        } else if (rumbleTimer <= layEnd) {
          // Hover above nest and lay eggs (they fall from jay)
          rumbleCorvidaPhase = 2;
          winFighter._rumbleAlpha = 0;
          winFighter.x += (centerX - winFighter.x) * 0.1;
          winFighter.y = groundY - 200 + Math.sin(rumbleTimer * 0.08) * 5;
        } else if (rumbleTimer <= swoopEnd) {
          // Swoop to grab opponent
          rumbleCorvidaPhase = 3;
          winFighter._rumbleAlpha = 0;
          const t = (rumbleTimer - layEnd) / (swoopEnd - layEnd);
          const ease = t * t;
          winFighter.x += (loseFighter.x - winFighter.x) * 0.1;
          winFighter.y = (groundY - 200) + ((loseFighter.y - 40) - (groundY - 200)) * ease;
          winFighter.facing = loseFighter.x > winFighter.x ? 1 : -1;
        } else if (rumbleTimer <= hoverEnd) {
          // Lift opponent in talons, hover above nest
          rumbleCorvidaPhase = 4;
          winFighter._rumbleAlpha = 0;
          // Opponent is visible, dangling below the jay
          loseFighter._rumbleScale = 0.7; // slightly smaller in talons
          loseFighter.grounded = false;
          // Fly back above nest
          winFighter.x += (centerX - winFighter.x) * 0.08;
          winFighter.y += ((groundY - 200) - winFighter.y) * 0.08;
          // Opponent follows below the jay (in talons)
          loseFighter.x = winFighter.x;
          loseFighter.y = winFighter.y + 70;
        } else if (rumbleTimer <= hatchEnd) {
          // Eggs hatch, opponent still held
          rumbleCorvidaPhase = 5;
          winFighter._rumbleAlpha = 0;
          loseFighter._rumbleScale = 0.7;
          winFighter.x += (centerX - winFighter.x) * 0.05;
          winFighter.y = groundY - 200 + Math.sin(rumbleTimer * 0.08) * 3;
          loseFighter.x = winFighter.x;
          loseFighter.y = winFighter.y + 70;
          // Hatch eggs progressively
          const hatchProgress = (rumbleTimer - hoverEnd) / (hatchEnd - hoverEnd);
          if (hatchProgress > 0.2 && !rumbleCorvidaEggs[0].hatched) { rumbleCorvidaEggs[0].hatched = true; shakeTimer = 3; shakeIntensity = 2; }
          if (hatchProgress > 0.5 && !rumbleCorvidaEggs[1].hatched) { rumbleCorvidaEggs[1].hatched = true; shakeTimer = 3; shakeIntensity = 2; }
          if (hatchProgress > 0.8 && !rumbleCorvidaEggs[2].hatched) { rumbleCorvidaEggs[2].hatched = true; shakeTimer = 3; shakeIntensity = 2; }
          if (rumbleCorvidaGulpChick < 0) {
            rumbleCorvidaGulpChick = 1; // center chick
          }
        } else if (rumbleTimer <= dropFrame) {
          // Drop the opponent into the chick's mouth
          rumbleCorvidaPhase = 6;
          winFighter._rumbleAlpha = 0;
          const t = (rumbleTimer - hatchEnd) / (dropFrame - hatchEnd);
          const targetChick = rumbleCorvidaEggs[rumbleCorvidaGulpChick];
          // Opponent falls from jay toward the chick's open mouth
          const chickMouthY = targetChick.y - 50; // above the chick head
          loseFighter.x += (targetChick.x - loseFighter.x) * 0.15;
          loseFighter.y += (chickMouthY - loseFighter.y) * 0.12;
          loseFighter._rumbleScale = Math.max(0.3, 0.7 - t * 0.4);
        } else if (rumbleTimer <= gulpEnd) {
          // Gulp — opponent disappears
          rumbleCorvidaPhase = 7;
          winFighter._rumbleAlpha = 0;
          rumbleLoserHidden = true;
          loseFighter._rumbleAlpha = undefined;
          loseFighter._rumbleScale = undefined;
          winFighter.y = groundY - 200 + Math.sin(rumbleTimer * 0.06) * 5;
        } else {
          // Land and transform back — land beside the nest, not on it
          rumbleCorvidaPhase = 8;
          const t = (rumbleTimer - gulpEnd) / (endFrame - gulpEnd);
          winFighter._rumbleAlpha = Math.min(1, t * 2);
          // Move to side of nest
          const landX = centerX + 150;
          winFighter.x += (landX - winFighter.x) * 0.08;
          winFighter.y += (groundY - winFighter.y) * 0.06;
          if (t > 0.5) {
            winFighter.x = landX;
            winFighter.y = groundY;
            winFighter.grounded = true;
          }
          winFighter.facing = -1; // face the nest
          winFighter.state = 'idle';
        }

        if (rumbleTimer >= endFrame) {
          winFighter._rumbleAlpha = undefined;
          loseFighter._rumbleAlpha = undefined;
          loseFighter._rumbleScale = undefined;
          gameState = 'victory';
        }
      }

      if (rumbleType === 'CODEMAX') {
        // Codemax "Your New Overlord": ~360 frames
        // 0-30: Codemax raises hand, charges laser
        // 30-60: Green pixelated laser fires at opponent
        // 60-100: Opponent pixelates (level 1 — large pixels)
        // 100-140: Pixelate level 2 — larger pixels
        // 140-180: Pixelate level 3 — very large pixels
        // 180-220: Pixelate level 4 — barely recognizable
        // 220-300: Glitch and blink out
        // 300-360: Settle
        const chargeEnd = 30;
        const laserEnd = 60;
        const pixel1End = 100;
        const pixel2End = 140;
        const pixel3End = 180;
        const pixel4End = 220;
        const glitchEnd = 300;
        const endFrame = 360;

        const dir = loseFighter.x > winFighter.x ? 1 : -1;
        winFighter.facing = dir;
        winFighter.vx = 0;

        if (rumbleTimer <= chargeEnd) {
          // Charge up — arm raised
          winFighter.state = 'attack';
          rumbleCodemaxLaser = false;
          rumbleCodemaxPixelLevel = 0;
        } else if (rumbleTimer <= laserEnd) {
          // Fire laser
          winFighter.state = 'attack';
          rumbleCodemaxLaser = true;
          // Spawn laser particles along the beam
          if (rumbleTimer % 2 === 0) {
            const sx = winFighter.x + dir * 25;
            const sy = winFighter.y - 35;
            const ex = loseFighter.x;
            const ey = loseFighter.y - 30;
            for (let i = 0; i < 5; i++) {
              const t = Math.random();
              rumbleCodemaxLaserParticles.push({
                x: sx + (ex - sx) * t + (Math.random() - 0.5) * 8,
                y: sy + (ey - sy) * t + (Math.random() - 0.5) * 8,
                size: 3 + Math.random() * 5,
                alpha: 0.8,
                life: 15 + Math.random() * 10
              });
            }
          }
          if (rumbleTimer === laserEnd) {
            loseFighter.flashTimer = 10;
            shakeTimer = 8;
            shakeIntensity = 4;
          }
        } else if (rumbleTimer <= pixel1End) {
          winFighter.state = 'idle';
          rumbleCodemaxLaser = false;
          rumbleCodemaxPixelLevel = 1;
          loseFighter._rumbleAlpha = 0; // hide real fighter, show pixel version
        } else if (rumbleTimer <= pixel2End) {
          rumbleCodemaxPixelLevel = 2;
          loseFighter._rumbleAlpha = 0;
          if (rumbleTimer === pixel1End + 1) {
            shakeTimer = 4; shakeIntensity = 3;
          }
        } else if (rumbleTimer <= pixel3End) {
          rumbleCodemaxPixelLevel = 3;
          loseFighter._rumbleAlpha = 0;
          if (rumbleTimer === pixel2End + 1) {
            shakeTimer = 4; shakeIntensity = 3;
          }
        } else if (rumbleTimer <= pixel4End) {
          rumbleCodemaxPixelLevel = 4;
          loseFighter._rumbleAlpha = 0;
          if (rumbleTimer === pixel3End + 1) {
            shakeTimer = 6; shakeIntensity = 5;
          }
        } else if (rumbleTimer <= glitchEnd) {
          // Glitch out phase
          rumbleCodemaxPixelLevel = 4;
          loseFighter._rumbleAlpha = 0;
          rumbleCodemaxGlitch = rumbleTimer - pixel4End;
          // Opponent fully gone after enough glitching
          if (rumbleCodemaxGlitch > 40) {
            rumbleLoserHidden = true;
            rumbleCodemaxPixelLevel = 0;
          }
        } else {
          // Settle
          winFighter.state = 'idle';
          rumbleLoserHidden = true;
          rumbleCodemaxPixelLevel = 0;
          rumbleCodemaxGlitch = 0;
        }

        // Update laser particles
        for (let i = rumbleCodemaxLaserParticles.length - 1; i >= 0; i--) {
          const p = rumbleCodemaxLaserParticles[i];
          p.life--;
          p.alpha = Math.max(0, p.life / 15);
          if (p.life <= 0) rumbleCodemaxLaserParticles.splice(i, 1);
        }

        if (rumbleTimer >= endFrame) {
          gameState = 'victory';
        }
      }

      if (rumbleType === 'HAYSTACK') {
        // Haystack "Don't Fear the Reaper": ~380 frames
        // 0-40: Arms out, ravens fly in from edges
        // 40-80: Ravens grab and lift Haystack into the air
        // 80-120: Reaches into chest, pulls out scythe
        // 120-160: Hover in place, scythe gleams
        // 160-200: Ravens dive bomb toward opponent
        // 200-210: Scythe strike
        // 210-300: Opponent dissolves into dust
        // 300-380: Dust dissipates, Haystack lands
        const ravensArriveEnd = 40;
        const liftEnd = 80;
        const scytheEnd = 120;
        const hoverEnd = 160;
        const diveEnd = 200;
        const strikeFrame = 205;
        const dissolveEnd = 300;
        const endFrame = 380;

        const dir = loseFighter.x > winFighter.x ? 1 : -1;
        winFighter.facing = dir;
        winFighter.vx = 0;

        // Spawn ravens at start
        if (rumbleTimer === 1) {
          rumbleHaystackRavens = [];
          for (let i = 0; i < 4; i++) {
            rumbleHaystackRavens.push({
              x: i < 2 ? -50 - i * 40 : 1010 + (i - 2) * 40,
              y: 50 + i * 30,
              wingPhase: Math.random() * Math.PI * 2,
              offsetX: (i - 1.5) * 20,
              offsetY: (i % 2) * 15 - 7
            });
          }
        }

        if (rumbleTimer <= ravensArriveEnd) {
          // Arms out, ravens fly toward Haystack
          winFighter.state = 'idle';
          const t = rumbleTimer / ravensArriveEnd;
          for (const r of rumbleHaystackRavens) {
            const targetX = winFighter.x + r.offsetX;
            const targetY = winFighter.y - 40 + r.offsetY;
            r.x += (targetX - r.x) * 0.08;
            r.y += (targetY - r.y) * 0.08;
          }
        } else if (rumbleTimer <= liftEnd) {
          // Ravens lift Haystack into the air
          const t = (rumbleTimer - ravensArriveEnd) / (liftEnd - ravensArriveEnd);
          const liftY = winFighter.groundY - 120 * t;
          winFighter.y = liftY;
          winFighter.grounded = false;
          winFighter.state = 'idle';
          // Ravens stay around Haystack
          for (const r of rumbleHaystackRavens) {
            r.x += (winFighter.x + r.offsetX - r.x) * 0.15;
            r.y += (winFighter.y - 20 + r.offsetY - r.y) * 0.15;
          }
        } else if (rumbleTimer <= scytheEnd) {
          // Reaches into chest and pulls out scythe
          winFighter.state = 'attack';
          if (rumbleTimer === liftEnd + 20) {
            rumbleHaystackScythe = true;
          }
          for (const r of rumbleHaystackRavens) {
            r.x += (winFighter.x + r.offsetX - r.x) * 0.1;
            r.y += (winFighter.y - 20 + r.offsetY - r.y) * 0.1;
          }
        } else if (rumbleTimer <= hoverEnd) {
          // Hover menacingly
          winFighter.state = 'idle';
          winFighter.y = winFighter.groundY - 120 + Math.sin(rumbleTimer * 0.08) * 5;
          for (const r of rumbleHaystackRavens) {
            r.x += (winFighter.x + r.offsetX - r.x) * 0.1;
            r.y += (winFighter.y - 20 + r.offsetY - r.y) * 0.1;
          }
        } else if (rumbleTimer <= diveEnd) {
          // Dive bomb toward opponent — store start position once
          if (!rumbleHaystackDiveStart) {
            rumbleHaystackDiveStart = { x: winFighter.x, y: winFighter.groundY - 120 };
          }
          const t = (rumbleTimer - hoverEnd) / (diveEnd - hoverEnd);
          const ease = t * t; // accelerating
          const targetX = loseFighter.x - dir * 40;
          const targetY = loseFighter.y - 30;
          winFighter.x = rumbleHaystackDiveStart.x + (targetX - rumbleHaystackDiveStart.x) * ease;
          winFighter.y = rumbleHaystackDiveStart.y + (targetY - rumbleHaystackDiveStart.y) * ease;
          winFighter.state = 'attack';
          // Ravens follow
          for (const r of rumbleHaystackRavens) {
            r.x += (winFighter.x + r.offsetX - r.x) * 0.2;
            r.y += (winFighter.y - 20 + r.offsetY - r.y) * 0.2;
          }
        } else if (rumbleTimer <= strikeFrame) {
          // Strike!
          winFighter.state = 'attack';
          if (rumbleTimer === strikeFrame && !rumbleHaystackStrike) {
            rumbleHaystackStrike = true;
            shakeTimer = 20;
            shakeIntensity = 12;
            loseFighter.flashTimer = 10;
            // Spawn dust particles from opponent
            for (let i = 0; i < 30; i++) {
              rumbleHaystackDust.push({
                x: loseFighter.x + (Math.random() - 0.5) * 30,
                y: loseFighter.y - 30 + (Math.random() - 0.5) * 50,
                vx: (Math.random() - 0.5) * 4,
                vy: (Math.random() - 0.5) * 3 - 1,
                size: 3 + Math.random() * 8,
                alpha: 0.8 + Math.random() * 0.2,
                color: ['#aa9966', '#887755', '#ccbb88', '#665533'][Math.floor(Math.random() * 4)]
              });
            }
          }
        } else if (rumbleTimer <= dissolveEnd) {
          // Opponent dissolves, Haystack lands
          winFighter.state = 'idle';
          rumbleLoserHidden = true;

          // Haystack descends back to ground
          const landT = Math.min(1, (rumbleTimer - strikeFrame) / 40);
          winFighter.y = (loseFighter.y - 30) + (winFighter.groundY - (loseFighter.y - 30)) * landT;
          if (landT >= 1) {
            winFighter.y = winFighter.groundY;
            winFighter.grounded = true;
          }

          // Ravens scatter
          for (const r of rumbleHaystackRavens) {
            r.x += r.offsetX > 0 ? 3 : -3;
            r.y -= 1.5;
          }
        } else {
          winFighter.state = 'idle';
          winFighter.y = winFighter.groundY;
          winFighter.grounded = true;
        }

        // Update dust particles
        for (let i = rumbleHaystackDust.length - 1; i >= 0; i--) {
          const d = rumbleHaystackDust[i];
          d.x += d.vx;
          d.y += d.vy;
          d.vy -= 0.02; // rise slightly
          d.vx *= 0.98;
          d.size *= 0.995;
          d.alpha -= 0.006;
          if (d.alpha <= 0) rumbleHaystackDust.splice(i, 1);
        }

        // Update raven wing animation
        for (const r of rumbleHaystackRavens) {
          r.wingPhase += 0.15;
        }

        if (rumbleTimer >= endFrame) {
          rumbleHaystackScythe = false;
          gameState = 'victory';
        }
      }

      if (rumbleType === 'SNAZZ MCJAZZ') {
        // Snazz McJazz "Annie, are you okay?": ~400 frames
        // 0-30: Disco ball descends from ceiling
        // 30-300: Snazz dances toward opponent, confetti falls
        // 300-310: Snazz stops, winds up punch
        // 310-315: Punch connects
        // 315-400: Opponent falls, disco ball rises, confetti settles
        const discoDownEnd = 30;
        const danceEnd = 300;
        const windupEnd = 310;
        const punchFrame = 313;
        const endFrame = 400;

        const dir = loseFighter.x > winFighter.x ? 1 : -1;
        winFighter.facing = dir;

        if (rumbleTimer <= discoDownEnd) {
          // Disco ball descends
          winFighter.state = 'idle';
          winFighter.vx = 0;
          if (!rumbleSnazzDiscoBall) {
            rumbleSnazzDiscoBall = { y: -30, targetY: 60 };
          }
          const t = rumbleTimer / discoDownEnd;
          rumbleSnazzDiscoBall.y = -30 + (rumbleSnazzDiscoBall.targetY + 30) * t * t;
        } else if (rumbleTimer <= danceEnd) {
          // Dance phase — Snazz dances toward opponent
          winFighter.dancing = true;
          winFighter.danceTimer = 999; // keep dancing

          // Move toward opponent slowly
          const distToOpponent = Math.abs(loseFighter.x - winFighter.x);
          if (distToOpponent > 50) {
            winFighter.x += dir * 1.2;
          }

          // Spawn confetti
          if (rumbleTimer % 4 === 0) {
            for (let i = 0; i < 3; i++) {
              rumbleSnazzConfetti.push({
                x: 100 + Math.random() * 760,
                y: -10 - Math.random() * 30,
                vx: (Math.random() - 0.5) * 2,
                vy: 1 + Math.random() * 2,
                size: 3 + Math.random() * 4,
                rot: Math.random() * Math.PI * 2,
                rotSpeed: (Math.random() - 0.5) * 0.2,
                color: ['#ff00ff', '#00ffff', '#ff4400', '#44ff00', '#ffff00', '#ff66aa', '#6644ff'][Math.floor(Math.random() * 7)],
                alpha: 1
              });
            }
          }
        } else if (rumbleTimer <= windupEnd) {
          // Stop dancing, face opponent, wind up
          winFighter.dancing = false;
          winFighter.danceTimer = 0;
          winFighter.vx = 0;
          winFighter.state = 'idle';
          // Step right up to opponent
          const targetX = loseFighter.x - dir * 45;
          const t = (rumbleTimer - danceEnd) / (windupEnd - danceEnd);
          winFighter.x += (targetX - winFighter.x) * 0.3;
        } else if (rumbleTimer <= punchFrame) {
          // Punch!
          winFighter.state = 'attack';
          winFighter.currentAttack = 'jab';
        } else if (rumbleTimer === punchFrame + 1) {
          // Punch connects
          rumbleSnazzPunchLanded = true;
          loseFighter.flashTimer = 8;
          shakeTimer = 15;
          shakeIntensity = 10;
          loseFighter.state = 'hitstun';
          winFighter.state = 'idle';
        } else {
          // Aftermath — opponent falls, disco ball rises
          winFighter.state = 'idle';
          winFighter.vx = 0;

          // Opponent falls to ground
          if (!loseFighter.grounded || loseFighter.y < loseFighter.groundY) {
            loseFighter.vy = (loseFighter.vy || 0) + 0.5;
            loseFighter.y += loseFighter.vy;
            if (loseFighter.y >= loseFighter.groundY) {
              loseFighter.y = loseFighter.groundY;
              loseFighter.grounded = true;
            }
          }

          // Opponent lies flat (knocked out)
          loseFighter._rumbleRotation = dir * Math.PI / 2;

          // Disco ball rises back up
          if (rumbleSnazzDiscoBall) {
            rumbleSnazzDiscoBall.y -= 1.5;
          }
        }

        // Update confetti
        for (let i = rumbleSnazzConfetti.length - 1; i >= 0; i--) {
          const c = rumbleSnazzConfetti[i];
          c.x += c.vx;
          c.y += c.vy;
          c.vx += (Math.random() - 0.5) * 0.1; // flutter
          c.vy += 0.02;
          c.rot += c.rotSpeed;
          if (c.y > 550) {
            c.alpha -= 0.05;
          }
          if (rumbleTimer > danceEnd) {
            c.alpha -= 0.008;
          }
          if (c.alpha <= 0) rumbleSnazzConfetti.splice(i, 1);
        }

        if (rumbleTimer >= endFrame) {
          winFighter.dancing = false;
          winFighter.danceTimer = 0;
          // Keep loseFighter._rumbleRotation so they stay knocked down on victory screen
          gameState = 'victory';
        }
      }

      if (rumbleType === 'TORRENA') {
        // Torrena "Cloudy, with a chance of demise": ~420 frames
        // 0-30: Enter water phase (go translucent)
        // 30-70: Evaporate — rise up as steam particles, fighter fades out
        // 70-90: Cloud forms above opponent
        // 90-280: Heavy rain pummels opponent
        // 280-300: Hailstone forms and drops
        // 300-330: Impact + crush
        // 330-420: Settle, transition to victory
        const waterEnd = 30;
        const evapEnd = 70;
        const cloudFormEnd = 90;
        const rainEnd = 280;
        const hailFormEnd = 295;
        const hailImpact = 340;
        const endFrame = 440;

        const cloudTargetX = loseFighter.x;
        const cloudTargetY = 60;

        winFighter.vx = 0;

        if (rumbleTimer <= waterEnd) {
          // Phase 0: Enter water phase
          rumbleTorrenaPhase = 0;
          winFighter.waterPhase = true;
          winFighter.state = 'idle';
        } else if (rumbleTimer <= evapEnd) {
          // Phase 1: Evaporate — spawn steam particles rising from fighter position
          rumbleTorrenaPhase = 1;
          winFighter.waterPhase = true;
          const evapT = (rumbleTimer - waterEnd) / (evapEnd - waterEnd);
          // Fade out the winner (we'll use a custom alpha via a flag)
          winFighter._rumbleAlpha = Math.max(0, 1 - evapT * 1.5);
          // Spawn steam particles
          if (rumbleTimer % 2 === 0) {
            for (let i = 0; i < 3; i++) {
              rumbleTorrenaEvapParticles.push({
                x: winFighter.x + (Math.random() - 0.5) * 30,
                y: winFighter.y - 30 + (Math.random() - 0.5) * 40,
                vx: (Math.random() - 0.5) * 1.5,
                vy: -1.5 - Math.random() * 2,
                size: 3 + Math.random() * 5,
                alpha: 0.6 + Math.random() * 0.3,
                color: `rgba(100,200,255,`
              });
            }
          }
          if (evapT >= 0.8) {
            // Start hiding winner
            rumbleLoserHidden = false; // make sure loser still visible
          }
        } else if (rumbleTimer <= cloudFormEnd) {
          // Phase 2: Cloud forms above opponent, winner is invisible
          rumbleTorrenaPhase = 2;
          winFighter._rumbleAlpha = 0;
          const formT = (rumbleTimer - evapEnd) / (cloudFormEnd - evapEnd);
          rumbleTorrenaCloudX = cloudTargetX;
          rumbleTorrenaCloudY = cloudTargetY + (1 - formT) * 40;
        } else if (rumbleTimer <= rainEnd) {
          // Phase 3: Heavy rain pummels opponent
          rumbleTorrenaPhase = 3;
          winFighter._rumbleAlpha = 0;
          rumbleTorrenaCloudX = cloudTargetX + Math.sin(rumbleTimer * 0.05) * 15;
          rumbleTorrenaCloudY = cloudTargetY;

          // Spawn raindrops from cloud
          if (rumbleTimer % 2 === 0) {
            for (let i = 0; i < 4; i++) {
              rumbleRaindrops.push({
                x: rumbleTorrenaCloudX + (Math.random() - 0.5) * 80,
                y: rumbleTorrenaCloudY + 25 + Math.random() * 10,
                vx: (Math.random() - 0.5) * 0.5,
                vy: 6 + Math.random() * 4,
                size: 1 + Math.random() * 2,
                alpha: 0.7 + Math.random() * 0.3
              });
            }
          }

          // Rain hits opponent — flash and shake periodically
          if (rumbleTimer % 15 === 0) {
            loseFighter.flashTimer = 3;
            shakeTimer = 3;
            shakeIntensity = 2;
          }

          // Push opponent down slightly (staggering under rain)
          loseFighter.state = 'hitstun';
        } else if (rumbleTimer <= hailFormEnd) {
          // Phase 4: Hailstone forms — rain stops, ominous pause
          rumbleTorrenaPhase = 4;
          winFighter._rumbleAlpha = 0;
          rumbleTorrenaCloudX = cloudTargetX;
          // Cloud darkens (handled in draw)
          loseFighter.state = 'idle';
          if (rumbleTimer === rainEnd + 1) {
            // Create hailstone above cloud
            rumbleHailstone = {
              x: cloudTargetX,
              y: cloudTargetY - 20,
              vy: 0,
              size: 0
            };
          }
          if (rumbleHailstone) {
            // Hailstone grows
            const growT = (rumbleTimer - rainEnd) / (hailFormEnd - rainEnd);
            rumbleHailstone.size = 25 * growT;
          }
        } else if (rumbleTimer <= hailImpact) {
          // Phase 5: Hailstone drops
          rumbleTorrenaPhase = 5;
          winFighter._rumbleAlpha = 0;
          if (rumbleHailstone) {
            rumbleHailstone.vy += 1.8;
            rumbleHailstone.y += rumbleHailstone.vy;
            // Check if hailstone reached opponent
            if (rumbleHailstone.y >= loseFighter.y - 30 && !rumbleHailCracked) {
              rumbleHailstone.y = loseFighter.groundY - rumbleHailstone.size;
              rumbleLoserHidden = true;
              rumbleHailCracked = true;
              shakeTimer = 30;
              shakeIntensity = 15;
              // Spawn hailstone shards flying outward
              for (let i = 0; i < 25; i++) {
                const angle = -Math.PI * Math.random(); // mostly upward
                const speed = 3 + Math.random() * 6;
                rumbleHailShards.push({
                  x: loseFighter.x + (Math.random() - 0.5) * 30,
                  y: loseFighter.groundY - 10,
                  vx: Math.cos(angle) * speed * (Math.random() > 0.5 ? 1 : -1),
                  vy: -2 - Math.random() * 5,
                  size: 2 + Math.random() * 6,
                  alpha: 1,
                  rot: Math.random() * Math.PI * 2,
                  rotSpeed: (Math.random() - 0.5) * 0.3
                });
              }
            }
          }
        } else {
          // Phase 6: Settle — cloud fades, winner reappears
          rumbleTorrenaPhase = 6;
          const settleT = (rumbleTimer - hailImpact) / (endFrame - hailImpact);
          winFighter._rumbleAlpha = Math.min(1, settleT * 1.5);
          winFighter.waterPhase = settleT < 0.5;
          // Move winner back to ground near opponent
          if (rumbleTimer === hailImpact + 1) {
            winFighter.x = loseFighter.x + (winFighter.x > loseFighter.x ? 60 : -60);
          }
          winFighter.state = 'idle';
        }

        // Update evaporation particles
        for (let i = rumbleTorrenaEvapParticles.length - 1; i >= 0; i--) {
          const p = rumbleTorrenaEvapParticles[i];
          p.x += p.vx;
          p.y += p.vy;
          p.vy *= 0.98;
          p.alpha -= 0.01;
          if (p.alpha <= 0) rumbleTorrenaEvapParticles.splice(i, 1);
        }

        // Update raindrops
        for (let i = rumbleRaindrops.length - 1; i >= 0; i--) {
          const r = rumbleRaindrops[i];
          r.x += r.vx;
          r.y += r.vy;
          r.vy += 0.1;
          if (r.y > loseFighter.groundY + 5) {
            r.alpha -= 0.15;
          }
          if (r.alpha <= 0 || r.y > 550) rumbleRaindrops.splice(i, 1);
        }

        // Update hail shards
        for (let i = rumbleHailShards.length - 1; i >= 0; i--) {
          const s = rumbleHailShards[i];
          s.x += s.vx;
          s.y += s.vy;
          s.vy += 0.25;
          s.rot += s.rotSpeed;
          if (s.y > loseFighter.groundY) {
            s.y = loseFighter.groundY;
            s.vy *= -0.3;
            s.vx *= 0.7;
            if (Math.abs(s.vy) < 0.5) {
              s.vy = 0;
              s.alpha -= 0.015;
            }
          }
          if (s.alpha <= 0) rumbleHailShards.splice(i, 1);
        }

        if (rumbleTimer >= endFrame) {
          winFighter._rumbleAlpha = undefined;
          winFighter.waterPhase = false;
          gameState = 'victory';
        }
      }

      // Animate winner
      winFighter.animTimer++;
      if (winFighter.animTimer > 8) { winFighter.animTimer = 0; winFighter.animFrame = (winFighter.animFrame + 1) % 4; }
    } else {
      // Normal finishHim phase — winner moves, timer counts down
      finishHimTimer++;
      frameCount++;
      if (shakeTimer > 0) shakeTimer--;
      // Winner keeps acting
      if (winner === 'player') {
        winFighter.update(loseFighter, keys);
      } else {
        winFighter.update(loseFighter, {});
      }
      if (finishHimTimer >= FINISH_HIM_DURATION && gameMode !== 'rumblePractice') {
        gameState = 'victory';
      }
    }

    // Loser stays passive: idle, no movement, still animates
    loseFighter.vx = 0;
    loseFighter.state = 'idle';
    loseFighter.blocking = false;
    if (loseFighter.flashTimer > 0) loseFighter.flashTimer--;
    if (loseFighter.hitEffect) {
      loseFighter.hitEffect.timer--;
      if (loseFighter.hitEffect.timer <= 0) loseFighter.hitEffect = null;
    }
    loseFighter.animTimer++;
    if (loseFighter.animTimer > 8) { loseFighter.animTimer = 0; loseFighter.animFrame = (loseFighter.animFrame + 1) % 4; }
    // Apply gravity so loser lands if airborne (skip during Bojdo launch)
    const bojdoLaunching = (rumbleType === 'BOJDO' || rumbleType === 'BOJDOBOJDO') && rumbleActive && (rumbleSubType === 'pellet' ? rumbleTimer > 110 : rumbleSubType === 'massiv');
    const rubberSwinging = rumbleType === 'RUBBERMAN' && rumbleActive;
    const golgarLaunching = rumbleType === 'GOLGAR' && rumbleActive;
    const telatrineCarrying = rumbleType === 'TELATRINE' && rumbleActive;
    if (!loseFighter.grounded && !bojdoLaunching && !rubberSwinging && !golgarLaunching && !telatrineCarrying) {
      loseFighter.vy += 0.6;
      loseFighter.y += loseFighter.vy;
      if (loseFighter.y >= loseFighter.groundY) {
        loseFighter.y = loseFighter.groundY;
        loseFighter.vy = 0;
        loseFighter.grounded = true;
      }
    }
  }
}

function drawFinishHimScreen() {
  if (rumbleActive) {
    drawRumbleAnimation();
    return;
  }

  const loserChar = winner === 'player' ? selectedCPU : selectedPlayer;
  const isFemale = femaleCharacters.has(loserChar.name);
  const text = isFemale ? 'FINISH HER' : 'FINISH HIM';

  const alpha = Math.min(1, finishHimTimer / 30); // fade in
  const pulse = Math.sin(finishHimTimer * 0.08) * 0.05 + 1.0;

  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.translate(480, 45);
  ctx.scale(pulse, pulse);

  // Red glow text
  ctx.font = 'bold 36px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.shadowColor = '#ff0000';
  ctx.shadowBlur = 20;
  ctx.fillStyle = '#ff2222';
  ctx.fillText(text, 0, 0);
  ctx.shadowBlur = 0;

  ctx.restore();

  // Countdown bar below text (infinite in rumble practice)
  if (gameMode === 'rumblePractice') {
    ctx.font = '14px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = 'rgba(255,100,100,0.6)';
    ctx.fillText('∞', 480, 73);
  } else {
    const remaining = 1 - finishHimTimer / FINISH_HIM_DURATION;
    const barW = 200;
    const barX = 480 - barW / 2;
    ctx.fillStyle = 'rgba(255,0,0,0.2)';
    ctx.fillRect(barX, 68, barW, 3);
    ctx.fillStyle = '#ff2222';
    ctx.fillRect(barX, 68, barW * remaining, 3);
  }
}

function drawRumbleAnimation() {
  const loseFighter = winner === 'player' ? cpu : player;
  const winFighter = winner === 'player' ? player : cpu;
  const winChar = winner === 'player' ? selectedPlayer : selectedCPU;
  const rumbleEntry = characterRumbles[winChar.name];
  const rumble = rumbleEntry ? (Array.isArray(rumbleEntry) ? rumbleEntry.find(r => r.code === rumbleSubType) : rumbleEntry) : null;

  // Show rumble name at top
  if (rumble) {
    const nameAlpha = Math.min(1, rumbleTimer / 20);
    ctx.save();
    ctx.globalAlpha = nameAlpha;
    ctx.font = 'bold 30px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowColor = winChar.accent;
    ctx.shadowBlur = 15;
    ctx.fillStyle = winChar.accent;
    ctx.fillText(rumble.name, 480, 45);
    ctx.shadowBlur = 0;
    ctx.restore();
  }

  if (rumbleType === 'BLAZE') {
    drawBlazeRumble(loseFighter);
  }
  if (rumbleType === 'ARTIK') {
    drawArtikRumble(loseFighter);
  }
  if (rumbleType === 'VENOM') {
    drawVenomRumble(loseFighter);
  }
  if (rumbleType === 'SURGE') {
    drawSurgeRumble(loseFighter, winFighter);
  }
  if (rumbleType === 'TITAN') {
    drawTitanRumble(loseFighter);
  }
  if (rumbleType === 'SHADE') {
    drawShadeRumble(loseFighter, winFighter);
  }
  if ((rumbleType === 'BOJDO' || rumbleType === 'BOJDOBOJDO') && rumbleSubType === 'pellet') {
    drawBojdoRumble(loseFighter, winFighter);
  }
  if (rumbleType === 'BOJDOBOJDO' && rumbleSubType === 'massiv') {
    drawBojdoStompRumble(loseFighter, winFighter);
  }
  if (rumbleType === 'RUBBERMAN') {
    drawRubbermanRumble(loseFighter, winFighter);
  }
  if (rumbleType === 'TORRENA') {
    drawTorrenaRumble(loseFighter, winFighter);
  }
  if (rumbleType === 'SNAZZ MCJAZZ') {
    drawSnazzRumble(loseFighter, winFighter);
  }
  if (rumbleType === 'HAYSTACK') {
    drawHaystackRumble(loseFighter, winFighter);
  }
  if (rumbleType === 'CODEMAX') {
    drawCodemaxRumble(loseFighter, winFighter);
  }
  if (rumbleType === 'CORVIDA') {
    drawCorvidaRumble(loseFighter, winFighter);
  }
  if (rumbleType === 'GOLGAR') {
    drawGolgarRumble(loseFighter, winFighter);
  }
  if (rumbleType === 'TELATRINE') {
    drawTelatrineRumble(loseFighter, winFighter);
  }
}

function drawBojdoRumble(loseFighter, winFighter) {
  ctx.save();
  const growStart = 110;
  const growEnd = 180;

  // Dust cloud when growing back
  if (rumbleTimer > growStart && rumbleTimer <= growEnd + 20) {
    const growT = Math.min(1, (rumbleTimer - growStart) / (growEnd - growStart));
    // Ground dust billowing outward
    ctx.globalAlpha = 0.4 * (1 - Math.max(0, (rumbleTimer - growEnd) / 20));
    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI + Math.sin(rumbleTimer * 0.1 + i) * 0.3;
      const dist = growT * 40 + Math.sin(rumbleTimer * 0.15 + i * 1.5) * 10;
      const dx = winFighter.x + Math.cos(angle) * dist;
      const dy = winFighter.y + 5 - Math.abs(Math.sin(angle)) * 10;
      const dSize = 5 + growT * 8;
      ctx.fillStyle = '#8B7355';
      ctx.beginPath();
      ctx.arc(dx, dy, dSize, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  // Screen shake lines during growth (impact feel)
  if (rumbleTimer === growEnd) {
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 3;
    ctx.globalAlpha = 0.6;
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      const r1 = 30;
      const r2 = 60 + Math.random() * 30;
      ctx.beginPath();
      ctx.moveTo(winFighter.x + Math.cos(angle) * r1, winFighter.y - 30 + Math.sin(angle) * r1);
      ctx.lineTo(winFighter.x + Math.cos(angle) * r2, winFighter.y - 30 + Math.sin(angle) * r2);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
  }

  ctx.restore();
}

function drawTelatrineRumble(loseFighter, winFighter) {
  ctx.save();
  if (rumbleTelatrinePhase === 5 && rumbleTelatrineShrug > 0) {
    const f = winFighter.facing;
    const shrugT = Math.min(1, rumbleTelatrineShrug / 20);
    const color = winFighter.char ? winFighter.char.color : '#2e1a4a';
    const outline = winFighter.char ? winFighter.char.outline : '#1a0a2e';
    const accent = winFighter.char ? winFighter.char.accent : '#b366ff';
    ctx.save();
    ctx.translate(winFighter.x, winFighter.y);
    const armY = -44;
    const frontArmEndX = f * (20 + shrugT * 8);
    const frontArmEndY = armY - shrugT * 20;
    ctx.strokeStyle = outline; ctx.lineWidth = 6;
    ctx.beginPath(); ctx.moveTo(f * 14, armY); ctx.lineTo(frontArmEndX, frontArmEndY); ctx.stroke();
    ctx.strokeStyle = color; ctx.lineWidth = 4;
    ctx.beginPath(); ctx.moveTo(f * 14, armY); ctx.lineTo(frontArmEndX, frontArmEndY); ctx.stroke();
    ctx.fillStyle = accent;
    ctx.beginPath(); ctx.arc(frontArmEndX, frontArmEndY, 4, 0, Math.PI * 2); ctx.fill();
    const backArmEndX = -f * (20 + shrugT * 8);
    const backArmEndY = armY - shrugT * 20;
    ctx.strokeStyle = outline; ctx.lineWidth = 6;
    ctx.beginPath(); ctx.moveTo(-f * 14, armY); ctx.lineTo(backArmEndX, backArmEndY); ctx.stroke();
    ctx.strokeStyle = color; ctx.lineWidth = 4;
    ctx.beginPath(); ctx.moveTo(-f * 14, armY); ctx.lineTo(backArmEndX, backArmEndY); ctx.stroke();
    ctx.fillStyle = accent;
    ctx.beginPath(); ctx.arc(backArmEndX, backArmEndY, 4, 0, Math.PI * 2); ctx.fill();
    if (shrugT >= 1) {
      const bobble = Math.sin(Date.now() * 0.005) * 2;
      ctx.font = 'bold 24px Arial';
      ctx.textAlign = 'center';
      ctx.fillStyle = '#b366ff';
      ctx.fillText('?', 0, -85 + bobble);
    }
    ctx.restore();
  }
  ctx.globalAlpha = 1;
  ctx.restore();
}

function drawGolgarRumble(loseFighter, winFighter) {
  if (!rumbleGolgarEntity2) return;
  ctx.save();
  const e2 = rumbleGolgarEntity2;
  const df = e2.facing;
  const stoneColor = '#777788';
  const stoneDark = '#555566';
  const stoneLight = '#999aaa';

  // Draw entity 2 (the dormant one, now active)
  ctx.save();
  ctx.translate(e2.x, e2.y);

  // Shadow
  ctx.fillStyle = 'rgba(0,0,0,0.2)';
  ctx.beginPath();
  ctx.ellipse(0, 2, 30, 6, 0, 0, Math.PI * 2);
  ctx.fill();
  // Legs
  ctx.strokeStyle = stoneDark; ctx.lineWidth = 6; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(-df * 6, -8); ctx.lineTo(-df * 10, 0); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(df * 6, -8); ctx.lineTo(df * 10, 0); ctx.stroke();
  ctx.strokeStyle = stoneColor; ctx.lineWidth = 4;
  ctx.beginPath(); ctx.moveTo(-df * 6, -8); ctx.lineTo(-df * 10, 0); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(df * 6, -8); ctx.lineTo(df * 10, 0); ctx.stroke();
  // Feet
  ctx.fillStyle = stoneDark;
  ctx.beginPath(); ctx.arc(-df * 10, 0, 5, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(df * 10, 0, 5, 0, Math.PI * 2); ctx.fill();
  // Body
  ctx.fillStyle = stoneColor; ctx.strokeStyle = stoneDark; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.roundRect(-16, -48, 32, 40, 6); ctx.fill(); ctx.stroke();
  // Chest
  ctx.fillStyle = stoneLight;
  ctx.beginPath(); ctx.roundRect(-10, -40, 20, 20, 3); ctx.fill();

  // Arms — context dependent
  const armY = -36;
  if (rumbleGolgarPhase >= 1 && rumbleGolgarPhase <= 3) {
    // Arms reaching toward opponent (grab/windup/swing)
    ctx.strokeStyle = stoneDark; ctx.lineWidth = 6;
    ctx.beginPath(); ctx.moveTo(df * 14, armY); ctx.lineTo(df * 35, armY - 5); ctx.stroke();
    ctx.strokeStyle = stoneColor; ctx.lineWidth = 4;
    ctx.beginPath(); ctx.moveTo(df * 14, armY); ctx.lineTo(df * 35, armY - 5); ctx.stroke();
    ctx.fillStyle = stoneLight;
    ctx.beginPath(); ctx.arc(df * 35, armY - 5, 5, 0, Math.PI * 2); ctx.fill();
    // Back arm at rest
    ctx.strokeStyle = stoneDark; ctx.lineWidth = 6;
    ctx.beginPath(); ctx.moveTo(-df * 14, armY); ctx.lineTo(-df * 28, armY + 15); ctx.stroke();
    ctx.strokeStyle = stoneColor; ctx.lineWidth = 4;
    ctx.beginPath(); ctx.moveTo(-df * 14, armY); ctx.lineTo(-df * 28, armY + 15); ctx.stroke();
    ctx.fillStyle = stoneLight;
    ctx.beginPath(); ctx.arc(-df * 28, armY + 15, 4, 0, Math.PI * 2); ctx.fill();
  } else if (rumbleGolgarPhase === 5 || rumbleGolgarPhase === 6) {
    // High-five — front arm raised up
    ctx.strokeStyle = stoneDark; ctx.lineWidth = 6;
    ctx.beginPath(); ctx.moveTo(df * 14, armY); ctx.lineTo(df * 28, armY - 20); ctx.stroke();
    ctx.strokeStyle = stoneColor; ctx.lineWidth = 4;
    ctx.beginPath(); ctx.moveTo(df * 14, armY); ctx.lineTo(df * 28, armY - 20); ctx.stroke();
    ctx.fillStyle = stoneLight;
    ctx.beginPath(); ctx.arc(df * 28, armY - 20, 5, 0, Math.PI * 2); ctx.fill();
    // Back arm rest
    ctx.strokeStyle = stoneDark; ctx.lineWidth = 6;
    ctx.beginPath(); ctx.moveTo(-df * 14, armY); ctx.lineTo(-df * 28, armY + 15); ctx.stroke();
    ctx.strokeStyle = stoneColor; ctx.lineWidth = 4;
    ctx.beginPath(); ctx.moveTo(-df * 14, armY); ctx.lineTo(-df * 28, armY + 15); ctx.stroke();
    ctx.fillStyle = stoneLight;
    ctx.beginPath(); ctx.arc(-df * 28, armY + 15, 4, 0, Math.PI * 2); ctx.fill();
  } else {
    // Normal arms at rest
    ctx.strokeStyle = stoneDark; ctx.lineWidth = 6;
    ctx.beginPath(); ctx.moveTo(-df * 14, armY); ctx.lineTo(-df * 28, armY + 15); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(df * 14, armY); ctx.lineTo(df * 28, armY + 15); ctx.stroke();
    ctx.strokeStyle = stoneColor; ctx.lineWidth = 4;
    ctx.beginPath(); ctx.moveTo(-df * 14, armY); ctx.lineTo(-df * 28, armY + 15); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(df * 14, armY); ctx.lineTo(df * 28, armY + 15); ctx.stroke();
    ctx.fillStyle = stoneLight;
    ctx.beginPath(); ctx.arc(-df * 28, armY + 15, 4, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(df * 28, armY + 15, 4, 0, Math.PI * 2); ctx.fill();
  }

  // Head
  ctx.fillStyle = stoneLight; ctx.strokeStyle = stoneDark; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.arc(0, -64, 16, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
  // Eyes (awake — not dormant)
  ctx.fillStyle = '#8b7ec8';
  ctx.beginPath(); ctx.arc(-5, -66, 3, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(5, -66, 3, 0, Math.PI * 2); ctx.fill();
  // Eye highlights
  ctx.fillStyle = '#fff';
  ctx.beginPath(); ctx.arc(-4, -67, 1.5, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(6, -67, 1.5, 0, Math.PI * 2); ctx.fill();

  ctx.restore();

  // Draw entity 1's raised front arm for high-five (normal arm is hidden via _hideFrontArm)
  if ((rumbleGolgarPhase === 5 || rumbleGolgarPhase === 6) && winFighter._hideFrontArm) {
    ctx.save();
    ctx.translate(winFighter.x, winFighter.y);
    const wf = winFighter.facing;
    const wColor = winFighter.char ? winFighter.char.color : '#5a5a6e';
    const wOutline = winFighter.char ? winFighter.char.outline : '#2e2e3e';
    const wAccent = winFighter.char ? winFighter.char.accent : '#8b7ec8';
    const wArmY = -44;
    // Raised front arm
    ctx.strokeStyle = wOutline; ctx.lineWidth = 6;
    ctx.beginPath(); ctx.moveTo(wf * 14, wArmY); ctx.lineTo(wf * 28, wArmY - 20); ctx.stroke();
    ctx.strokeStyle = wColor; ctx.lineWidth = 4;
    ctx.beginPath(); ctx.moveTo(wf * 14, wArmY); ctx.lineTo(wf * 28, wArmY - 20); ctx.stroke();
    // Fist
    ctx.fillStyle = wAccent;
    ctx.beginPath(); ctx.arc(wf * 28, wArmY - 20, 5, 0, Math.PI * 2); ctx.fill();
    ctx.restore();
  }

  // High-five impact effect
  if (rumbleGolgarPhase === 6) {
    const midX = (winFighter.x + e2.x) / 2;
    const midY = winFighter.y - 56;
    // Impact star
    const hfT = (rumbleTimer - 251);
    if (hfT >= 0 && hfT < 20) {
      ctx.globalAlpha = 1 - hfT / 20;
      ctx.fillStyle = '#ffff44';
      ctx.beginPath();
      for (let i = 0; i < 8; i++) {
        const a = (i / 8) * Math.PI * 2;
        const r = i % 2 === 0 ? 8 + hfT * 0.5 : 3;
        if (i === 0) ctx.moveTo(midX + Math.cos(a) * r, midY + Math.sin(a) * r);
        else ctx.lineTo(midX + Math.cos(a) * r, midY + Math.sin(a) * r);
      }
      ctx.closePath();
      ctx.fill();
      ctx.globalAlpha = 1;
    }
  }

  // Launch trail (star burst when launched)
  if (rumbleGolgarPhase === 4 && !rumbleLoserHidden) {
    ctx.globalAlpha = 0.4;
    ctx.strokeStyle = '#8b7ec8';
    ctx.lineWidth = 2;
    for (let i = 0; i < 3; i++) {
      const trailX = loseFighter.x - f * (i + 1) * 15;
      const trailY = loseFighter.y + (i + 1) * 12;
      ctx.beginPath();
      ctx.arc(trailX, trailY, 4 - i, 0, Math.PI * 2);
      ctx.stroke();
    }
  }

  ctx.globalAlpha = 1;
  ctx.restore();
}

function drawCorvidaRumble(loseFighter, winFighter) {
  ctx.save();
  const groundY = loseFighter.groundY;
  const nestX = rumbleCorvidaNestX;
  const S = 2.5; // scale factor for nest/eggs/chicks — giant!

  // Draw nest (giant brown twigs bowl shape)
  if (rumbleCorvidaPhase >= 1) {
    const nestAlpha = rumbleCorvidaPhase === 1 ? Math.min(1, (rumbleTimer - 40) / 20) : 1;
    ctx.globalAlpha = nestAlpha;
    ctx.fillStyle = '#6b4a2a';
    ctx.beginPath();
    ctx.ellipse(nestX, groundY - 2, 110, 28, 0, 0, Math.PI * 2);
    ctx.fill();
    // Nest rim
    ctx.strokeStyle = '#553a1a';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.ellipse(nestX, groundY - 8, 115, 32, 0, 0, Math.PI, true);
    ctx.stroke();
    // Twigs
    ctx.strokeStyle = '#7a5a3a';
    ctx.lineWidth = 2.5;
    for (let i = 0; i < 12; i++) {
      const tx = nestX - 100 + i * 18 + Math.sin(i * 2.3) * 8;
      const ty = groundY - 6;
      ctx.beginPath();
      ctx.moveTo(tx, ty);
      ctx.lineTo(tx + 14 + Math.sin(i) * 6, ty - 5);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
  }

  // Draw eggs / hatchlings (giant)
  for (let i = 0; i < rumbleCorvidaEggs.length; i++) {
    const egg = rumbleCorvidaEggs[i];
    if (rumbleCorvidaPhase < 2) continue;
    if (!egg.landed && !egg.falling) continue; // not dropped yet

    const drawY = egg.landed ? egg.y : egg.fallY;

    ctx.save();
    ctx.translate(egg.x, drawY);

    if (!egg.hatched) {
      // Giant egg
      ctx.fillStyle = '#aaccee';
      ctx.strokeStyle = '#7799bb';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.ellipse(0, -14 * S, 10 * S, 16 * S, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      // Speckles
      ctx.fillStyle = '#88aacc';
      ctx.beginPath(); ctx.arc(-5 * S, -18 * S, 3, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(4 * S, -10 * S, 2.5, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(-2 * S, -8 * S, 2, 0, Math.PI * 2); ctx.fill();
    } else {
      // Giant hatchling
      // Shell halves
      ctx.fillStyle = '#aaccee';
      ctx.strokeStyle = '#7799bb';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.ellipse(-8 * S, -4, 8 * S, 12 * S, -0.2, 0, Math.PI * 2);
      ctx.fill(); ctx.stroke();
      ctx.beginPath();
      ctx.ellipse(8 * S, -4, 8 * S, 12 * S, 0.2, 0, Math.PI * 2);
      ctx.fill(); ctx.stroke();
      // Crack line
      ctx.strokeStyle = '#7799bb';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(-12 * S, -8);
      ctx.lineTo(-6 * S, -12); ctx.lineTo(-1 * S, -6); ctx.lineTo(3 * S, -12); ctx.lineTo(8 * S, -6); ctx.lineTo(12 * S, -10);
      ctx.stroke();

      // Chick head — giant
      const chickBob = Math.sin(Date.now() * 0.005 + i * 2) * 3;
      const mouthOpen = rumbleCorvidaPhase >= 5 ? 14 + Math.sin(Date.now() * 0.008 + i) * 4 : 0;
      const headY = -20 * S + chickBob;
      // Head
      ctx.fillStyle = '#5aa0e0';
      ctx.beginPath();
      ctx.arc(0, headY, 10 * S, 0, Math.PI * 2);
      ctx.fill();
      // Eye (skip if satisfied — happy closed eye drawn below)
      const isFedChick = rumbleCorvidaPhase >= 7 && i === rumbleCorvidaGulpChick;
      if (!isFedChick) {
        ctx.fillStyle = '#111';
        ctx.beginPath();
        ctx.arc(4 * S, headY - 2, 3, 0, Math.PI * 2);
        ctx.fill();
      }
      // Beak
      ctx.fillStyle = '#dd9933';
      const beakY = headY - 8 * S;
      if (mouthOpen > 0) {
        // Upper beak (open wide)
        ctx.beginPath();
        ctx.moveTo(-5 * S, beakY);
        ctx.lineTo(0, beakY - mouthOpen);
        ctx.lineTo(5 * S, beakY);
        ctx.closePath();
        ctx.fill();
        // Lower beak
        ctx.beginPath();
        ctx.moveTo(-5 * S, beakY);
        ctx.lineTo(0, beakY + 5);
        ctx.lineTo(5 * S, beakY);
        ctx.closePath();
        ctx.fill();
        // Pink mouth
        ctx.fillStyle = '#ee6666';
        ctx.beginPath();
        ctx.moveTo(-4 * S, beakY);
        ctx.lineTo(0, beakY - mouthOpen * 0.6);
        ctx.lineTo(4 * S, beakY);
        ctx.closePath();
        ctx.fill();
      } else {
        ctx.beginPath();
        ctx.moveTo(-4 * S, beakY);
        ctx.lineTo(5 * S, beakY - 2);
        ctx.lineTo(-2 * S, beakY + 4);
        ctx.closePath();
        ctx.fill();
      }

      // Satisfied chick after gulp
      if (rumbleCorvidaPhase >= 7 && i === rumbleCorvidaGulpChick) {
        // Bulging belly
        ctx.fillStyle = '#5aa0e0';
        ctx.beginPath();
        ctx.ellipse(0, -8, 14 * S, 12 * S, 0, 0, Math.PI * 2);
        ctx.fill();
        // Happy closed eyes
        ctx.strokeStyle = '#111';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(4 * S, headY - 2, 4, 0, Math.PI);
        ctx.stroke();
      }
    }

    ctx.restore();
  }

  // Draw giant blue jay (Corvida) — phases 1-7
  if (rumbleCorvidaPhase >= 1 && rumbleCorvidaPhase <= 7) {
    const jx = winFighter.x;
    const jy = winFighter.y;
    const f = winFighter.facing;
    const scale = 3; // 3x size
    const wingFlap = Math.sin(Date.now() * 0.012) * 0.5;

    ctx.save();
    ctx.translate(jx, jy);
    ctx.scale(scale, scale);

    // Body
    ctx.fillStyle = '#4a90d9';
    ctx.strokeStyle = '#1a1a2e';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.ellipse(0, -8, 14, 10, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    // White chest
    ctx.fillStyle = '#ddeeff';
    ctx.beginPath();
    ctx.ellipse(0, -5, 8, 6, 0, 0, Math.PI);
    ctx.fill();
    // Head
    ctx.fillStyle = '#4a90d9';
    ctx.beginPath();
    ctx.arc(f * 10, -14, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#1a1a2e';
    ctx.stroke();
    // Crest
    ctx.fillStyle = '#2a5fa8';
    ctx.beginPath();
    ctx.moveTo(f * 10, -22);
    ctx.lineTo(f * 6, -26);
    ctx.lineTo(f * 14, -20);
    ctx.closePath();
    ctx.fill();
    // Eye
    ctx.fillStyle = '#111';
    ctx.beginPath();
    ctx.arc(f * 13, -15, 2, 0, Math.PI * 2);
    ctx.fill();
    // Beak
    ctx.fillStyle = '#333';
    ctx.beginPath();
    ctx.moveTo(f * 18, -14);
    ctx.lineTo(f * 25, -13);
    ctx.lineTo(f * 18, -11);
    ctx.closePath();
    ctx.fill();
    // Necklace
    ctx.strokeStyle = '#111';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(f * 10, -10, 8, 0.3, Math.PI - 0.3);
    ctx.stroke();
    // Wings
    ctx.save();
    ctx.rotate(-wingFlap * f);
    ctx.fillStyle = '#3a7bc8';
    ctx.beginPath();
    ctx.moveTo(-f * 8, -11);
    ctx.lineTo(-f * 24, -23);
    ctx.lineTo(-f * 16, -6);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
    ctx.save();
    ctx.rotate(wingFlap * f);
    ctx.fillStyle = '#3a7bc8';
    ctx.beginPath();
    ctx.moveTo(f * 8, -11);
    ctx.lineTo(f * 24, -23);
    ctx.lineTo(f * 16, -6);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
    // Tail
    ctx.fillStyle = '#2a5fa8';
    ctx.beginPath();
    ctx.moveTo(-f * 10, -6);
    ctx.lineTo(-f * 22, -2);
    ctx.lineTo(-f * 20, -8);
    ctx.closePath();
    ctx.fill();
    // Feet/talons (carrying opponent in phases 4-6)
    ctx.strokeStyle = '#444';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(-3, 0);
    ctx.lineTo(-5, 6);
    ctx.moveTo(-5, 6);
    ctx.lineTo(-8, 8);
    ctx.moveTo(-5, 6);
    ctx.lineTo(-2, 8);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(3, 0);
    ctx.lineTo(5, 6);
    ctx.moveTo(5, 6);
    ctx.lineTo(2, 8);
    ctx.moveTo(5, 6);
    ctx.lineTo(8, 8);
    ctx.stroke();

    ctx.restore();
  }

  ctx.restore();
}

function drawCodemaxRumble(loseFighter, winFighter) {
  ctx.save();
  const f = winFighter.facing;

  // Charge-up glow on hand
  if (rumbleTimer <= 30) {
    const chargeT = rumbleTimer / 30;
    ctx.globalAlpha = chargeT * 0.6;
    ctx.fillStyle = '#00ff88';
    ctx.shadowColor = '#00ff88';
    ctx.shadowBlur = 15 * chargeT;
    ctx.beginPath();
    ctx.arc(winFighter.x + f * 22, winFighter.y - 35, 6 + chargeT * 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.globalAlpha = 1;
  }

  // Pixelated laser beam
  if (rumbleCodemaxLaser) {
    const sx = winFighter.x + f * 25;
    const sy = winFighter.y - 35;
    const ex = loseFighter.x;
    const ey = loseFighter.y - 30;
    const dx = ex - sx;
    const dy = ey - sy;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const steps = Math.floor(dist / 6);

    // Blocky pixelated beam — draw squares along the line
    for (let i = 0; i < steps; i++) {
      const t = i / steps;
      const bx = sx + dx * t;
      const by = sy + dy * t;
      const pixSize = 4 + Math.floor(Math.random() * 4);
      const brightness = Math.random() > 0.3 ? '#00ff88' : '#00cc66';
      ctx.fillStyle = brightness;
      ctx.fillRect(Math.floor(bx / pixSize) * pixSize, Math.floor(by / pixSize) * pixSize, pixSize, pixSize);
    }

    // Glow at impact point
    ctx.globalAlpha = 0.4;
    ctx.fillStyle = '#00ff88';
    ctx.shadowColor = '#00ff88';
    ctx.shadowBlur = 20;
    ctx.beginPath();
    ctx.arc(ex, ey, 15, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.globalAlpha = 1;
  }

  // Laser trail particles (pixelated green squares)
  for (const p of rumbleCodemaxLaserParticles) {
    if (p.alpha <= 0) continue;
    ctx.globalAlpha = p.alpha;
    ctx.fillStyle = '#00ff88';
    ctx.fillRect(Math.floor(p.x), Math.floor(p.y), Math.floor(p.size), Math.floor(p.size));
  }
  ctx.globalAlpha = 1;

  // Pixelated opponent replacement (fighter is hidden via _rumbleAlpha)
  if (rumbleCodemaxPixelLevel > 0 && !rumbleLoserHidden) {
    const loserChar = winner === 'player' ? selectedCPU : selectedPlayer;
    const lx = loseFighter.x;
    const ly = loseFighter.y; // feet/ground position
    // Fighter body area: roughly 60 wide, 85 tall from feet up
    const bodyW = 60;
    const bodyH = 85;
    const left = lx - bodyW / 2;
    const top = ly - bodyH;

    // Pixel size based on level: 5, 10, 16, 24
    const pixSizes = [0, 5, 10, 16, 24];
    const pixSize = pixSizes[rumbleCodemaxPixelLevel];

    // Color palette from the character — weighted toward body colors
    const colors = [loserChar.color, loserChar.color, loserChar.accent, loserChar.outline, loserChar.color, loserChar.accent];

    // Build a fighter-shaped silhouette out of pixel blocks
    for (let py = top; py < top + bodyH; py += pixSize) {
      for (let px = left; px < left + bodyW; px += pixSize) {
        // Shape mask: narrower at head and feet, wider at torso
        const relY = (py - top) / bodyH; // 0=top, 1=bottom
        let halfWidth;
        if (relY < 0.22) {
          // Head region — narrow circle
          halfWidth = 10 + (relY / 0.22) * 5;
        } else if (relY < 0.7) {
          // Torso region — wider
          halfWidth = 18 + Math.sin((relY - 0.22) / 0.48 * Math.PI) * 8;
        } else {
          // Legs — narrower, split
          halfWidth = 16 - (relY - 0.7) / 0.3 * 4;
        }
        const distFromCenter = Math.abs((px + pixSize / 2) - lx);
        if (distFromCenter > halfWidth) continue;

        // Deterministic color based on grid position
        const hash = (Math.floor(px / pixSize) * 7 + Math.floor(py / pixSize) * 13 + rumbleCodemaxPixelLevel * 5) & 0xff;
        const colorIdx = hash % colors.length;
        ctx.fillStyle = colors[colorIdx];
        ctx.fillRect(px, py, pixSize - 1, pixSize - 1);
      }
    }
  }

  // Glitch effect — horizontal bars, blink, static
  if (rumbleCodemaxGlitch > 0) {
    const lx = loseFighter.x;
    const ly = loseFighter.y;
    const glitchT = rumbleCodemaxGlitch;

    if (!rumbleLoserHidden) {
      // Horizontal offset glitch bars over the pixelated body
      ctx.globalAlpha = 0.7;
      for (let i = 0; i < 6; i++) {
        const barY = ly - 85 + ((glitchT * 7 + i * 17) % 90);
        const barShift = Math.sin(glitchT * 0.3 + i * 1.7) * (8 + glitchT * 0.2);
        ctx.fillStyle = i % 3 === 0 ? '#00ff88' : i % 3 === 1 ? '#ff0044' : '#0088ff';
        ctx.fillRect(lx - 30 + barShift, barY, 60, 3);
      }

      // Blinking — black flashes
      if (glitchT > 15 && Math.floor(glitchT / 3) % 3 === 0) {
        ctx.globalAlpha = 0.5;
        ctx.fillStyle = '#000';
        ctx.fillRect(lx - 35, ly - 90, 70, 95);
      }

      // Static noise
      if (glitchT > 25) {
        ctx.globalAlpha = 0.5;
        for (let i = 0; i < 20; i++) {
          const nx = lx - 30 + Math.random() * 60;
          const ny = ly - 85 + Math.random() * 90;
          ctx.fillStyle = ['#00ff88', '#ffffff', '#ff0044', '#0088ff'][Math.floor(Math.random() * 4)];
          const ns = 2 + Math.random() * 5;
          ctx.fillRect(nx, ny, ns, ns);
        }
      }
    }

    ctx.globalAlpha = 1;
  }

  ctx.restore();
}

function drawHaystackRumble(loseFighter, winFighter) {
  ctx.save();
  const f = winFighter.facing;

  // Draw ravens
  for (const r of rumbleHaystackRavens) {
    if (r.y < -50 || r.x < -100 || r.x > 1060) continue;
    ctx.save();
    ctx.translate(r.x, r.y);

    const wingFlap = Math.sin(r.wingPhase) * 0.6;

    // Body
    ctx.fillStyle = '#111';
    ctx.beginPath();
    ctx.ellipse(0, 0, 8, 5, 0, 0, Math.PI * 2);
    ctx.fill();

    // Head
    ctx.beginPath();
    ctx.arc(f * 6, -3, 4, 0, Math.PI * 2);
    ctx.fill();

    // Beak
    ctx.fillStyle = '#444';
    ctx.beginPath();
    ctx.moveTo(f * 10, -3);
    ctx.lineTo(f * 15, -2);
    ctx.lineTo(f * 10, -1);
    ctx.closePath();
    ctx.fill();

    // Eye
    ctx.fillStyle = '#ff3300';
    ctx.beginPath();
    ctx.arc(f * 7, -4, 1.5, 0, Math.PI * 2);
    ctx.fill();

    // Wings
    ctx.fillStyle = '#222';
    // Left wing
    ctx.save();
    ctx.rotate(-wingFlap);
    ctx.beginPath();
    ctx.moveTo(-3, -2);
    ctx.lineTo(-18, -10);
    ctx.lineTo(-10, 2);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
    // Right wing
    ctx.save();
    ctx.rotate(wingFlap);
    ctx.beginPath();
    ctx.moveTo(3, -2);
    ctx.lineTo(18, -10);
    ctx.lineTo(10, 2);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    ctx.restore();
  }

  // Scythe in Haystack's hand
  if (rumbleHaystackScythe && !rumbleHaystackStrike) {
    const sx = winFighter.x + f * 20;
    const sy = winFighter.y - 45;

    // Handle
    ctx.strokeStyle = '#553311';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(sx, sy + 30);
    ctx.lineTo(sx + f * 5, sy - 25);
    ctx.stroke();

    // Blade
    ctx.fillStyle = '#aabbcc';
    ctx.strokeStyle = '#667788';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(sx + f * 5, sy - 25);
    ctx.quadraticCurveTo(sx + f * 35, sy - 30, sx + f * 40, sy - 10);
    ctx.quadraticCurveTo(sx + f * 30, sy - 15, sx + f * 5, sy - 20);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Gleam
    if (rumbleTimer > 120 && rumbleTimer < 160) {
      const gleamT = ((rumbleTimer - 120) % 20) / 20;
      ctx.globalAlpha = 0.6 * (1 - Math.abs(gleamT - 0.5) * 2);
      ctx.fillStyle = '#ffffff';
      const gx = sx + f * (10 + gleamT * 30);
      const gy = sy - 25 + gleamT * 10;
      ctx.beginPath();
      ctx.arc(gx, gy, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
    }
  }

  // Scythe slash effect during strike
  if (rumbleHaystackStrike && rumbleTimer <= 215) {
    const slashT = (rumbleTimer - 205) / 10;
    ctx.globalAlpha = Math.max(0, 1 - slashT);
    ctx.strokeStyle = '#ddeeff';
    ctx.lineWidth = 3;
    ctx.beginPath();
    const slashX = loseFighter.x;
    const slashY = loseFighter.y - 50;
    ctx.arc(slashX, slashY, 40, -Math.PI * 0.3, Math.PI * 0.8);
    ctx.stroke();
    // Inner bright slash
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(slashX, slashY, 35, -Math.PI * 0.2, Math.PI * 0.7);
    ctx.stroke();
    ctx.globalAlpha = 1;
  }

  // Dust cloud from dissolved opponent
  for (const d of rumbleHaystackDust) {
    if (d.alpha <= 0) continue;
    ctx.globalAlpha = d.alpha;
    ctx.fillStyle = d.color;
    ctx.beginPath();
    ctx.arc(d.x, d.y, d.size, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;

  ctx.restore();
}

function drawSnazzRumble(loseFighter, winFighter) {
  ctx.save();

  // Disco ball
  if (rumbleSnazzDiscoBall) {
    const bx = 480; // center of screen
    const by = rumbleSnazzDiscoBall.y;

    // String from ceiling
    ctx.strokeStyle = '#888';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(bx, 0);
    ctx.lineTo(bx, by - 18);
    ctx.stroke();

    // Ball body — silver sphere
    const ballR = 18;
    const ballGrad = ctx.createRadialGradient(bx - 4, by - 5, 0, bx, by, ballR);
    ballGrad.addColorStop(0, '#ffffff');
    ballGrad.addColorStop(0.4, '#ccccdd');
    ballGrad.addColorStop(0.8, '#8888aa');
    ballGrad.addColorStop(1, '#555566');
    ctx.fillStyle = ballGrad;
    ctx.beginPath();
    ctx.arc(bx, by, ballR, 0, Math.PI * 2);
    ctx.fill();

    // Mirror tiles on the ball
    const t = Date.now() * 0.002;
    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * Math.PI * 2 + t;
      const row = (i % 3 - 1) * 6;
      const tx = bx + Math.cos(a) * (ballR - 4);
      const ty = by + row + Math.sin(a) * 3;
      const inBall = Math.sqrt((tx - bx) ** 2 + (ty - by) ** 2) < ballR - 2;
      if (inBall) {
        ctx.fillStyle = i % 2 === 0 ? 'rgba(255,255,255,0.7)' : 'rgba(200,200,230,0.5)';
        ctx.fillRect(tx - 2, ty - 2, 4, 4);
      }
    }

    // Light beams radiating from disco ball (during dance)
    if (rumbleTimer > 30 && rumbleTimer < 310) {
      ctx.globalAlpha = 0.08;
      const beamColors = ['#ff00ff', '#00ffff', '#ffff00', '#ff4400', '#44ff00'];
      for (let i = 0; i < 8; i++) {
        const a = (i / 8) * Math.PI * 2 + t * 1.5;
        const endX = bx + Math.cos(a) * 500;
        const endY = by + Math.sin(a) * 500;
        ctx.strokeStyle = beamColors[i % beamColors.length];
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(bx, by);
        ctx.lineTo(endX, endY);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
    }
  }

  // Confetti
  for (const c of rumbleSnazzConfetti) {
    if (c.alpha <= 0) continue;
    ctx.save();
    ctx.globalAlpha = c.alpha;
    ctx.translate(c.x, c.y);
    ctx.rotate(c.rot);
    ctx.fillStyle = c.color;
    // Rectangular confetti piece
    ctx.fillRect(-c.size / 2, -c.size / 4, c.size, c.size / 2);
    ctx.restore();
  }

  // Knocked out opponent lying flat on the ground
  if (rumbleSnazzPunchLanded && rumbleTimer > 320) {
    // Impact stars around opponent's head
    const starsAlpha = Math.max(0, 1 - (rumbleTimer - 320) / 60);
    if (starsAlpha > 0) {
      ctx.globalAlpha = starsAlpha;
      ctx.fillStyle = '#ffff00';
      const starT = rumbleTimer * 0.06;
      for (let i = 0; i < 3; i++) {
        const sa = starT + (i / 3) * Math.PI * 2;
        const sr = 12;
        const sx = loseFighter.x + Math.cos(sa) * sr;
        const sy = loseFighter.y - 55 + Math.sin(sa) * sr * 0.5;
        // Small star shape
        ctx.beginPath();
        for (let j = 0; j < 5; j++) {
          const a2 = (j / 5) * Math.PI * 2 - Math.PI / 2;
          const r2 = j % 2 === 0 ? 4 : 2;
          if (j === 0) ctx.moveTo(sx + Math.cos(a2) * r2, sy + Math.sin(a2) * r2);
          else ctx.lineTo(sx + Math.cos(a2) * r2, sy + Math.sin(a2) * r2);
        }
        ctx.closePath();
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    }
  }

  ctx.restore();
}

function drawTorrenaRumble(loseFighter, winFighter) {
  ctx.save();

  // Draw evaporation steam particles
  for (const p of rumbleTorrenaEvapParticles) {
    ctx.globalAlpha = p.alpha;
    ctx.fillStyle = `rgba(100,200,255,${p.alpha})`;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;

  // Draw cloud (phases 2+)
  if (rumbleTorrenaPhase >= 2) {
    const cx = rumbleTorrenaCloudX;
    const cy = rumbleTorrenaCloudY;

    // Cloud alpha — fade in during formation, fade out during settle
    let cloudAlpha = 1;
    if (rumbleTorrenaPhase === 2) {
      const formT = Math.min(1, (rumbleTimer - 70) / 20);
      cloudAlpha = formT;
    } else if (rumbleTorrenaPhase >= 6) {
      const fadeT = Math.min(1, (rumbleTimer - 320) / 60);
      cloudAlpha = 1 - fadeT;
    }

    // Cloud darkens during hail formation
    const isDark = rumbleTorrenaPhase >= 4;
    const cloudColor = isDark ? '#556' : '#aaccdd';
    const cloudDark = isDark ? '#334' : '#88aabb';

    ctx.globalAlpha = cloudAlpha;

    // Main cloud body — overlapping ellipses
    ctx.fillStyle = cloudColor;
    ctx.beginPath();
    ctx.ellipse(cx, cy, 55, 25, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(cx - 30, cy + 5, 30, 20, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(cx + 30, cy + 5, 30, 20, 0, 0, Math.PI * 2);
    ctx.fill();
    // Top puffs
    ctx.beginPath();
    ctx.ellipse(cx - 15, cy - 12, 25, 18, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(cx + 15, cy - 12, 25, 18, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(cx, cy - 18, 20, 15, 0, 0, Math.PI * 2);
    ctx.fill();

    // Darker underside
    ctx.fillStyle = cloudDark;
    ctx.globalAlpha = cloudAlpha * 0.5;
    ctx.beginPath();
    ctx.ellipse(cx, cy + 10, 50, 15, 0, 0, Math.PI * 2);
    ctx.fill();

    // Torrena's eyes on the cloud (matching normal fighter eye style)
    ctx.globalAlpha = cloudAlpha;
    const eyeY = cy - 2;
    // Dark filled circles
    ctx.fillStyle = isDark ? '#112' : '#0d4f6b';
    ctx.beginPath();
    ctx.arc(cx - 8, eyeY, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(cx + 8, eyeY, 3, 0, Math.PI * 2);
    ctx.fill();
    // White highlights
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(cx - 7, eyeY - 1, 1.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(cx + 9, eyeY - 1, 1.5, 0, Math.PI * 2);
    ctx.fill();

    ctx.globalAlpha = 1;
  }

  // Draw raindrops
  for (const r of rumbleRaindrops) {
    if (r.alpha <= 0) continue;
    ctx.globalAlpha = r.alpha;
    if (r.isIce) {
      // Ice shard — light blue angular
      ctx.fillStyle = '#aaddff';
      ctx.save();
      ctx.translate(r.x, r.y);
      ctx.rotate(r.vx * 0.5);
      ctx.fillRect(-r.size / 2, -r.size / 2, r.size, r.size * 0.6);
      ctx.restore();
    } else {
      // Rain streak
      ctx.strokeStyle = '#66bbee';
      ctx.lineWidth = r.size;
      ctx.beginPath();
      ctx.moveTo(r.x, r.y);
      ctx.lineTo(r.x - r.vx * 2, r.y - r.vy * 2);
      ctx.stroke();
    }
  }
  ctx.globalAlpha = 1;

  // Draw hailstone (before or after cracking)
  if (rumbleHailstone && rumbleHailstone.size > 0) {
    const hx = rumbleHailstone.x;
    const hy = rumbleHailstone.y;
    const hs = rumbleHailstone.size;

    if (!rumbleHailCracked) {
      // Intact hailstone falling

      // Shadow on ground
      if (rumbleTorrenaPhase >= 5) {
        ctx.globalAlpha = 0.3;
        ctx.fillStyle = '#000';
        ctx.beginPath();
        ctx.ellipse(hx, loseFighter.groundY, hs * 0.8, 5, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      // Main hailstone — icy sphere
      const hailGrad = ctx.createRadialGradient(hx - hs * 0.2, hy - hs * 0.3, 0, hx, hy, hs);
      hailGrad.addColorStop(0, '#ffffff');
      hailGrad.addColorStop(0.3, '#cceeff');
      hailGrad.addColorStop(0.7, '#88bbdd');
      hailGrad.addColorStop(1, '#5588aa');
      ctx.fillStyle = hailGrad;
      ctx.beginPath();
      ctx.arc(hx, hy, hs, 0, Math.PI * 2);
      ctx.fill();

      // Internal crack lines
      ctx.strokeStyle = 'rgba(200,230,255,0.6)';
      ctx.lineWidth = 1;
      for (let i = 0; i < 4; i++) {
        const a = (i / 4) * Math.PI * 2 + 0.3;
        ctx.beginPath();
        ctx.moveTo(hx, hy);
        ctx.lineTo(hx + Math.cos(a) * hs * 0.7, hy + Math.sin(a) * hs * 0.7);
        ctx.stroke();
      }

      // Shine highlight
      ctx.fillStyle = 'rgba(255,255,255,0.5)';
      ctx.beginPath();
      ctx.arc(hx - hs * 0.25, hy - hs * 0.25, hs * 0.2, 0, Math.PI * 2);
      ctx.fill();
    } else {
      // Cracked hailstone sitting on ground — broken into chunks
      const groundY = loseFighter.groundY;
      // Two large halves sitting on the ground
      ctx.fillStyle = '#88bbdd';
      ctx.strokeStyle = '#5588aa';
      ctx.lineWidth = 1.5;
      // Left half
      ctx.beginPath();
      ctx.ellipse(hx - hs * 0.4, groundY - hs * 0.3, hs * 0.5, hs * 0.4, -0.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      // Right half
      ctx.beginPath();
      ctx.ellipse(hx + hs * 0.4, groundY - hs * 0.25, hs * 0.45, hs * 0.35, 0.3, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      // Smaller chunks
      ctx.fillStyle = '#aaddff';
      for (let i = 0; i < 4; i++) {
        const cx = hx + (i - 1.5) * hs * 0.3;
        const cy = groundY - 2 - Math.abs(i - 1.5) * 3;
        ctx.beginPath();
        ctx.arc(cx, cy, hs * 0.15 + i * 0.5, 0, Math.PI * 2);
        ctx.fill();
      }
      // Ice shine on halves
      ctx.fillStyle = 'rgba(255,255,255,0.4)';
      ctx.beginPath();
      ctx.arc(hx - hs * 0.5, groundY - hs * 0.45, hs * 0.12, 0, Math.PI * 2);
      ctx.fill();
      // Crack line through center
      ctx.strokeStyle = '#cceeff';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(hx - 2, groundY - hs * 0.6);
      ctx.lineTo(hx + 1, groundY);
      ctx.stroke();
    }
  }

  // Draw flying hail shards
  for (const s of rumbleHailShards) {
    if (s.alpha <= 0) continue;
    ctx.save();
    ctx.globalAlpha = s.alpha;
    ctx.translate(s.x, s.y);
    ctx.rotate(s.rot);
    ctx.fillStyle = '#aaddff';
    ctx.strokeStyle = '#5588aa';
    ctx.lineWidth = 1;
    // Angular ice shard shape
    ctx.beginPath();
    ctx.moveTo(0, -s.size);
    ctx.lineTo(s.size * 0.6, 0);
    ctx.lineTo(0, s.size * 0.4);
    ctx.lineTo(-s.size * 0.6, 0);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }

  // Ground cracks after impact
  if (rumbleHailCracked) {
    const crackX = loseFighter.x;
    const crackY = loseFighter.groundY;
    // Use fixed seed-like values so cracks don't jitter every frame
    ctx.strokeStyle = '#444';
    ctx.lineWidth = 2;
    const crackAngles = [0.3, 1.1, 1.9, 2.7, 3.5, 4.3, 5.1, 5.9];
    const crackLens = [25, 35, 20, 40, 30, 22, 38, 28];
    for (let i = 0; i < crackAngles.length; i++) {
      const a = crackAngles[i];
      const len = crackLens[i];
      ctx.beginPath();
      ctx.moveTo(crackX, crackY);
      // Jagged crack with one midpoint
      const mx = crackX + Math.cos(a) * len * 0.5 + Math.sin(a * 3) * 5;
      const my = crackY + Math.sin(a) * len * 0.2 + Math.cos(a * 2) * 3;
      ctx.lineTo(mx, my);
      ctx.lineTo(crackX + Math.cos(a) * len, crackY + Math.sin(a) * len * 0.3);
      ctx.stroke();
    }
  }

  // Flattened opponent (pancake) under the hailstone
  if (rumbleHailCracked && rumbleLoserHidden) {
    const lx = loseFighter.x;
    const ly = loseFighter.groundY;
    const loserChar = winner === 'player' ? selectedCPU : selectedPlayer;
    ctx.globalAlpha = 0.8;
    // Flat oval (squished body)
    ctx.fillStyle = loserChar.color;
    ctx.strokeStyle = loserChar.outline || '#333';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.ellipse(lx, ly - 2, 25, 4, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    // Tiny eyes on the flat shape
    ctx.fillStyle = loserChar.outline || '#333';
    ctx.beginPath();
    ctx.arc(lx - 6, ly - 3, 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(lx + 6, ly - 3, 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
  }

  ctx.restore();
}

function drawRubbermanRumble(loseFighter, winFighter) {
  ctx.save();

  // Draw Rubberman's stretched arm connecting to the opponent (matches normal arm style)
  if (rumbleActive && rumbleType === 'RUBBERMAN' && !rumbleLoserHidden && rumbleTimer > 5) {
    // Use opponent-relative direction for arm start so it doesn't jump when facing flips
    const armDir = loseFighter.x >= winFighter.x ? 1 : -1;
    const armStartX = winFighter.x + armDir * 14;
    const armStartY = winFighter.y - 35;
    // During grab phase, arm extends progressively toward opponent
    const grabT = rumbleTimer <= 30 ? Math.min(1, rumbleTimer / 30) : 1;
    const armEndX = armStartX + (loseFighter.x - armStartX) * grabT;
    const armEndY = armStartY + ((loseFighter.y - 20) - armStartY) * grabT;

    const outline = winFighter.char ? winFighter.char.outline : '#333';
    const color = winFighter.char ? winFighter.char.color : '#888';
    const accent = winFighter.char ? winFighter.char.accent : '#ccc';

    // Straight arm — outline then color, matching fighter arm style
    ctx.lineCap = 'round';
    ctx.strokeStyle = outline;
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(armStartX, armStartY);
    ctx.lineTo(armEndX, armEndY);
    ctx.stroke();
    ctx.strokeStyle = color;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(armStartX, armStartY);
    ctx.lineTo(armEndX, armEndY);
    ctx.stroke();

    // Fist at the end
    ctx.fillStyle = accent;
    ctx.beginPath();
    ctx.arc(armEndX, armEndY, 5, 0, Math.PI * 2);
    ctx.fill();
  }

  // Ground impact dust at slam points
  if (rumbleTetherSlams > 0) {
    // Small dust puffs at each slam
    const slamAge = (rumbleTimer - 30) % 35; // rough per-slam timing
    if (slamAge < 15) {
      ctx.globalAlpha = Math.max(0, 1 - slamAge / 15);
      for (let i = 0; i < 4; i++) {
        const dustX = loseFighter.x + (Math.random() - 0.5) * 40;
        const dustY = loseFighter.groundY - Math.random() * slamAge * 1.5;
        ctx.fillStyle = '#a08060';
        ctx.beginPath();
        ctx.arc(dustX, dustY, 3 + Math.random() * 4, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    }
  }

  // Cracked ground at final smash point
  if (rumbleTetherCracked) {
    const crackX = rumbleTetherGrabX; // stored from final smash position
    const crackY = loseFighter.groundY;

    // Crater depression — wider for face-down body
    ctx.fillStyle = '#5a4830';
    ctx.beginPath();
    ctx.ellipse(crackX, crackY, 45, 12, 0, 0, Math.PI * 2);
    ctx.fill();

    // Crack lines radiating outward
    ctx.strokeStyle = '#4a3820';
    ctx.lineWidth = 2;
    for (let i = 0; i < 10; i++) {
      const angle = (i / 10) * Math.PI * 2 + 0.2;
      const len = 25 + Math.sin(i * 2.7) * 18;
      ctx.beginPath();
      ctx.moveTo(crackX + Math.cos(angle) * 10, crackY + Math.sin(angle) * 4);
      ctx.lineTo(crackX + Math.cos(angle) * len, crackY + Math.sin(angle) * len * 0.25);
      ctx.stroke();
    }

    // Rubble chunks around crater
    ctx.fillStyle = '#7a6850';
    for (let i = 0; i < 6; i++) {
      const rx = crackX - 30 + i * 12 + Math.sin(i * 3) * 5;
      const ry = crackY - 3 - Math.sin(i * 2.1) * 3;
      ctx.beginPath();
      ctx.arc(rx, ry, 2 + Math.sin(i) * 1.5, 0, Math.PI * 2);
      ctx.fill();
    }

    // Opponent face-down flat in the crater
    if (rumbleLoserHidden) {
      const loserChar = winner === 'player' ? selectedCPU : selectedPlayer;
      const bodyColor = loserChar.color;
      const bodyOutline = loserChar.outline || '#333';
      const bodyAccent = loserChar.accent || '#aaa';
      const f = winFighter.facing; // they face away from Rubberman

      // Flattened body — horizontal oval (torso)
      ctx.fillStyle = bodyColor;
      ctx.strokeStyle = bodyOutline;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.ellipse(crackX, crackY - 4, 22, 7, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Head — face-down circle at the far end
      ctx.fillStyle = bodyAccent;
      ctx.strokeStyle = bodyOutline;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(crackX + f * 22, crackY - 5, 9, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Arms splayed out
      ctx.strokeStyle = bodyOutline;
      ctx.lineWidth = 5;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(crackX + f * 8, crackY - 5);
      ctx.lineTo(crackX + f * 8 + 18, crackY - 14);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(crackX - f * 5, crackY - 5);
      ctx.lineTo(crackX - f * 5 - 16, crackY - 12);
      ctx.stroke();
      ctx.strokeStyle = bodyColor;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(crackX + f * 8, crackY - 5);
      ctx.lineTo(crackX + f * 8 + 18, crackY - 14);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(crackX - f * 5, crackY - 5);
      ctx.lineTo(crackX - f * 5 - 16, crackY - 12);
      ctx.stroke();

      // Legs trailing behind
      ctx.strokeStyle = bodyOutline;
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(crackX - f * 15, crackY - 3);
      ctx.lineTo(crackX - f * 35, crackY - 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(crackX - f * 15, crackY - 1);
      ctx.lineTo(crackX - f * 33, crackY + 2);
      ctx.stroke();
      ctx.strokeStyle = bodyColor;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(crackX - f * 15, crackY - 3);
      ctx.lineTo(crackX - f * 35, crackY - 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(crackX - f * 15, crackY - 1);
      ctx.lineTo(crackX - f * 33, crackY + 2);
      ctx.stroke();

      // Feet
      ctx.fillStyle = bodyOutline;
      ctx.beginPath();
      ctx.arc(crackX - f * 35, crackY - 2, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(crackX - f * 33, crackY + 2, 4, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  ctx.restore();
}

function drawBojdoStompRumble(loseFighter, winFighter) {
  ctx.save();
  const stompFrame = 100;

  // Ground crack / impact effect on stomp
  if (rumbleTimer >= stompFrame && rumbleTimer < stompFrame + 30) {
    const impactAge = rumbleTimer - stompFrame;
    const impactAlpha = Math.max(0, 1 - impactAge / 30);
    ctx.globalAlpha = impactAlpha;

    // Radial crack lines from stomp point
    const cx = loseFighter.x;
    const cy = loseFighter.groundY;
    ctx.strokeStyle = '#8B7355';
    ctx.lineWidth = 3;
    for (let i = 0; i < 10; i++) {
      const angle = (i / 10) * Math.PI - Math.PI / 2 + (Math.random() - 0.5) * 0.3;
      const len = 20 + impactAge * 3 + Math.random() * 20;
      ctx.beginPath();
      ctx.moveTo(cx + Math.cos(angle) * 10, cy + Math.sin(angle) * 5);
      ctx.lineTo(cx + Math.cos(angle) * len, cy + Math.sin(angle) * len * 0.3);
      ctx.stroke();
    }

    // Dust clouds billowing outward
    ctx.globalAlpha = impactAlpha * 0.6;
    for (let i = 0; i < 8; i++) {
      const dustAngle = (i / 8) * Math.PI;
      const dustDist = impactAge * 4 + i * 5;
      const dustX = cx + Math.cos(dustAngle - Math.PI / 2) * dustDist;
      const dustY = cy - Math.abs(Math.sin(dustAngle)) * impactAge * 1.5;
      const dustSize = 8 + impactAge * 0.5;
      ctx.fillStyle = '#a08060';
      ctx.beginPath();
      ctx.arc(dustX, dustY, dustSize, 0, Math.PI * 2);
      ctx.fill();
    }

    // Screen darkening flash on impact
    if (impactAge < 5) {
      ctx.globalAlpha = (5 - impactAge) / 5 * 0.3;
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, 960, 540);
    }
  }

  // Flattened opponent (pancake) on the ground after stomp
  if (rumbleLoserHidden && rumbleTimer >= stompFrame) {
    const lx = loseFighter.x;
    const ly = loseFighter.groundY;
    const loserChar = winner === 'player' ? selectedCPU : selectedPlayer;
    ctx.globalAlpha = 0.8;
    // Flat oval (squished body)
    ctx.fillStyle = loserChar.color;
    ctx.strokeStyle = loserChar.outline || '#333';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.ellipse(lx, ly - 2, 25, 4, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    // Tiny eyes on the flat shape
    ctx.fillStyle = loserChar.outline || '#333';
    ctx.beginPath();
    ctx.arc(lx - 6, ly - 3, 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(lx + 6, ly - 3, 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
  }

  ctx.restore();
}

function drawBlazeRumble(loseFighter) {
  const lx = loseFighter.x;
  const groundY = loseFighter.groundY; // feet level
  const pillarWidth = 70;
  const pillarMaxHeight = 300;

  // Phase calculations
  const riseEnd = 30;
  const blazeEnd = 120;
  const fadeEnd = 150;

  if (rumbleTimer < fadeEnd) {
    // Calculate pillar height
    let pillarHeight, pillarAlpha;
    if (rumbleTimer < riseEnd) {
      // Rising phase
      const t = rumbleTimer / riseEnd;
      pillarHeight = pillarMaxHeight * t * t; // ease-in
      pillarAlpha = 0.7 + 0.3 * t;
    } else if (rumbleTimer < blazeEnd) {
      // Full blaze
      pillarHeight = pillarMaxHeight;
      pillarAlpha = 1.0;
    } else {
      // Fading
      const t = (rumbleTimer - blazeEnd) / (fadeEnd - blazeEnd);
      pillarHeight = pillarMaxHeight * (1 - t * t);
      pillarAlpha = 1.0 - t;
    }

    ctx.save();
    ctx.globalAlpha = pillarAlpha;

    // Fire pillar gradient
    const grad = ctx.createLinearGradient(lx, groundY, lx, groundY - pillarHeight);
    grad.addColorStop(0, '#ff4400');
    grad.addColorStop(0.3, '#ff6600');
    grad.addColorStop(0.6, '#ffaa00');
    grad.addColorStop(1, '#ffee44');

    // Main pillar body
    ctx.fillStyle = grad;
    ctx.fillRect(lx - pillarWidth / 2, groundY - pillarHeight, pillarWidth, pillarHeight);

    // Inner bright core
    const coreGrad = ctx.createLinearGradient(lx, groundY, lx, groundY - pillarHeight);
    coreGrad.addColorStop(0, 'rgba(255,255,200,0.8)');
    coreGrad.addColorStop(0.5, 'rgba(255,200,100,0.5)');
    coreGrad.addColorStop(1, 'rgba(255,255,100,0.2)');
    ctx.fillStyle = coreGrad;
    ctx.fillRect(lx - pillarWidth / 4, groundY - pillarHeight, pillarWidth / 2, pillarHeight);

    // Flickering edge flames
    const flicker = Math.sin(rumbleTimer * 0.5) * 8;
    const flicker2 = Math.cos(rumbleTimer * 0.7) * 6;
    for (let i = 0; i < 12; i++) {
      const fy = groundY - (i / 12) * pillarHeight;
      const fx = lx + (i % 2 === 0 ? -1 : 1) * (pillarWidth / 2 + Math.sin(rumbleTimer * 0.3 + i) * 12 + flicker);
      const fSize = 6 + Math.sin(rumbleTimer * 0.4 + i * 2) * 4;
      ctx.beginPath();
      ctx.arc(fx + flicker2 * 0.3, fy, fSize, 0, Math.PI * 2);
      ctx.fillStyle = i % 3 === 0 ? '#ffee44' : i % 3 === 1 ? '#ff6600' : '#ff2200';
      ctx.fill();
    }

    // Glow around pillar
    ctx.shadowColor = '#ff4400';
    ctx.shadowBlur = 40;
    ctx.fillStyle = 'rgba(255,68,0,0.15)';
    ctx.fillRect(lx - pillarWidth, groundY - pillarHeight, pillarWidth * 2, pillarHeight);
    ctx.shadowBlur = 0;

    ctx.restore();
  }

  // Draw ashes
  if (rumbleAshes) {
    drawAshPile(rumbleAshes.x, rumbleAshes.y);
  }
}

function drawShadeRumble(loseFighter, winFighter) {
  ctx.save();

  // Impact flashes on combo hits
  if (loseFighter.flashTimer > 0 && !rumbleShadePoof) {
    ctx.globalAlpha = 0.4;
    ctx.fillStyle = '#ffffff';
    const impactX = loseFighter.x + (Math.random() - 0.5) * 20;
    const impactY = loseFighter.y - 30 + (Math.random() - 0.5) * 20;
    ctx.beginPath();
    ctx.arc(impactX, impactY, 8 + Math.random() * 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
  }

  // Smoke puff particles
  for (const p of rumbleSmokeParticles) {
    if (p.alpha <= 0) continue;
    ctx.save();
    ctx.globalAlpha = p.alpha;
    const gray = `rgb(${p.shade},${p.shade},${p.shade})`;
    ctx.fillStyle = gray;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();
    // Lighter inner highlight
    ctx.fillStyle = `rgba(${p.shade + 40},${p.shade + 40},${p.shade + 40},0.3)`;
    ctx.beginPath();
    ctx.arc(p.x - p.size * 0.2, p.y - p.size * 0.2, p.size * 0.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  // Dust particles during shoulder brush
  if (rumbleShadeBrush) {
    const brushTimer = rumbleTimer - 290;
    if (brushTimer > 20 && brushTimer < 50) {
      const f = winFighter.facing;
      const shoulderX = winFighter.x + f * 8;
      const shoulderY = winFighter.y - 46;
      ctx.globalAlpha = Math.max(0, 1 - (brushTimer - 20) / 35);
      for (let i = 0; i < 4; i++) {
        const dustAge = (brushTimer - 20 + i * 3);
        const dx = shoulderX + f * dustAge * 0.6;
        const dy = shoulderY - dustAge * 0.2 - i * 2;
        const dSize = Math.max(0.5, 2 - dustAge * 0.02);
        ctx.fillStyle = '#aaa';
        ctx.beginPath();
        ctx.arc(dx, dy, dSize, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    }
  }

  ctx.restore();
}

function drawSinkingFighter(fighter) {
  // Fighter sinking into sinkhole — clip at ground level, shift down
  const sinkAmount = rumbleSinkProgress * 90;
  if (rumbleSinkProgress >= 1) return;

  ctx.save();
  // Clip at ground level
  ctx.beginPath();
  ctx.rect(0, 0, 960, fighter.groundY + 2);
  ctx.clip();
  // Shift fighter down
  ctx.translate(0, sinkAmount);
  fighter.draw(ctx);
  ctx.restore();
}

function drawTitanRumble(loseFighter) {
  ctx.save();
  const groundY = loseFighter.groundY;

  // Draw sinkhole
  if (rumbleSinkhole && rumbleSinkhole.radius > 1) {
    const hx = rumbleSinkhole.x;
    const hy = rumbleSinkhole.y;
    const r = rumbleSinkhole.radius;

    // Dark hole (ellipse for perspective)
    ctx.fillStyle = '#1a1008';
    ctx.beginPath();
    ctx.ellipse(hx, hy, r, r * 0.35, 0, 0, Math.PI * 2);
    ctx.fill();

    // Inner darkness gradient
    const holeGrad = ctx.createRadialGradient(hx, hy, 0, hx, hy, r);
    holeGrad.addColorStop(0, 'rgba(0,0,0,0.9)');
    holeGrad.addColorStop(0.6, 'rgba(20,15,5,0.7)');
    holeGrad.addColorStop(1, 'rgba(80,60,30,0.0)');
    ctx.fillStyle = holeGrad;
    ctx.beginPath();
    ctx.ellipse(hx, hy, r, r * 0.35, 0, 0, Math.PI * 2);
    ctx.fill();

    // Cracked earth rim
    ctx.strokeStyle = '#6B5B3A';
    ctx.lineWidth = 2;
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2;
      const innerR = r * 0.85;
      const outerR = r + 4 + Math.sin(i * 3.7) * 6;
      const ix = hx + Math.cos(angle) * innerR;
      const iy = hy + Math.sin(angle) * innerR * 0.35;
      const ox = hx + Math.cos(angle) * outerR;
      const oy = hy + Math.sin(angle) * outerR * 0.35;
      ctx.beginPath();
      ctx.moveTo(ix, iy);
      ctx.lineTo(ox, oy);
      ctx.stroke();
    }

    // Jagged crack lines radiating outward
    ctx.strokeStyle = '#554433';
    ctx.lineWidth = 1.5;
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2 + 0.3;
      const startR = r + 2;
      const endR = r + 10 + Math.sin(i * 5.1) * 12;
      ctx.beginPath();
      ctx.moveTo(
        hx + Math.cos(angle) * startR,
        hy + Math.sin(angle) * startR * 0.35
      );
      // Stable jagged path using deterministic offsets
      const midAngle = angle + Math.sin(i * 7.3) * 0.15;
      const midR = (startR + endR) / 2;
      ctx.lineTo(
        hx + Math.cos(midAngle) * midR + Math.sin(i * 4.7) * 5,
        hy + Math.sin(midAngle) * midR * 0.35
      );
      ctx.lineTo(
        hx + Math.cos(angle) * endR,
        hy + Math.sin(angle) * endR * 0.35
      );
      ctx.stroke();
    }

    // Dust/haze around the hole
    if (rumbleSinkProgress < 1) {
      ctx.globalAlpha = 0.2 + (1 - rumbleSinkProgress) * 0.2;
      const dustGrad = ctx.createRadialGradient(hx, hy - 10, 0, hx, hy - 10, r * 1.5);
      dustGrad.addColorStop(0, 'rgba(160,140,100,0.3)');
      dustGrad.addColorStop(1, 'rgba(160,140,100,0)');
      ctx.fillStyle = dustGrad;
      ctx.fillRect(hx - r * 2, hy - r, r * 4, r * 1.5);
      ctx.globalAlpha = 1;
    }
  }

  // Draw dirt particles
  for (const d of rumbleDirtParticles) {
    if (d.alpha <= 0) continue;
    ctx.globalAlpha = d.alpha;
    ctx.fillStyle = d.color;
    ctx.beginPath();
    // Slightly irregular dirt chunks
    ctx.arc(d.x, d.y, d.size, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;

  ctx.restore();
}

function drawSurgeRumble(loseFighter, winFighter) {
  ctx.save();

  // Electricity beam from Surge to opponent
  if (rumbleZapActive) {
    const sx = winFighter.x + winFighter.facing * 20;
    const sy = winFighter.y - 35;
    const ex = loseFighter.x;
    const ey = loseFighter.y - 30;
    const dx = ex - sx;
    const dy = ey - sy;

    // Draw multiple jagged lightning bolts
    for (let b = 0; b < 3; b++) {
      ctx.beginPath();
      ctx.moveTo(sx, sy);
      const segments = 8 + Math.floor(Math.random() * 4);
      for (let i = 1; i <= segments; i++) {
        const t = i / segments;
        const jx = (Math.random() - 0.5) * 30;
        const jy = (Math.random() - 0.5) * 30;
        if (i === segments) {
          ctx.lineTo(ex, ey);
        } else {
          ctx.lineTo(sx + dx * t + jx, sy + dy * t + jy);
        }
      }
      ctx.strokeStyle = b === 0 ? '#ffffff' : b === 1 ? '#88ccff' : '#4488ff';
      ctx.lineWidth = b === 0 ? 3 : b === 1 ? 2 : 1;
      ctx.shadowColor = '#4488ff';
      ctx.shadowBlur = 15;
      ctx.stroke();
    }
    ctx.shadowBlur = 0;

    // Overcharge glow on opponent — intensifies over time
    const zapProgress = Math.min(1, (rumbleTimer - 30) / 90);
    const glowSize = 30 + zapProgress * 40;
    const glowAlpha = 0.2 + zapProgress * 0.4;

    // Pulsing electric aura around loser
    ctx.globalAlpha = glowAlpha * (0.7 + Math.sin(rumbleTimer * 0.5) * 0.3);
    const auraGrad = ctx.createRadialGradient(ex, ey, 0, ex, ey, glowSize);
    auraGrad.addColorStop(0, 'rgba(150,200,255,0.8)');
    auraGrad.addColorStop(0.5, 'rgba(80,140,255,0.3)');
    auraGrad.addColorStop(1, 'rgba(40,80,255,0)');
    ctx.fillStyle = auraGrad;
    ctx.fillRect(ex - glowSize, ey - glowSize, glowSize * 2, glowSize * 2);

    // Small sparks around loser
    ctx.globalAlpha = 0.8;
    for (let i = 0; i < 4; i++) {
      const sparkAngle = Math.random() * Math.PI * 2;
      const sparkR = 15 + Math.random() * 25;
      const sparkX = ex + Math.cos(sparkAngle) * sparkR;
      const sparkY = ey + Math.sin(sparkAngle) * sparkR;
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(sparkX, sparkY, 1 + Math.random() * 2, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  // White flash on explosion
  if (rumbleLightBurst && rumbleLightBurst.timer < 20) {
    const flashAlpha = Math.max(0, 1 - rumbleLightBurst.timer / 20);
    ctx.globalAlpha = flashAlpha;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, 960, 540);
    ctx.globalAlpha = 1;
  }

  // Light particles — the beautiful burst
  for (const p of rumbleLightParticles) {
    if (p.alpha <= 0) continue;
    ctx.save();
    ctx.globalAlpha = p.alpha;

    // Glowing particle with hue
    const color = `hsl(${p.hue}, 80%, 70%)`;
    const glowColor = `hsl(${p.hue}, 90%, 85%)`;
    ctx.shadowColor = glowColor;
    ctx.shadowBlur = p.glow * p.alpha;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size * p.alpha, 0, Math.PI * 2);
    ctx.fill();

    // Bright white core
    ctx.shadowBlur = 0;
    ctx.fillStyle = 'rgba(255,255,255,0.7)';
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size * p.alpha * 0.4, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  ctx.restore();
}

function drawMeltingFighter(fighter) {
  // Wicked Witch style: the fighter sinks into the ground,
  // clipped from below as they "melt" into a puddle
  const melt = rumbleVenomMeltPct; // 0 to 1
  if (melt >= 1) return; // fully melted, nothing to draw
  const groundY = fighter.groundY;
  const bodyHeight = 80;
  // The fighter sinks: their position moves down, and we clip at ground level
  const sinkAmount = melt * bodyHeight;

  // Phase 1: Draw the fighter sinking into the ground, clipped at ground level
  ctx.save();
  // Clip at ground level — anything below ground is hidden (they're sinking into goo)
  ctx.beginPath();
  ctx.rect(0, 0, 960, groundY + 2);
  ctx.clip();
  // Shift the fighter downward to simulate sinking
  ctx.translate(0, sinkAmount);
  fighter.draw(ctx);
  ctx.restore();

  // Phase 2: Green toxic overlay on the visible portion
  ctx.save();
  const visibleTop = fighter.y - 60 + sinkAmount;
  const visibleBot = groundY;
  const visH = Math.max(0, visibleBot - visibleTop);
  if (visH > 0) {
    ctx.globalAlpha = 0.15 + melt * 0.4;
    ctx.fillStyle = '#33aa00';
    ctx.fillRect(fighter.x - 30, visibleTop, 60, visH);
  }
  ctx.restore();

  // Phase 3: Wavy melting goo at the top of the remaining body
  if (melt > 0.05 && visH > 2) {
    ctx.save();
    ctx.globalAlpha = 0.5 + melt * 0.4;
    ctx.fillStyle = '#44cc00';
    const edgeY = visibleTop;
    for (let i = 0; i < 8; i++) {
      const wx = fighter.x - 25 + i * 7;
      const waveOff = Math.sin(Date.now() * 0.005 + i * 1.3) * 3;
      const dripH = Math.max(1, 3 + melt * 8 + Math.sin(Date.now() * 0.003 + i * 2.1) * 4);
      ctx.beginPath();
      ctx.arc(wx, edgeY + waveOff, dripH * 0.5, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  // Phase 4: Falling drips
  ctx.save();
  for (const d of rumbleVenomDrips) {
    if (d.alpha <= 0) continue;
    ctx.globalAlpha = d.alpha;
    ctx.fillStyle = d.color;
    ctx.beginPath();
    ctx.arc(d.x, d.y, d.size, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;
  ctx.restore();
}

function drawVenomRumble(loseFighter) {
  ctx.save();

  // Draw acid blob in flight
  if (rumbleAcidBlob) {
    const bx = rumbleAcidBlob.x;
    const by = rumbleAcidBlob.y;
    ctx.shadowColor = '#44cc00';
    ctx.shadowBlur = 15;
    ctx.fillStyle = '#44cc00';
    ctx.beginPath();
    ctx.ellipse(bx, by, 14, 11, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#88ee44';
    ctx.beginPath();
    ctx.ellipse(bx - 2, by - 2, 7, 5, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
    for (let i = 1; i <= 3; i++) {
      ctx.globalAlpha = 0.6 - i * 0.15;
      ctx.fillStyle = '#33aa00';
      ctx.beginPath();
      ctx.arc(bx - rumbleAcidBlob.vx * i * 3, by - rumbleAcidBlob.vy * i * 2 + i * 3, 4 - i, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  // Draw acid splashes
  for (const s of rumbleAcidSplashes) {
    if (s.alpha <= 0) continue;
    ctx.globalAlpha = s.alpha;
    ctx.fillStyle = s.color;
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;

  // Draw goo puddle (grows as fighter melts, persists after)
  if (rumbleGoo) {
    const puddleGrowth = Math.min(1, rumbleGoo.meltTimer / 80);
    const puddleSize = 25 + puddleGrowth * 25; // grows from 25 to 50
    const puddleHeight = 6 + puddleGrowth * 6;
    ctx.globalAlpha = Math.min(1, rumbleGoo.meltTimer / 20);

    // Main goo puddle
    ctx.fillStyle = '#33aa00';
    ctx.beginPath();
    ctx.ellipse(rumbleGoo.x, rumbleGoo.y, puddleSize, puddleHeight, 0, 0, Math.PI * 2);
    ctx.fill();

    // Darker center
    ctx.fillStyle = '#228800';
    ctx.beginPath();
    ctx.ellipse(rumbleGoo.x, rumbleGoo.y + 1, puddleSize * 0.6, puddleHeight * 0.6, 0, 0, Math.PI * 2);
    ctx.fill();

    // Bright toxic highlight
    ctx.fillStyle = 'rgba(136,238,68,0.4)';
    ctx.beginPath();
    ctx.ellipse(rumbleGoo.x - 5, rumbleGoo.y - 1, puddleSize * 0.3, puddleHeight * 0.3, 0, 0, Math.PI * 2);
    ctx.fill();

    // Bubbling effect after fully melted
    if (rumbleLoserHidden) {
      const t = Date.now() * 0.003;
      for (let i = 0; i < 5; i++) {
        const bubX = rumbleGoo.x - 20 + Math.sin(t + i * 2.1) * 30;
        const bubY = rumbleGoo.y - 2 - Math.abs(Math.sin(t * 1.5 + i * 1.3)) * 8;
        const bSize = 2 + Math.sin(t + i) * 1.5;
        ctx.globalAlpha = 0.5 + Math.sin(t * 2 + i) * 0.3;
        ctx.strokeStyle = '#88ee44';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(bubX, bubY, bSize, 0, Math.PI * 2);
        ctx.stroke();
      }
    }
  }

  ctx.globalAlpha = 1;
  ctx.restore();
}

function drawArtikRumble(loseFighter) {
  // Draw ice shards
  ctx.save();
  for (const s of rumbleIceShards) {
    if (s.alpha <= 0) continue;
    ctx.save();
    ctx.globalAlpha = s.alpha;
    ctx.translate(s.x, s.y);
    ctx.rotate(s.rot);
    ctx.fillStyle = s.color;
    // Draw angular shard shape
    ctx.beginPath();
    ctx.moveTo(0, -s.size);
    ctx.lineTo(s.size * 0.5, -s.size * 0.2);
    ctx.lineTo(s.size * 0.3, s.size * 0.6);
    ctx.lineTo(-s.size * 0.4, s.size * 0.4);
    ctx.lineTo(-s.size * 0.6, -s.size * 0.3);
    ctx.closePath();
    ctx.fill();
    // Shiny highlight
    ctx.strokeStyle = 'rgba(255,255,255,0.6)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(-s.size * 0.1, -s.size * 0.7);
    ctx.lineTo(s.size * 0.2, -s.size * 0.1);
    ctx.stroke();
    ctx.restore();
  }
  ctx.restore();
}

function drawAshPile(x, groundY) {
  const y = groundY; // feet level
  ctx.save();
  // Main ash mound
  ctx.fillStyle = '#2a2a2a';
  ctx.beginPath();
  ctx.ellipse(x, y, 25, 8, 0, 0, Math.PI * 2);
  ctx.fill();

  // Darker center
  ctx.fillStyle = '#1a1a1a';
  ctx.beginPath();
  ctx.ellipse(x, y + 1, 15, 5, 0, 0, Math.PI * 2);
  ctx.fill();

  // Faint ember glow
  ctx.fillStyle = 'rgba(255,80,0,0.3)';
  ctx.beginPath();
  ctx.ellipse(x, y, 12, 4, 0, 0, Math.PI * 2);
  ctx.fill();

  // A couple of small ember particles
  for (let i = 0; i < 3; i++) {
    const ex = x - 10 + Math.sin(Date.now() * 0.002 + i * 2) * 15;
    const ey = y - 5 - Math.abs(Math.sin(Date.now() * 0.003 + i * 3)) * 12;
    const ea = 0.3 + Math.sin(Date.now() * 0.005 + i) * 0.2;
    ctx.globalAlpha = ea;
    ctx.fillStyle = '#ff4400';
    ctx.beginPath();
    ctx.arc(ex, ey, 1.5, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.globalAlpha = 1;
  ctx.restore();
}

function drawLevelSelectScreen() {
  ctx.fillStyle = '#0a0a1a';
  ctx.fillRect(0, 0, 960, 540);

  ctx.font = 'bold 36px Arial';
  ctx.textAlign = 'center';
  ctx.fillStyle = '#ff6b35';
  ctx.fillText('SELECT STAGE', 480, 50);

  ctx.font = '16px Arial';
  ctx.fillStyle = '#888';
  ctx.fillText(`${selectedPlayer.name} vs ${selectedCPU.name}${cpuDifficulty ? '  |  ' + cpuDifficulty.name : ''}`, 480, 80);
  // Player & CPU icons
  drawPortraitIcon(selectedPlayer.name, 30, 30, 22);
  ctx.font = '11px Arial';
  ctx.textAlign = 'left';
  ctx.fillStyle = selectedPlayer.accent;
  ctx.fillText(selectedPlayer.name, 48, 34);
  drawPortraitIcon(selectedCPU.name, 930, 30, 22);
  ctx.font = '11px Arial';
  ctx.textAlign = 'right';
  ctx.fillStyle = selectedCPU.accent;
  ctx.fillText(selectedCPU.name, 912, 34);

  const lvls = getLevels();
  const totalItems = lvls.length + 1; // +1 for RANDOM
  const perRow = Math.min(totalItems, 5);
  const rows = Math.ceil(totalItems / perRow);
  const cardW = 150;
  const cardH = 90;
  const gap = 15;
  const totalW = perRow * cardW + (perRow - 1) * gap;
  const startX = (960 - totalW) / 2 + cardW / 2;
  const startY = 160;

  // Show locked secret levels as silhouettes
  const lockedSecrets = secretLevels.filter(sl => !sl.unlocked());
  const showLocked = lockedSecrets.length > 0;

  for (let i = 0; i < totalItems; i++) {
    const row = Math.floor(i / perRow);
    const col = i % perRow;
    // Center last row if it has fewer items
    const itemsInRow = Math.min(perRow, totalItems - row * perRow);
    const rowTotalW = itemsInRow * cardW + (itemsInRow - 1) * gap;
    const rowStartX = (960 - rowTotalW) / 2 + cardW / 2;
    const x = rowStartX + col * (cardW + gap);
    const y = startY + row * (cardH + gap + 20);
    const selected = i === levelSelectCursor;
    const isRandom = i >= lvls.length;

    ctx.save();
    ctx.translate(x, y);

    if (isRandom) {
      // Draw RANDOM card
      if (selected) {
        ctx.shadowColor = '#ffd700';
        ctx.shadowBlur = 20;
      }
      ctx.fillStyle = selected ? '#2a2a3a' : '#1a1a2a';
      ctx.strokeStyle = selected ? '#ffd700' : '#333';
      ctx.lineWidth = selected ? 3 : 1;
      ctx.beginPath();
      ctx.roundRect(-cardW/2, -cardH/2, cardW, cardH, 8);
      ctx.fill();
      ctx.stroke();
      ctx.shadowBlur = 0;

      const pulse = selected ? Math.sin(Date.now() * 0.005) * 3 : 0;
      ctx.font = `bold ${28 + pulse}px Arial`;
      ctx.textAlign = 'center';
      ctx.fillStyle = selected ? '#ffd700' : '#666';
      ctx.fillText('?', 0, 8);
      ctx.font = 'bold 11px Arial';
      ctx.fillStyle = selected ? '#fff' : '#888';
      ctx.fillText('RANDOM', 0, 30);
    } else {
      // Draw level card
      const lvl = lvls[i];
      if (selected) {
        ctx.shadowColor = lvl.accent;
        ctx.shadowBlur = 15;
      }

      // Card background with level color tint
      const cardGrad = ctx.createLinearGradient(0, -cardH/2, 0, cardH/2);
      cardGrad.addColorStop(0, selected ? lvl.color : '#1a1a2a');
      cardGrad.addColorStop(1, selected ? '#1a1a2a' : '#0f0f1f');
      ctx.fillStyle = cardGrad;
      ctx.strokeStyle = selected ? lvl.accent : '#333';
      ctx.lineWidth = selected ? 3 : 1;
      ctx.beginPath();
      ctx.roundRect(-cardW/2, -cardH/2, cardW, cardH, 8);
      ctx.fill();
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Mini preview icon based on level type
      drawLevelIcon(lvl.name, 0, -10, selected);

      // Level name
      ctx.font = 'bold 12px Arial';
      ctx.textAlign = 'center';
      ctx.fillStyle = selected ? '#fff' : '#888';
      ctx.fillText(lvl.name, 0, 35);
    }

    ctx.restore();
  }

  // Draw locked secret level indicators below
  if (showLocked) {
    const lockY = startY + rows * (cardH + gap + 20) + 10;
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#444';
    ctx.fillText(`${lockedSecrets.length} secret stage${lockedSecrets.length > 1 ? 's' : ''} locked`, 480, lockY);
    // Show hints
    for (let i = 0; i < lockedSecrets.length; i++) {
      const hint = secretLevelHints[lockedSecrets[i].name];
      if (hint) {
        ctx.fillStyle = '#333';
        ctx.fillText(`"${hint}"`, 480, lockY + 16 + i * 14);
      }
    }
  }

  // Selected level info
  if (levelSelectCursor < lvls.length) {
    const current = lvls[levelSelectCursor];
    ctx.font = 'bold 22px Arial';
    ctx.fillStyle = current.accent;
    ctx.textAlign = 'center';
    ctx.fillText(current.name, 480, 470);
    ctx.font = '14px Arial';
    ctx.fillStyle = '#aaa';
    ctx.fillText(current.desc, 480, 492);
  } else {
    ctx.font = 'bold 22px Arial';
    ctx.fillStyle = '#ffd700';
    ctx.textAlign = 'center';
    ctx.fillText('RANDOM', 480, 470);
    ctx.font = '14px Arial';
    ctx.fillStyle = '#aaa';
    ctx.fillText('A random stage will be chosen', 480, 492);
  }

  ctx.font = '14px Arial';
  ctx.fillStyle = '#555';
  ctx.textAlign = 'center';
  ctx.fillText('ARROWS to browse | ENTER to select | ESC to go back', 480, 530);

  // Unlock flash effects
  if (snowyCityUnlockFlash > 0) {
    snowyCityUnlockFlash--;
    ctx.save();
    ctx.globalAlpha = snowyCityUnlockFlash / 60 * 0.6;
    ctx.fillStyle = '#ADD8E6';
    ctx.fillRect(0, 0, 960, 540);
    ctx.globalAlpha = Math.min(1, snowyCityUnlockFlash / 30);
    ctx.font = 'bold 48px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#000';
    ctx.fillText('STAGE UNLOCKED', 480, 270);
    ctx.restore();
  }
  if (foggyCityUnlockFlash > 0) {
    foggyCityUnlockFlash--;
    ctx.save();
    ctx.globalAlpha = foggyCityUnlockFlash / 60 * 0.6;
    ctx.fillStyle = '#FFB347';
    ctx.fillRect(0, 0, 960, 540);
    ctx.globalAlpha = Math.min(1, foggyCityUnlockFlash / 30);
    ctx.font = 'bold 48px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#000';
    ctx.fillText('STAGE UNLOCKED', 480, 270);
    ctx.restore();
  }
  if (rainyCityUnlockFlash > 0) {
    rainyCityUnlockFlash--;
    ctx.save();
    ctx.globalAlpha = rainyCityUnlockFlash / 60 * 0.6;
    ctx.fillStyle = '#708090';
    ctx.fillRect(0, 0, 960, 540);
    ctx.globalAlpha = Math.min(1, rainyCityUnlockFlash / 30);
    ctx.font = 'bold 48px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#000';
    ctx.fillText('STAGE UNLOCKED', 480, 270);
    ctx.restore();
  }
  if (glowingCityUnlockFlash > 0) {
    glowingCityUnlockFlash--;
    ctx.save();
    ctx.globalAlpha = glowingCityUnlockFlash / 60 * 0.6;
    ctx.fillStyle = '#FFD700';
    ctx.fillRect(0, 0, 960, 540);
    ctx.globalAlpha = Math.min(1, glowingCityUnlockFlash / 30);
    ctx.font = 'bold 48px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#000';
    ctx.fillText('STAGE UNLOCKED', 480, 270);
    ctx.restore();
  }
  if (sunnyCityUnlockFlash > 0) {
    sunnyCityUnlockFlash--;
    ctx.save();
    ctx.globalAlpha = sunnyCityUnlockFlash / 60 * 0.6;
    ctx.fillStyle = '#FFD700';
    ctx.fillRect(0, 0, 960, 540);
    ctx.globalAlpha = Math.min(1, sunnyCityUnlockFlash / 30);
    ctx.font = 'bold 48px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#000';
    ctx.fillText('STAGE UNLOCKED', 480, 270);
    ctx.restore();
  }

  // Lottery animation for random level
  if (lotteryActive && lotteryType === 'level') {
    const lvlsForLottery = getLevels();
    const idx = lotteryCurrent % lvlsForLottery.length;
    const lvl = lvlsForLottery[idx];
    ctx.save();
    ctx.fillStyle = 'rgba(0,0,0,0.7)';
    ctx.fillRect(0, 0, 960, 540);
    ctx.font = 'bold 48px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = lvl.accent;
    ctx.fillText(lvl.name, 480, 280);
    ctx.restore();
  }
}

function drawLevelIcon(name, x, y, selected) {
  ctx.save();
  ctx.translate(x, y);
  const alpha = selected ? 1 : 0.5;
  ctx.globalAlpha = alpha;

  switch (name) {
    case 'CLASSIC':
      // Arena lights icon
      ctx.fillStyle = '#4a4a7a';
      ctx.fillRect(-15, -5, 30, 15);
      ctx.fillStyle = 'rgba(255,255,200,0.5)';
      ctx.beginPath();
      ctx.moveTo(0, -15);
      ctx.lineTo(-10, -2);
      ctx.lineTo(10, -2);
      ctx.fill();
      break;
    case 'THE TEMPLE':
      // Pillar icon
      ctx.fillStyle = '#8B7355';
      ctx.fillRect(-12, -15, 6, 25);
      ctx.fillRect(6, -10, 6, 20);
      ctx.fillStyle = '#3a7a2a';
      ctx.fillRect(-5, -8, 10, 3);
      break;
    case 'THE PEAK':
      // Mountain icon
      ctx.fillStyle = '#7a8a9a';
      ctx.beginPath();
      ctx.moveTo(-15, 10);
      ctx.lineTo(0, -15);
      ctx.lineTo(15, 10);
      ctx.fill();
      ctx.fillStyle = '#e8f0f8';
      ctx.beginPath();
      ctx.moveTo(-4, -8);
      ctx.lineTo(0, -15);
      ctx.lineTo(4, -8);
      ctx.fill();
      break;
    case 'THE DEN':
      // Flame icon
      ctx.fillStyle = '#ff4500';
      ctx.beginPath();
      ctx.moveTo(0, -15);
      ctx.quadraticCurveTo(10, -5, 8, 5);
      ctx.quadraticCurveTo(0, 12, -8, 5);
      ctx.quadraticCurveTo(-10, -5, 0, -15);
      ctx.fill();
      ctx.fillStyle = '#ffaa00';
      ctx.beginPath();
      ctx.moveTo(0, -8);
      ctx.quadraticCurveTo(5, -2, 4, 4);
      ctx.quadraticCurveTo(0, 8, -4, 4);
      ctx.quadraticCurveTo(-5, -2, 0, -8);
      ctx.fill();
      break;
    case 'THE VOID':
      // Star/space icon
      ctx.fillStyle = '#6644aa';
      ctx.beginPath();
      ctx.arc(0, 0, 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#aaaaff';
      for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        ctx.arc(-10 + i * 5, -10 + Math.sin(i * 2) * 5, 1, 0, Math.PI * 2);
        ctx.fill();
      }
      break;
    case 'SNOWY CITY':
      // NYC icon - buildings + snow
      ctx.fillStyle = '#4169E1';
      ctx.fillRect(-8, -10, 5, 20);
      ctx.fillRect(-1, -15, 4, 25);
      ctx.fillRect(5, -5, 6, 15);
      ctx.fillStyle = '#fff';
      ctx.beginPath(); ctx.arc(-5, -12, 2, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(8, -8, 2, 0, Math.PI * 2); ctx.fill();
      break;
    case 'FOGGY CITY':
      // SF icon - bridge
      ctx.strokeStyle = '#C85A17';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(-15, 10);
      ctx.lineTo(-10, -10);
      ctx.moveTo(10, -10);
      ctx.lineTo(15, 10);
      ctx.moveTo(-15, 5);
      ctx.lineTo(15, 5);
      ctx.stroke();
      break;
    case 'RAINY CITY':
      // Seattle icon - space needle
      ctx.fillStyle = '#708090';
      ctx.fillRect(-2, -5, 4, 15);
      ctx.beginPath();
      ctx.ellipse(0, -5, 12, 3, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = 'rgba(150,170,200,0.6)';
      ctx.lineWidth = 1;
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.moveTo(-8 + i * 8, -15);
        ctx.lineTo(-9 + i * 8, -5);
        ctx.stroke();
      }
      break;
    case 'GLOWING CITY':
      // Vegas icon - pyramid + light
      ctx.fillStyle = '#FFD700';
      ctx.beginPath();
      ctx.moveTo(-10, 10);
      ctx.lineTo(0, -10);
      ctx.lineTo(10, 10);
      ctx.fill();
      ctx.fillStyle = 'rgba(255,255,200,0.4)';
      ctx.fillRect(-1, -15, 2, 8);
      break;
    case 'SUNNY CITY':
      // LA icon - palm + sun
      ctx.fillStyle = '#FF8C00';
      ctx.beginPath();
      ctx.arc(8, -8, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#8B6914';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(-5, 10);
      ctx.quadraticCurveTo(-3, 0, -4, -8);
      ctx.stroke();
      ctx.fillStyle = '#2a7a2a';
      ctx.beginPath();
      ctx.ellipse(-6, -10, 8, 3, -0.3, 0, Math.PI * 2);
      ctx.fill();
      break;
  }

  ctx.globalAlpha = 1;
  ctx.restore();
}

function drawVersusScreen() {
  const t = versusTimer / VERSUS_DURATION; // 0→1 progress
  const W = 960, H = 540;

  // Black background
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, W, H);

  // Diagonal split line angle
  const splitX = W / 2;
  const skew = 40; // diagonal offset

  // --- Left side (Player) ---
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(splitX + skew, 0);
  ctx.lineTo(splitX - skew, H);
  ctx.lineTo(0, H);
  ctx.closePath();
  ctx.clip();

  // Slide in from left
  const slideInL = Math.min(1, t * 3); // completes at t=0.33
  const easeL = 1 - Math.pow(1 - slideInL, 3); // ease-out cubic
  const offsetL = (1 - easeL) * -500;

  // Tinted background
  ctx.fillStyle = selectedPlayer.accent + '33';
  ctx.fillRect(0, 0, splitX + skew, H);

  // Draw portrait icon
  const iconSize = 280;
  const pImg = portraitImages[selectedPlayer.name];
  if (pImg) {
    const px = splitX / 2 - iconSize / 2 + offsetL;
    const py = H / 2 - iconSize / 2 - 10;
    // Glow behind icon
    ctx.shadowColor = selectedPlayer.accent;
    ctx.shadowBlur = 30 * easeL;
    ctx.globalAlpha = easeL;
    ctx.drawImage(pImg, px, py, iconSize, iconSize);
    ctx.shadowBlur = 0;
    ctx.globalAlpha = 1;
  }

  // P1 label (top-left corner)
  ctx.globalAlpha = easeL;
  ctx.font = 'bold 22px Arial';
  ctx.textAlign = 'left';
  ctx.fillStyle = '#fff';
  ctx.fillText('P1', 16, 32);

  // Player name
  ctx.font = 'bold 28px Arial';
  ctx.textAlign = 'center';
  ctx.fillStyle = selectedPlayer.accent;
  ctx.fillText(selectedPlayer.name, splitX / 2 + offsetL, H / 2 + iconSize / 2 + 20);

  // Player assist name
  if (selectedAssist) {
    ctx.font = '18px Arial';
    ctx.fillStyle = selectedAssist.color || '#aaa';
    ctx.fillText('Assist: ' + selectedAssist.name, splitX / 2 + offsetL, H / 2 + iconSize / 2 + 44);
  }
  ctx.globalAlpha = 1;
  ctx.restore();

  // --- Right side (CPU) ---
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(splitX + skew, 0);
  ctx.lineTo(W, 0);
  ctx.lineTo(W, H);
  ctx.lineTo(splitX - skew, H);
  ctx.closePath();
  ctx.clip();

  // Slide in from right
  const slideInR = Math.min(1, t * 3);
  const easeR = 1 - Math.pow(1 - slideInR, 3);
  const offsetR = (1 - easeR) * 500;

  // Tinted background
  ctx.fillStyle = selectedCPU.accent + '33';
  ctx.fillRect(splitX - skew, 0, W - splitX + skew, H);

  // Draw portrait icon
  const cImg = portraitImages[selectedCPU.name];
  if (cImg) {
    const cx = splitX + (W - splitX) / 2 - iconSize / 2 + offsetR;
    const cy = H / 2 - iconSize / 2 - 10;
    ctx.shadowColor = selectedCPU.accent;
    ctx.shadowBlur = 30 * easeR;
    ctx.globalAlpha = easeR;
    ctx.drawImage(cImg, cx, cy, iconSize, iconSize);
    ctx.shadowBlur = 0;
    ctx.globalAlpha = 1;
  }

  // CPU label (top-right corner)
  ctx.globalAlpha = easeR;
  ctx.font = 'bold 22px Arial';
  ctx.textAlign = 'right';
  ctx.fillStyle = '#fff';
  ctx.fillText('CPU', W - 16, 32);

  // CPU name
  ctx.font = 'bold 28px Arial';
  ctx.textAlign = 'center';
  ctx.fillStyle = selectedCPU.accent;
  ctx.fillText(selectedCPU.name, splitX + (W - splitX) / 2 + offsetR, H / 2 + iconSize / 2 + 20);

  // CPU assist name
  const cpuAssistVS = assists[cpuAssistIndex];
  if (cpuAssistVS) {
    ctx.font = '18px Arial';
    ctx.fillStyle = cpuAssistVS.color || '#aaa';
    ctx.fillText('Assist: ' + cpuAssistVS.name, splitX + (W - splitX) / 2 + offsetR, H / 2 + iconSize / 2 + 44);
  }
  ctx.globalAlpha = 1;
  ctx.restore();

  // --- Diagonal divider line ---
  ctx.save();
  const lineAlpha = Math.min(1, t * 4); // fades in quickly
  ctx.globalAlpha = lineAlpha;
  ctx.strokeStyle = '#fff';
  ctx.lineWidth = 4;
  ctx.shadowColor = '#fff';
  ctx.shadowBlur = 15;
  ctx.beginPath();
  ctx.moveTo(splitX + skew, 0);
  ctx.lineTo(splitX - skew, H);
  ctx.stroke();
  ctx.shadowBlur = 0;
  ctx.restore();

  // --- "VS" text ---
  const vsAppear = Math.max(0, (t - 0.3) / 0.2); // appears at t=0.3, done at t=0.5
  if (vsAppear > 0) {
    const vsEase = Math.min(1, vsAppear);
    const vsScale = 0.5 + vsEase * 0.5; // scale from 0.5 to 1
    const vsBounce = vsEase < 1 ? (1 + Math.sin((vsEase - 1) * Math.PI) * 0.15) : 1;

    ctx.save();
    ctx.translate(splitX, H / 2 - 10);
    ctx.scale(vsScale * vsBounce, vsScale * vsBounce);
    ctx.globalAlpha = vsEase;

    // VS background circle
    ctx.beginPath();
    ctx.arc(0, 0, 45, 0, Math.PI * 2);
    ctx.fillStyle = '#000';
    ctx.fill();
    ctx.strokeStyle = '#ffcc00';
    ctx.lineWidth = 4;
    ctx.stroke();

    // VS text
    ctx.font = 'bold 42px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#ffcc00';
    ctx.fillText('VS', 0, 2);

    ctx.restore();
  }

  // --- Flash transition at the end ---
  if (t > 0.85) {
    const flashT = (t - 0.85) / 0.15; // 0→1 over last 15%
    ctx.globalAlpha = flashT;
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, W, H);
    ctx.globalAlpha = 1;
  }
}

function draw() {
  ctx.clearRect(0, 0, 960, 540);

  switch (gameState) {
    case 'title':
      drawTitleScreen();
      break;

    case 'charSelect':
      drawCharSelectScreen();
      break;

    case 'practiceTargetSelect':
      drawPracticeTargetScreen();
      break;

    case 'assistSelect':
      drawAssistSelectScreen();
      break;

    case 'difficultySelect':
      drawDifficultySelectScreen();
      break;

    case 'levelSelect':
      drawLevelSelectScreen();
      break;

    case 'versus':
      versusTimer++;
      if (versusTimer >= VERSUS_DURATION) {
        if (gameMode === 'rumblePractice') {
          startRumblePractice();
        } else {
          startFight();
        }
      } else {
        drawVersusScreen();
      }
      break;

    case 'fight':
      ctx.save();
      if (shakeTimer > 0) {
        ctx.translate(
          (Math.random() - 0.5) * shakeIntensity,
          (Math.random() - 0.5) * shakeIntensity
        );
      }
      drawBackground();
      player.draw(ctx);
      cpu.draw(ctx);
      drawHUD();
      // Backtrack rewind screen flash
      const btEffect = player.btRewindEffect || cpu.btRewindEffect || 0;
      if (btEffect > 0) {
        ctx.save();
        ctx.globalAlpha = btEffect / 40 * 0.5;
        ctx.fillStyle = '#b44dff';
        ctx.fillRect(0, 0, 960, 540);
        // Rewind text
        ctx.globalAlpha = Math.min(1, btEffect / 20);
        ctx.font = 'bold 36px Arial';
        ctx.textAlign = 'center';
        ctx.fillStyle = '#fff';
        ctx.fillText('⏪ REWIND ⏪', 480, 270);
        ctx.restore();
      }
      ctx.restore();
      if (paused) drawPauseOverlay();
      break;

    case 'finishHim':
      ctx.save();
      drawBackground();
      {
        const loserF = winner === 'player' ? cpu : player;
        const winnerF = winner === 'player' ? player : cpu;
        // Draw winner — clip if gargantuan (Death from Above)
        if (rumbleType === 'BOJDOBOJDO' && rumbleSubType === 'massiv' && winnerF.bojdoScale > 2) {
          ctx.save();
          // Only show the bottom portion of the giant — clip top of screen
          ctx.beginPath();
          ctx.rect(0, 0, 960, 540);
          ctx.clip();
          winnerF.draw(ctx);
          ctx.restore();
        } else {
          winnerF.draw(ctx);
        }
        // Draw loser with special rumble effects if applicable
        if (!rumbleLoserHidden) {
          if (rumbleType === 'VENOM' && rumbleVenomMeltPct > 0) {
            drawMeltingFighter(loserF);
          } else if (rumbleType === 'TITAN' && rumbleSinkProgress > 0) {
            drawSinkingFighter(loserF);
          } else {
            loserF.draw(ctx);
          }
        }
      }
      if (rumbleAshes) drawAshPile(rumbleAshes.x, rumbleAshes.y);
      if (rumbleGoo) drawVenomRumble(winner === 'player' ? cpu : player);
      if (rumbleLightBurst && rumbleLoserHidden) drawSurgeRumble(winner === 'player' ? cpu : player, winner === 'player' ? player : cpu);
      if (rumbleSinkhole && rumbleLoserHidden) drawTitanRumble(winner === 'player' ? cpu : player);
      if (rumbleShadePoof) drawShadeRumble(winner === 'player' ? cpu : player, winner === 'player' ? player : cpu);
      if (rumbleHailCracked) drawTorrenaRumble(winner === 'player' ? cpu : player, winner === 'player' ? player : cpu);
      if (rumbleCorvidaGulpChick >= 0 && rumbleLoserHidden) drawCorvidaRumble(winner === 'player' ? cpu : player, winner === 'player' ? player : cpu);
      if (rumbleGolgarEntity2 && rumbleLoserHidden) drawGolgarRumble(winner === 'player' ? cpu : player, winner === 'player' ? player : cpu);
      if (rumbleTelatrinePhase === 5) drawTelatrineRumble(winner === 'player' ? cpu : player, winner === 'player' ? player : cpu);
      ctx.restore();
      drawFinishHimScreen();
      if (paused) drawPauseOverlay();
      break;

    case 'victory':
      ctx.save();
      drawBackground();
      {
        const loserF = winner === 'player' ? cpu : player;
        const winnerF = winner === 'player' ? player : cpu;
        winnerF.draw(ctx);
        if (!rumbleLoserHidden) {
          if (rumbleType === 'VENOM' && rumbleVenomMeltPct > 0) {
            drawMeltingFighter(loserF);
          } else {
            loserF.draw(ctx);
          }
        }
      }
      if (rumbleAshes) drawAshPile(rumbleAshes.x, rumbleAshes.y);
      if (rumbleGoo) drawVenomRumble(winner === 'player' ? cpu : player);
      if (rumbleLightBurst && rumbleLoserHidden) drawSurgeRumble(winner === 'player' ? cpu : player, winner === 'player' ? player : cpu);
      if (rumbleSinkhole && rumbleLoserHidden) drawTitanRumble(winner === 'player' ? cpu : player);
      if (rumbleShadePoof) drawShadeRumble(winner === 'player' ? cpu : player, winner === 'player' ? player : cpu);
      if (rumbleType === 'BOJDOBOJDO' && rumbleSubType === 'massiv' && rumbleLoserHidden) drawBojdoStompRumble(winner === 'player' ? cpu : player, winner === 'player' ? player : cpu);
      if (rumbleType === 'RUBBERMAN' && rumbleTetherCracked) drawRubbermanRumble(winner === 'player' ? cpu : player, winner === 'player' ? player : cpu);
      if (rumbleHailCracked) drawTorrenaRumble(winner === 'player' ? cpu : player, winner === 'player' ? player : cpu);
      if (rumbleCorvidaGulpChick >= 0 && rumbleLoserHidden) drawCorvidaRumble(winner === 'player' ? cpu : player, winner === 'player' ? player : cpu);
      if (rumbleGolgarEntity2 && rumbleLoserHidden) drawGolgarRumble(winner === 'player' ? cpu : player, winner === 'player' ? player : cpu);
      if (rumbleTelatrinePhase === 5) drawTelatrineRumble(winner === 'player' ? cpu : player, winner === 'player' ? player : cpu);
      drawHUD();
      ctx.restore();
      drawVictoryScreen();
      break;
  }
}

function gameLoop() {
  try {
    update();
    draw();
  } catch (e) {
    console.error('Game loop error:', e);
    // Reset canvas state to prevent save/restore stack corruption
    ctx.restore();
    ctx.save();
    ctx.restore();
    ctx.globalAlpha = 1;
    ctx.shadowBlur = 0;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
  }
  requestAnimationFrame(gameLoop);
}

// Handle resize
function resize() {
  const ratio = 960 / 540;
  let w = window.innerWidth;
  let h = window.innerHeight;
  if (w / h > ratio) {
    w = h * ratio;
  } else {
    h = w / ratio;
  }
  canvas.style.width = w + 'px';
  canvas.style.height = h + 'px';
  canvas.style.marginTop = ((window.innerHeight - h) / 2) + 'px';
}
window.addEventListener('resize', resize);
resize();

gameLoop();
