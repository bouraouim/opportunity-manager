<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInitcdf488c961497a5fa2a757d527936d73
{
    public static $classMap = array (
        'Composer\\InstalledVersions' => __DIR__ . '/..' . '/composer/InstalledVersions.php',
        'Shuchkin\\SimpleXLSXGen' => __DIR__ . '/..' . '/shuchkin/simplexlsxgen/src/SimpleXLSXGen.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->classMap = ComposerStaticInitcdf488c961497a5fa2a757d527936d73::$classMap;

        }, null, ClassLoader::class);
    }
}
