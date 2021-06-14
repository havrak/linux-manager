#! /bin/sh
#
# getPackageManager.sh
# Copyright (C) 2021 havra <havra@dl>
#
# Distributed under terms of the MIT license.
#
# no way I'm figuring out how to write this simple script in nodejs, synchronized callings are hell
# also it is much more easier to edit this script If I would wish to add support for more package managers

if [ -f "/etc/redhat-release" ]; then
	count=$(rpm -qa | wc -l)
	updatable=$(yum list updates | wc -l)
	echo "${count},${updatable}"
elif [ -f "/etc/arch-release" ]; then
	count=$(pacman -Q | wc -l)
	updatable=$(pacman -Qu | wc -l) # needs to update database beforhadn
	echo "${count},${updatable}"
elif [ -f " /etc/debian_version" ]; then
	count=$(apt list --installed | wc -l)
	updatable=$(apt list --upgradable | wc -l)
	echo "${count},${updatable}"
fi



